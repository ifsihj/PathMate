<template>
  <a-modal
    v-model:open="visible"
    title="搜索"
    :width="600"
    :footer="null"
    :mask-closable="true"
    @cancel="handleCancel"
  >
    <div class="search-modal-content">
      <!-- 筛选选项 -->
      <div class="filter-section">
        <p class="filter-label">搜索类型：</p>
        <a-radio-group v-model:value="searchType" class="filter-options">
          <a-radio-button value="articles">经验文章</a-radio-button>
          <a-radio-button value="path">Path</a-radio-button>
          <a-radio-button value="mate">Mate</a-radio-button>
        </a-radio-group>
      </div>
      
      <!-- 搜索输入框 -->
      <div class="search-input-section">
        <a-input-search
          v-model:value="searchKeyword"
          :placeholder="getPlaceholder()"
          size="large"
          enter-button="搜索"
          @search="handleSearch"
          @pressEnter="handleSearch"
        />
      </div>
      
      <!-- 搜索提示 -->
      <div v-if="!hasSearched" class="search-tips">
        <p class="tips-title">搜索提示</p>
        <ul class="tips-list">
          <li>输入标题的关键词进行搜索</li>
          <li>支持模糊匹配，无需输入完整标题</li>
          <li>搜索结果将在发现页面对应分类中展示</li>
        </ul>
      </div>
      
      <!-- 最近搜索 -->
      <div v-if="recentSearches.length > 0 && !hasSearched" class="recent-searches">
        <p class="recent-title">最近搜索</p>
        <div class="recent-tags">
          <a-tag
            v-for="(searchKey, index) in recentSearches"
            :key="index"
            class="recent-tag"
            @click="searchWithKeyword(searchKey)"
          >
            <span class="tag-type">{{ getTypeLabel(searchKey) }}</span>
            <span class="tag-keyword">{{ getKeyword(searchKey) }}</span>
          </a-tag>
        </div>
      </div>
    </div>
  </a-modal>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:open', 'close']);

const router = useRouter();
const searchKeyword = ref('');
const searchType = ref('articles'); // 默认搜索经验文章
const hasSearched = ref(false);
const recentSearches = ref([]);

// 从 localStorage 加载最近搜索
const loadRecentSearches = () => {
  const saved = localStorage.getItem('recent-searches');
  if (saved) {
    try {
      recentSearches.value = JSON.parse(saved).slice(0, 5); // 最多显示5个
    } catch (e) {
      console.error('Failed to load recent searches:', e);
    }
  }
};

// 保存搜索历史
const saveRecentSearch = (keyword) => {
  if (!keyword.trim()) return;
  
  const searches = recentSearches.value.filter(s => s !== keyword);
  searches.unshift(keyword);
  recentSearches.value = searches.slice(0, 10); // 最多保存10个
  
  localStorage.setItem('recent-searches', JSON.stringify(recentSearches.value));
};

// 控制模态框显示
const visible = computed({
  get: () => props.open,
  set: (value) => {
    emit('update:open', value);
  },
});

// 监听打开状态，加载最近搜索
watch(visible, (newVal) => {
  if (newVal) {
    loadRecentSearches();
    hasSearched.value = false;
  } else {
    searchKeyword.value = '';
  }
});

// 获取占位符文本
const getPlaceholder = () => {
  const placeholders = {
    articles: '输入经验文章标题关键词进行搜索...',
    path: '输入 Path 标题关键词进行搜索...',
    mate: '输入 Mate 标题关键词进行搜索...',
  };
  return placeholders[searchType.value] || placeholders.articles;
};

// 处理搜索
const handleSearch = () => {
  const keyword = searchKeyword.value.trim();
  if (!keyword) {
    return;
  }
  
  // 保存搜索历史（包含类型）
  const searchKey = `${searchType.value}:${keyword}`;
  saveRecentSearch(searchKey);
  
  // 关闭模态框
  visible.value = false;
  
  // 根据搜索类型跳转到对应的发现页面
  const routeMap = {
    articles: 'discovery-articles',
    path: 'discovery-path',
    mate: 'discovery-mate',
  };
  
  router.push({
    name: routeMap[searchType.value],
    query: { search: keyword }
  });
};

// 获取类型标签
const getTypeLabel = (searchKey) => {
  const [type] = searchKey.split(':');
  const labels = {
    articles: '文章',
    path: 'Path',
    mate: 'Mate',
  };
  return labels[type] || '文章';
};

// 获取关键词
const getKeyword = (searchKey) => {
  const parts = searchKey.split(':');
  return parts.length > 1 ? parts.slice(1).join(':') : searchKey;
};

// 使用历史关键词搜索
const searchWithKeyword = (searchKey) => {
  // 解析历史搜索（格式：type:keyword）
  const [type, ...keywordParts] = searchKey.split(':');
  const keyword = keywordParts.join(':');
  
  if (type && keyword) {
    searchType.value = type;
    searchKeyword.value = keyword;
    handleSearch();
  } else {
    // 兼容旧格式（只有关键词）
    searchKeyword.value = searchKey;
    handleSearch();
  }
};

// 处理取消
const handleCancel = () => {
  emit('close');
  searchKeyword.value = '';
  hasSearched.value = false;
};
</script>

<style scoped>
.search-modal-content {
  padding: 8px 0;
}

/* 筛选区域 */
.filter-section {
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;
}

.filter-label {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin: 0 0 12px 0;
}

.filter-options {
  width: 100%;
  display: flex;
  gap: 8px;
}

.filter-options :deep(.ant-radio-button-wrapper) {
  flex: 1;
  text-align: center;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.filter-options :deep(.ant-radio-button-wrapper:hover) {
  color: #4A90E2;
  border-color: #4A90E2;
}

.filter-options :deep(.ant-radio-button-wrapper-checked) {
  background: linear-gradient(135deg, #4A90E2 0%, #50C9C3 100%);
  border-color: #4A90E2;
  color: #fff;
}

.filter-options :deep(.ant-radio-button-wrapper-checked:hover) {
  background: linear-gradient(135deg, #50C9C3 0%, #7BDFF2 100%);
  color: #fff;
}

.search-input-section {
  margin-bottom: 16px;
}

.search-tips {
  margin-top: 24px;
  padding: 16px;
  background: rgba(74, 144, 226, 0.05);
  border-radius: 8px;
  border-left: 3px solid #4A90E2;
}

.tips-title {
  font-size: 14px;
  font-weight: 600;
  color: #4A90E2;
  margin: 0 0 12px 0;
}

.tips-list {
  margin: 0;
  padding-left: 20px;
  color: #666;
  font-size: 14px;
  line-height: 1.8;
}

.tips-list li {
  margin-bottom: 4px;
}

.recent-searches {
  margin-top: 24px;
}

.recent-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin: 0 0 12px 0;
}

.recent-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.recent-tag {
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
}

.recent-tag:hover {
  background: #4A90E2;
  color: #fff;
  transform: translateY(-2px);
}

.tag-type {
  font-size: 12px;
  opacity: 0.7;
  font-weight: 500;
}

.recent-tag:hover .tag-type {
  opacity: 1;
}

.tag-keyword {
  font-weight: 500;
}

:deep(.ant-input-search) {
  border-radius: 8px;
}

:deep(.ant-input-search .ant-input) {
  border-radius: 8px 0 0 8px;
}

:deep(.ant-input-search-button) {
  border-radius: 0 8px 8px 0;
  background: linear-gradient(135deg, #4A90E2 0%, #50C9C3 100%);
  border: none;
}

:deep(.ant-input-search-button:hover) {
  background: linear-gradient(135deg, #50C9C3 0%, #7BDFF2 100%);
}
</style>

