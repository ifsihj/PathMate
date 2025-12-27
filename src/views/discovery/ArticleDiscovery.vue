<template>
  <div class="article-discovery">
    <!-- 上传按钮 -->
    <div class="upload-section">
      <button class="upload-btn" @click="showUploadModal = true">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        <span>发布经验文章</span>
      </button>
    </div>

    <!-- 搜索结果提示 -->
    <div v-if="searchKeyword" class="search-result-header">
      <div class="search-info">
        <span class="search-keyword">搜索关键词: "{{ searchKeyword }}"</span>
        <span class="result-count">找到 {{ filteredArticles.length }} 篇文章</span>
      </div>
      <a-button type="link" @click="clearSearch">清除搜索</a-button>
    </div>

    <!-- 内容卡片列表 -->
    <div v-if="filteredArticles.length > 0" class="content-feed">
      <DiscoveryCard
        v-for="item in filteredArticles"
        :key="item.id"
        :item="item"
        @click="handleCardClick"
      />
    </div>
    
    <!-- 无搜索结果 -->
    <div v-else-if="searchKeyword" class="no-results">
      <div class="no-results-content">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <p class="no-results-text">未找到相关文章</p>
        <p class="no-results-hint">尝试使用其他关键词搜索</p>
        <a-button type="primary" @click="clearSearch">清除搜索</a-button>
      </div>
    </div>
    
    <!-- 无搜索时显示所有文章 -->
    <div v-else class="content-feed">
      <DiscoveryCard
        v-for="item in articleItems"
        :key="item.id"
        :item="item"
        @click="handleCardClick"
      />
    </div>

    <!-- 上传模态框 -->
    <a-modal
      v-model:open="showUploadModal"
      title="发布新的经验文章"
      :width="600"
      @ok="handleUpload"
      @cancel="resetForm"
    >
      <a-form :model="uploadForm" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
        <a-form-item label="标题" required>
          <a-input 
            v-model:value="uploadForm.title" 
            placeholder="请输入文章标题"
            :maxlength="50"
            show-count
          />
        </a-form-item>
        <a-form-item label="封面图">
          <a-upload
            v-model:file-list="uploadForm.coverFileList"
            list-type="picture-card"
            :before-upload="beforeUpload"
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
        <a-form-item label="文章内容" required>
          <a-textarea 
            v-model:value="uploadForm.content" 
            placeholder="请输入文章内容..."
            :rows="8"
            :maxlength="2000"
            show-count
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { message } from 'ant-design-vue';
import DiscoveryCard from '@/components/DiscoveryCard.vue';

const router = useRouter();
const route = useRoute();

const showUploadModal = ref(false);
const uploadForm = ref({
  title: '',
  content: '',
  coverFileList: [],
});

const articleItems = ref([
  {
    id: 1,
    title: 'Vue3 项目开发经验分享',
    author: '小明',
    authorAvatar: '/src/assets/images/avatar1.webp',
    coverImage: '/src/assets/images/HomePage.png',
    content: `在开发PathMate项目的过程中，我积累了一些Vue3开发的经验，想和大家分享一下。

首先，关于组件设计。我发现使用Composition API可以让代码更加清晰和可维护。特别是对于复杂的业务逻辑，使用setup语法糖可以让代码结构更加直观。

其次，关于状态管理。对于简单的状态，使用ref和reactive就足够了。但是对于跨组件的状态共享，建议使用Pinia或者Vuex。

最后，关于性能优化。使用v-memo和v-once可以有效地减少不必要的渲染。同时，合理使用computed和watch可以避免不必要的计算。

希望这些经验对大家有帮助！`,
    createdAt: Date.now() - 86400000 * 2, // 2天前
    likeCount: 15,
    isLiked: false,
    comments: [
      {
        id: 1,
        user: '小红',
        content: '非常实用的经验分享，学到了很多！',
        createdAt: Date.now() - 3600000, // 1小时前
      },
      {
        id: 2,
        user: '小李',
        content: '关于性能优化的部分特别有用，感谢分享！',
        createdAt: Date.now() - 7200000, // 2小时前
      },
    ],
  },
  {
    id: 2,
    title: '前端路由设计最佳实践',
    author: '小张',
    authorAvatar: '/src/assets/images/avatar2.webp',
    coverImage: '/src/assets/images/BackGround.webp',
    content: `在PathMate项目中，我负责了路由系统的设计。这里分享一些最佳实践。

1. 路由懒加载
使用动态import可以实现路由的懒加载，这样可以减少初始加载时间。

2. 路由守卫
合理使用beforeEach、beforeResolve等路由守卫可以实现权限控制和数据预加载。

3. 嵌套路由
对于复杂的页面结构，使用嵌套路由可以让代码组织更加清晰。

4. 路由元信息
使用meta字段可以存储路由相关的元信息，比如页面标题、权限要求等。

这些实践在我们的项目中都得到了很好的应用。`,
    createdAt: Date.now() - 86400000 * 5, // 5天前
    likeCount: 23,
    isLiked: false,
    comments: [
      {
        id: 1,
        user: '小王',
        content: '路由守卫的使用确实很重要，学到了！',
        createdAt: Date.now() - 1800000, // 30分钟前
      },
    ],
  },
  {
    id: 3,
    title: '团队协作开发经验',
    author: '小刘',
    authorAvatar: '/src/assets/images/avatar3.jpg',
    coverImage: '/src/assets/images/help.jpg',
    content: `在PathMate团队中，我们采用了一些协作开发的最佳实践，效果很好。

1. Git工作流
我们使用Git Flow工作流，每个功能都在独立的分支上开发，通过Pull Request进行代码审查。

2. 代码规范
使用ESLint和Prettier统一代码风格，确保代码质量。

3. 组件文档
为每个组件编写文档，包括使用示例和API说明。

4. 定期沟通
每周举行站会，及时同步进度和问题。

这些实践让我们的团队协作更加高效。`,
    createdAt: Date.now() - 86400000 * 7, // 7天前
    likeCount: 8,
    isLiked: false,
    comments: [],
  },
  {
    id: 4,
    title: '台湾生存手册1：消费篇',
    author: 'PathMate编辑部',
    authorAvatar: '/src/assets/images/avatar1.webp',
    coverImage: '/src/assets/images/BackGround.webp',
    content: `第一次到台湾生活，最先踩坑的往往不是语言和交通，而是“怎么花钱”。这篇把我踩过的坑和更省心的做法整理成一份清单，按“出门前—落地后—日常消费”三个阶段走一遍就能上手。

一、出门前：把支付工具准备好
1）至少准备两张卡：一张主用（刷卡/线上），一张备用（防止风控/丢失）。
2）开通境外交易与短信提醒：每一笔扣款都能及时发现。
3）准备少量现金：用于夜市、小店、临时交通等。刚落地不需要换太多，够用两三天即可。

二、落地后：建立你的“固定支出结构”
1）交通：把通勤路径固定下来后，你的月支出会稳定很多。先算“上班/上学往返”，再把周末出行加上。
2）饮食：一周至少设定两天“自己解决/简餐日”，能明显降低波动。
3）通讯：手机资费是长期成本，办理前先确认流量够不够、是否有热点限制。

三、日常消费：三条规则避免冲动
1）任何“想买”的东西先放入清单，隔 24 小时再决定。
2）对“常买”的东西做固定预算：例如咖啡/饮料、外卖、零食。
3）把每月储蓄当成固定支出：发薪/到账当天先转走。

四、实用小抄（可直接照做）
- 记账：不用复杂，三类就够——吃、行、住。
- 大额：先比价再下单，尤其是 3C/电器。
- 现金：随身不超过“丢了也不心疼”的金额。

最后：消费这件事的核心不是省，而是“稳定可预期”。当你的每月支出曲线平下来，生活就会轻松很多。` ,
    createdAt: Date.now() - 86400000 * 3, // 3天前
    likeCount: 41,
    isLiked: false,
    comments: [
      {
        id: 1,
        user: '阿哲',
        content: '“稳定可预期”这句太对了，记账从三类开始很友好。',
        createdAt: Date.now() - 3600000 * 6, // 6小时前
      },
      {
        id: 2,
        user: '小柚子',
        content: '刚到台北，这篇把我最担心的支付问题讲清楚了，感谢！',
        createdAt: Date.now() - 3600000 * 18, // 18小时前
      },
    ],
  },
  {
    id: 5,
    title: '台湾生存手册2：行李篇',
    author: 'PathMate编辑部',
    authorAvatar: '/src/assets/images/avatar2.webp',
    coverImage: '/src/assets/images/help.jpg',
    content: `行李打包的难点不在“带什么”，而在“带到刚刚好”：不缺关键物品，也不会被行李重量、空间和搬运成本拖累。这篇给你一套可复制的行李策略。

一、行李的优先级：先保命，再舒适
1）证件与文件：证件本体 + 复印件/电子备份（分别存不同地方）。
2）现金与银行卡：分开放，任何一处出问题都不至于断粮。
3）常用药：感冒退烧、肠胃、过敏、创可贴，按个人体质补充。

二、衣物：按“气候 + 场景”打包
1）台湾冬季体感差异大：北部湿冷、南部温暖。建议采用“分层穿搭”：内层排汗、中层保暖、外层防风防雨。
2）场景优先：通勤/上课、运动、正式场合各准备一套即可。
3）鞋子：一双耐走、一双备用。新鞋不要第一次就带去长途走路。

三、电子设备：少而精 + 备份
1）充电器与线材：以“手机 + 电脑”为核心，尽量统一接口。
2）移动电源：选可靠品牌，出门前确认是否符合航空携带规范。
3）数据备份：重要资料至少两份，云端 + 本地（U盘/移动硬盘）。

四、到达后再买：别把“可以当地买”塞进行李
1）洗护用品、日用品：到达后按需求购买，减少漏液风险。
2）床品与收纳：先住一周再决定，避免买错尺寸/风格。
3）锅碗小家电：等你确定住处和作息，再考虑是否需要。

五、最容易忘的三样
1）雨具：折叠伞或轻便雨衣。
2）小锁/证件收纳：旅途中非常省心。
3）一件“情绪稳定物”：例如熟悉的零食、照片、或一本书。

行李本质上是你对新生活的“第一份配置文件”。越克制、越清晰，越能让你落地后的每一天更轻盈。` ,
    createdAt: Date.now() - 86400000 * 1, // 1天前
    likeCount: 56,
    isLiked: false,
    comments: [
      {
        id: 1,
        user: '小白',
        content: '“分层穿搭”真的救命，北部湿冷太真实了。',
        createdAt: Date.now() - 3600000 * 4, // 4小时前
      },
      {
        id: 2,
        user: 'Mina',
        content: '到达后再买那段很有用，我以前总是行李超重。',
        createdAt: Date.now() - 3600000 * 9, // 9小时前
      },
      {
        id: 3,
        user: '老周',
        content: '“情绪稳定物”这个建议很暖，确实需要。',
        createdAt: Date.now() - 3600000 * 14, // 14小时前
      },
    ],
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
  return false;
};

const handleUpload = () => {
  if (!uploadForm.value.title.trim()) {
    message.warning('请输入标题');
    return;
  }
  if (!uploadForm.value.content.trim()) {
    message.warning('请输入文章内容');
    return;
  }

  const newItem = {
    id: Date.now(),
    title: uploadForm.value.title,
    author: '当前用户',
    authorAvatar: null,
    coverImage: uploadForm.value.coverFileList[0]?.thumbUrl || null,
    content: uploadForm.value.content,
  };

  articleItems.value.unshift(newItem);
  message.success('发布成功!');
  resetForm();
  showUploadModal.value = false;
  saveData();
};

const resetForm = () => {
  uploadForm.value = {
    title: '',
    content: '',
    coverFileList: [],
  };
};

// 搜索关键词
const searchKeyword = ref('');

// 从路由 query 获取搜索关键词
const updateSearchKeyword = () => {
  searchKeyword.value = route.query.search || '';
};

// 过滤后的文章列表
const filteredArticles = computed(() => {
  if (!searchKeyword.value) {
    return articleItems.value;
  }
  
  const keyword = searchKeyword.value.toLowerCase().trim();
  return articleItems.value.filter(item => 
    item.title.toLowerCase().includes(keyword)
  );
});

// 清除搜索
const clearSearch = () => {
  router.push({ name: 'discovery-articles' });
  searchKeyword.value = '';
};

const handleCardClick = (item) => {
  // 跳转到文章详情页
  router.push(`/discovery/articles/${item.id}`);
};

const saveData = () => {
  localStorage.setItem('discovery-article-items', JSON.stringify(articleItems.value));
};

// 监听路由变化
watch(() => route.query.search, () => {
  updateSearchKeyword();
}, { immediate: true });

onMounted(() => {
  const saved = localStorage.getItem('discovery-article-items');
  if (saved) {
    try {
      const data = JSON.parse(saved);
      // 合并示例数据和保存的数据，避免重复
      const existingIds = new Set(data.map(item => item.id));
      const newItems = articleItems.value.filter(item => !existingIds.has(item.id));
      articleItems.value = [...newItems, ...data];
    } catch (e) {
      console.error('Failed to load article items:', e);
    }
  }
  // 保存初始数据
  saveData();
  // 初始化搜索关键词
  updateSearchKeyword();
});
</script>

<style scoped>
.article-discovery {
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
