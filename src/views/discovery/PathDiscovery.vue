<template>
  <div class="path-discovery">
    <!-- 上传按钮 -->
    <div class="upload-section">
      <button class="upload-btn" @click="showUploadModal = true">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        <span>发布 Path</span>
      </button>
    </div>

    <!-- 搜索结果提示 -->
    <div v-if="searchKeyword" class="search-result-header">
      <div class="search-info">
        <span class="search-keyword">搜索关键词: "{{ searchKeyword }}"</span>
        <span class="result-count">找到 {{ filteredItems.length }} 个 Path</span>
      </div>
      <a-button type="link" @click="clearSearch">清除搜索</a-button>
    </div>

    <!-- 内容卡片列表 -->
    <div v-if="filteredItems.length > 0" class="content-feed">
      <DiscoveryCard
        v-for="item in filteredItems"
        :key="item.id"
        :item="item"
        :show-actions="true"
        :action-buttons="{ chat: true, apply: true }"
        @click="handleCardClick"
        @action="handleAction"
      />
    </div>
    
    <!-- 无搜索结果 -->
    <div v-else-if="searchKeyword" class="no-results">
      <div class="no-results-content">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <p class="no-results-text">未找到相关 Path</p>
        <p class="no-results-hint">尝试使用其他关键词搜索</p>
        <a-button type="primary" @click="clearSearch">清除搜索</a-button>
      </div>
    </div>
    
    <!-- 无搜索时显示所有 Path -->
    <div v-else class="content-feed">
      <DiscoveryCard
        v-for="item in pathItems"
        :key="item.id"
        :item="item"
        :show-actions="true"
        :action-buttons="{ chat: true, apply: true }"
        @click="handleCardClick"
        @action="handleAction"
      />
    </div>

    <!-- 上传模态框 -->
    <a-modal
      v-model:open="showUploadModal"
      title="发布新的 Path"
      :width="600"
      @ok="handleUpload"
      @cancel="resetForm"
    >
      <a-form :model="uploadForm" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
        <a-form-item label="标题" required>
          <a-input 
            v-model:value="uploadForm.title" 
            placeholder="请输入 Path 标题"
            :maxlength="50"
            show-count
          />
        </a-form-item>
        <a-form-item label="封面图">
          <a-upload
            v-model:file-list="uploadForm.coverFileList"
            list-type="picture-card"
            :before-upload="beforeUpload"
            @preview="handlePreview"
          >
            <div v-if="uploadForm.coverFileList.length < 1">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <div style="margin-top: 8px">上传封面</div>
            </div>
          </a-upload>
        </a-form-item>
        <a-form-item label="内容描述" required>
          <a-textarea 
            v-model:value="uploadForm.content" 
            placeholder="请输入 Path 的详细描述..."
            :rows="6"
            :maxlength="1000"
            show-count
          />
        </a-form-item>
        <a-form-item label="选题情况">
          <a-input 
            v-model:value="uploadForm.topicStatus" 
            placeholder="例如：暂未选题"
          />
        </a-form-item>
        <a-form-item label="已有队员">
          <a-textarea 
            v-model:value="uploadForm.existingMembers" 
            placeholder="描述已有队员情况..."
            :rows="3"
          />
        </a-form-item>
        <a-form-item label="成员要求">
          <a-textarea 
            v-model:value="uploadForm.memberRequirements" 
            placeholder="描述对成员的要求..."
            :rows="3"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { message, Modal } from 'ant-design-vue';
import DiscoveryCard from '@/components/DiscoveryCard.vue';

const router = useRouter();
const route = useRoute();
const showUploadModal = ref(false);
const uploadForm = ref({
  title: '',
  content: '',
  coverFileList: [],
  topicStatus: '',
  existingMembers: '',
  memberRequirements: '',
});

const pathItems = ref([
  {
    id: 1,
    title: '信息架构小组 找3人!!!',
    author: 'Zed',
    authorAvatar: '/src/assets/images/avatar1.webp',
    coverImage: '/src/assets/images/help.jpg',
    content: `选题情况:暂未选题
已有队员:信息管理系三名大二学生,掌握一定信息行为、信息组织相关知识,正在学习Java前端开发以及数据库系统相关课程
成员要求:
1.同为北京大学学生
2.态度认真,愿意听取建议
3.能够全程参与项目,包括Java和数据库系统的开发`,
  },
  {
    id: 2,
    title: '数字人文平台 挑战杯组队~',
    author: '木头',
    authorAvatar: '/src/assets/images/avatar2.webp',
    coverImage: '/src/assets/images/help2.png',
    content: `选题情况:数字人文平台,具体主题组队完成商榷
已有队员:信息管理系大三学生,文科生,喜爱中国历史,选修数据库系统、Java、信架构等专业课,有搭建数字人文平台经历,在信管位老师课题组中。
指导老师:信息管理系位通老师
成员要求:
1.1=3
2.同为北京大学学生,希望是信科/信管/中文/历史系的同学`,
  },
]);

const beforeUpload = (file) => {
  const isImage = file.type.startsWith('image/');
  if (!isImage) {
    message.error('只能上传图片文件!');
    return false;
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片大小不能超过 2MB!');
    return false;
  }
  return false; // 阻止自动上传
};

const handlePreview = () => {
  // 预览功能
};

const handleUpload = () => {
  if (!uploadForm.value.title.trim()) {
    message.warning('请输入标题');
    return;
  }
  if (!uploadForm.value.content.trim()) {
    message.warning('请输入内容描述');
    return;
  }

  // 构建完整内容
  let fullContent = uploadForm.value.content;
  if (uploadForm.value.topicStatus) {
    fullContent = `选题情况:${uploadForm.value.topicStatus}\n${fullContent}`;
  }
  if (uploadForm.value.existingMembers) {
    fullContent = `${fullContent}\n已有队员:${uploadForm.value.existingMembers}`;
  }
  if (uploadForm.value.memberRequirements) {
    fullContent = `${fullContent}\n成员要求:\n${uploadForm.value.memberRequirements}`;
  }

  // 创建新项目
  const newItem = {
    id: Date.now(),
    title: uploadForm.value.title,
    author: '当前用户', // 应该从用户状态获取
    authorAvatar: null,
    coverImage: uploadForm.value.coverFileList[0]?.thumbUrl || null,
    content: fullContent,
  };

  pathItems.value.unshift(newItem);
  saveData();
  message.success('发布成功!');
  resetForm();
  showUploadModal.value = false;
};

const resetForm = () => {
  uploadForm.value = {
    title: '',
    content: '',
    coverFileList: [],
    topicStatus: '',
    existingMembers: '',
    memberRequirements: '',
  };
};

const handleCardClick = (item) => {
  console.log('点击了卡片:', item);
  // TODO: 跳转到详情页
};

const handleAction = (action, item) => {
  if (action === 'chat') {
    // 跳转到聊天页面
    router.push({
      path: '/chat',
      query: {
        userId: `user-${item.author}`,
        userName: item.author,
        context: `关于 "${item.title}"`
      }
    });
  } else if (action === 'apply') {
    Modal.confirm({
      title: '申请加入 Path',
      content: `您确定要申请加入 "${item.title}" 吗？`,
      okText: '确定申请',
      cancelText: '取消',
      onOk() {
        message.success('申请已提交，等待审核中...');
        // TODO: 实现申请逻辑
      },
    });
  }
};

// 搜索关键词
const searchKeyword = ref('');

// 从路由 query 获取搜索关键词
const updateSearchKeyword = () => {
  searchKeyword.value = route.query.search || '';
};

// 过滤后的 Path 列表
const filteredItems = computed(() => {
  if (!searchKeyword.value) {
    return pathItems.value;
  }
  
  const keyword = searchKeyword.value.toLowerCase().trim();
  return pathItems.value.filter(item => 
    item.title.toLowerCase().includes(keyword)
  );
});

// 清除搜索
const clearSearch = () => {
  router.push({ name: 'discovery-path' });
  searchKeyword.value = '';
};

const saveData = () => {
  localStorage.setItem('discovery-path-items', JSON.stringify(pathItems.value));
};

// 监听路由变化
watch(() => route.query.search, () => {
  updateSearchKeyword();
}, { immediate: true });

// 从 localStorage 加载数据
onMounted(() => {
  const saved = localStorage.getItem('discovery-path-items');
  if (saved) {
    try {
      const data = JSON.parse(saved);
      pathItems.value = data;
    } catch (e) {
      console.error('Failed to load path items:', e);
    }
  }
  // 初始化搜索关键词
  updateSearchKeyword();
});
</script>

<style scoped>
.path-discovery {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.upload-section {
  margin-bottom: 24px;
}

.upload-btn {
  width: 100%;
  padding: 14px 24px;
  background: #4A90E2;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-shadow: 0 2px 8px rgba(74, 144, 226, 0.2);
  position: relative;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
}

.upload-btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.upload-btn:hover::before {
  width: 300px;
  height: 300px;
}

.upload-btn:hover {
  background: #3d7bc4;
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(74, 144, 226, 0.3);
}

.content-feed {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 搜索结果头部 */
.search-result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: rgba(74, 144, 226, 0.1);
  border-radius: 12px;
  margin-bottom: 24px;
  border: 1px solid rgba(74, 144, 226, 0.2);
}

.search-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.search-keyword {
  font-size: 16px;
  font-weight: 600;
  color: #4A90E2;
}

.result-count {
  font-size: 14px;
  color: #666;
}

/* 无搜索结果 */
.no-results {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: 40px 20px;
}

.no-results-content {
  text-align: center;
}

.no-results-content svg {
  color: #ccc;
  margin-bottom: 20px;
}

.no-results-text {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px 0;
}

.no-results-hint {
  font-size: 14px;
  color: #999;
  margin: 0 0 24px 0;
}
</style>
