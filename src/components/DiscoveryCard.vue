<template>
  <div class="discovery-card" @click="handleCardClick">
    <!-- 左侧封面图 -->
    <div class="card-cover">
      <img 
        v-if="item.coverImage" 
        :src="item.coverImage" 
        :alt="item.title"
        class="cover-img"
      />
      <div v-else class="cover-placeholder">
        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
      </div>
      <div class="cover-title-overlay">
        <h3 class="cover-title">{{ item.title }}</h3>
      </div>
    </div>
    
    <!-- 右侧内容区 -->
    <div class="card-content">
      <div class="card-preview">
        <p v-for="(line, index) in previewLines" :key="index" class="preview-line">
          {{ line }}
        </p>
        <button 
          v-if="item.content && item.content.length > previewLength"
          class="view-more-btn"
          @click.stop="toggleExpand"
        >
          {{ expanded ? '收起' : '.......点击查看更多' }}
        </button>
      </div>
      
      <!-- 底部用户信息 -->
      <div class="card-author">
        <img 
          v-if="item.authorAvatar" 
          :src="item.authorAvatar" 
          :alt="item.author"
          class="author-avatar"
        />
        <div v-else class="author-avatar-placeholder">
          {{ item.author?.charAt(0) || 'U' }}
        </div>
        <span class="author-name">{{ item.author }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['click']);

const expanded = ref(false);
const previewLength = 300;

const previewLines = computed(() => {
  if (!props.item.content) return [];
  
  const content = expanded.value 
    ? props.item.content 
    : props.item.content.substring(0, previewLength);
  
  return content.split('\n').filter(line => line.trim());
});

const toggleExpand = () => {
  expanded.value = !expanded.value;
};

const handleCardClick = () => {
  emit('click', props.item);
};
</script>

<style scoped>
.discovery-card {
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.95) 0%, 
    rgba(255, 255, 255, 0.9) 100%);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 
    0 8px 32px rgba(74, 144, 226, 0.12),
    0 0 0 1px rgba(255, 255, 255, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  margin-bottom: 24px;
  animation: fadeInUp 0.5s ease-out;
  display: flex;
  min-height: 300px;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.discovery-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, 
    transparent, 
    rgba(74, 144, 226, 0.1), 
    transparent);
  transition: left 0.6s ease;
  z-index: 1;
}

.discovery-card:hover::before {
  left: 100%;
}

.discovery-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 
    0 16px 48px rgba(74, 144, 226, 0.2),
    0 0 0 1px rgba(74, 144, 226, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  border-color: rgba(74, 144, 226, 0.3);
}

.card-cover {
  flex: 0 0 35%;
  min-width: 280px;
  max-width: 400px;
  overflow: hidden;
  background: linear-gradient(135deg, #4A90E2 0%, #50C9C3 50%, #7BDFF2 100%);
  position: relative;
  display: flex;
  flex-direction: column;
}

.cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.discovery-card:hover .cover-img {
  transform: scale(1.05);
}

.cover-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.6);
  background: linear-gradient(135deg, 
    rgba(74, 144, 226, 0.3) 0%, 
    rgba(80, 201, 195, 0.3) 50%,
    rgba(123, 223, 242, 0.3) 100%);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.cover-title-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: linear-gradient(180deg, 
    rgba(0, 0, 0, 0.7) 0%, 
    rgba(0, 0, 0, 0.4) 50%,
    transparent 100%);
  z-index: 2;
}

.cover-title {
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  line-height: 1.4;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);
  word-break: break-word;
}

.card-content {
  flex: 1;
  padding: 24px;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  min-height: 300px;
}

.card-author {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  flex-shrink: 0;
}

.author-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(74, 144, 226, 0.3);
  transition: all 0.3s ease;
}

.discovery-card:hover .author-avatar {
  border-color: rgba(74, 144, 226, 0.6);
  transform: scale(1.1);
}

.author-avatar-placeholder {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4A90E2, #50C9C3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 16px;
  border: 2px solid rgba(74, 144, 226, 0.3);
}

.author-name {
  font-size: 16px;
  color: #555;
  font-weight: 500;
}

.card-preview {
  color: #666;
  line-height: 1.8;
  font-size: 15px;
  flex: 1;
  overflow: hidden;
  margin-bottom: 16px;
}

.preview-line {
  margin: 8px 0;
}

.view-more-btn {
  margin-top: 12px;
  padding: 8px 16px;
  background: linear-gradient(135deg, #4A90E2 0%, #50C9C3 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
}

.view-more-btn:hover {
  background: linear-gradient(135deg, #50C9C3 0%, #7BDFF2 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(74, 144, 226, 0.4);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .discovery-card {
    flex-direction: column;
    min-height: auto;
  }

  .card-cover {
    flex: 0 0 auto;
    width: 100%;
    min-width: auto;
    max-width: none;
    height: 250px;
  }

  .card-content {
    min-height: auto;
  }
}
</style>
