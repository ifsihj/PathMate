<template>
  <div class="path-selection">
    <div class="selection-container">
      <h1 class="selection-title">选择协作空间</h1>
      <p class="selection-subtitle">请选择一个 Path 项目进入对应的协作空间</p>
      
      <PathListModal
        v-model:open="showPathList"
        @view-path="handleSelectPath"
      />
      
      <div v-if="pathList.length === 0" class="loading-state">
        <a-spin size="large" />
        <p>加载 Path 列表中...</p>
      </div>
      
      <div v-else class="path-grid">
        <div
          v-for="path in pathList"
          :key="path.id"
          class="path-card"
          :class="`path-card-${path.status}`"
          @click="handleSelectPath(path)"
        >
          <!-- 装饰性背景元素 -->
          <div class="card-decoration"></div>
          
          <!-- Path 编号徽章 -->
          <div class="path-badge">
            <span class="badge-text">{{ path.name }}</span>
          </div>
          
          <!-- 主要内容 -->
          <div class="path-content">
            <div class="path-header">
              <h3 class="path-title">{{ path.title }}</h3>
              <a-tag :color="getStatusColor(path.status)" class="status-tag">
                {{ getStatusText(path.status) }}
              </a-tag>
            </div>
            
            <p class="path-description">{{ path.description }}</p>
            
            <!-- 信息标签 -->
            <div class="path-info-tags">
              <div class="info-tag">
                <div class="info-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <span class="info-text">{{ formatDate(path.startDate) }}</span>
              </div>
              
              <div class="info-tag">
                <div class="info-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <span class="info-text">{{ path.participants }} 人参与</span>
              </div>
            </div>
          </div>
          
          <!-- 操作按钮 -->
          <div class="path-action">
            <a-button type="primary" size="large" block class="enter-btn">
              <span>进入协作空间</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a-button>
          </div>
        </div>
      </div>
      
      <div class="view-all">
        <a-button type="link" @click="showPathList = true">
          查看全部 Path 项目
        </a-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import PathListModal from '@/components/PathListModal.vue';
import { getPathList } from '@/services/pathApi';

const router = useRouter();
const pathList = ref([]);
const showPathList = ref(false);

// 加载 Path 列表
onMounted(async () => {
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/05f430ea-d856-4cc8-9527-808e1906fa57',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'PathSelection.vue:98',message:'Component mounted, starting to load paths',data:{timestamp:Date.now()},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  
  try {
    const paths = await getPathList();
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/05f430ea-d856-4cc8-9527-808e1906fa57',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'PathSelection.vue:102',message:'Paths loaded successfully',data:{pathCount:paths.length,paths:paths.map(p=>({id:p.id,name:p.name}))},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    
    pathList.value = paths;
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/05f430ea-d856-4cc8-9527-808e1906fa57',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'PathSelection.vue:105',message:'Path list updated in ref',data:{refLength:pathList.value.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
  } catch (error) {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/05f430ea-d856-4cc8-9527-808e1906fa57',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'PathSelection.vue:108',message:'Failed to load paths',data:{errorMessage:error.message,errorStack:error.stack},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
    // #endregion
    console.error('Failed to load paths:', error);
  }
});

// 获取状态颜色
const getStatusColor = (status) => {
  const colorMap = {
    active: 'green',
    planning: 'blue',
    completed: 'default',
  };
  return colorMap[status] || 'default';
};

// 获取状态文本
const getStatusText = (status) => {
  const textMap = {
    active: '进行中',
    planning: '计划中',
    completed: '已完成',
  };
  return textMap[status] || status;
};

// 格式化日期
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// 选择 Path 并跳转到协作空间
const handleSelectPath = (path) => {
  router.push({
    name: 'path-description',
    params: { pathId: path.id }
  });
};
</script>

<style scoped>
.path-selection {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background: url("@/assets/images/BackGround.webp") center / cover no-repeat;
  background-attachment: fixed;
  position: relative;
}

.path-selection::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.1) 50%,
    rgba(0, 0, 0, 0.3) 100%
  );
  pointer-events: none;
  z-index: 0;
}

.path-selection > * {
  position: relative;
  z-index: 1;
}

.selection-container {
  max-width: 1200px;
  width: 100%;
  position: relative;
  z-index: 1;
}

.selection-title {
  font-size: 36px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 12px;
  background: linear-gradient(135deg, #4A90E2 0%, #50C9C3 50%, #7BDFF2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.selection-subtitle {
  font-size: 18px;
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 40px;
}

.path-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 28px;
  margin-bottom: 32px;
}

.path-card {
  position: relative;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 28px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.path-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #4A90E2, #50C9C3, #7BDFF2);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.path-card:hover::before {
  opacity: 1;
}

.path-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 
    0 20px 40px rgba(74, 144, 226, 0.25),
    0 0 0 1px rgba(255, 255, 255, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.3);
}

/* 不同状态的卡片装饰 */
.path-card-active {
  border-left: 3px solid #52c41a;
}

.path-card-planning {
  border-left: 3px solid #1890ff;
}

.path-card-completed {
  border-left: 3px solid #d9d9d9;
}

/* 装饰性背景元素 */
.card-decoration {
  position: absolute;
  top: -50px;
  right: -50px;
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, rgba(74, 144, 226, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  transition: transform 0.4s ease;
}

.path-card:hover .card-decoration {
  transform: scale(1.2);
}

/* Path 编号徽章 */
.path-badge {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, rgba(74, 144, 226, 0.2), rgba(80, 201, 195, 0.2));
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.path-card:hover .path-badge {
  transform: rotate(5deg) scale(1.1);
  background: linear-gradient(135deg, rgba(74, 144, 226, 0.3), rgba(80, 201, 195, 0.3));
}

.badge-text {
  font-size: 14px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 0.5px;
}

/* 主要内容区域 */
.path-content {
  position: relative;
  z-index: 1;
  flex: 1;
  margin-top: 8px;
}

.path-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 12px;
}

.path-title {
  font-size: 20px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
  line-height: 1.4;
  flex: 1;
  background: linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.9) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.status-tag {
  flex-shrink: 0;
  font-size: 12px;
  padding: 4px 12px;
  border-radius: 12px;
  font-weight: 500;
}

.path-description {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.7;
  margin: 0 0 20px 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 信息标签 */
.path-info-tags {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.info-tag {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.path-card:hover .info-tag {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.2);
}

.info-icon {
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.3s ease;
}

.path-card:hover .info-icon {
  color: #4A90E2;
}

.info-text {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
}

.path-action {
  margin-top: auto;
  position: relative;
  z-index: 1;
}

.enter-btn {
  height: 44px;
  border-radius: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #4A90E2 0%, #50C9C3 100%);
  border: none;
}

.enter-btn:hover {
  background: linear-gradient(135deg, #50C9C3 0%, #7BDFF2 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(74, 144, 226, 0.4);
}

.enter-btn svg {
  transition: transform 0.3s ease;
}

.path-card:hover .enter-btn svg {
  transform: translateX(4px);
}

.view-all {
  text-align: center;
}

.view-all :deep(.ant-btn-link) {
  color: rgba(255, 255, 255, 0.8);
  font-size: 16px;
  padding: 0;
}

.view-all :deep(.ant-btn-link:hover) {
  color: #4A90E2;
}

/* 加载状态 */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  color: rgba(255, 255, 255, 0.9);
}

.loading-state p {
  margin-top: 20px;
  font-size: 16px;
}

.loading-state :deep(.ant-spin) {
  color: #4A90E2;
}
</style>

