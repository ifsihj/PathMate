<template>
  <div class="file-item">
    <div class="file-icon">
      <svg v-if="isImage" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <circle cx="8.5" cy="8.5" r="1.5"></circle>
        <polyline points="21 15 16 10 5 21"></polyline>
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
      </svg>
    </div>
    <div class="file-info">
      <h4 class="file-name" :title="file.name">{{ file.name }}</h4>
      <p class="file-meta">
        <span>{{ formatFileSize(file.size) }}</span>
        <span>·</span>
        <span>{{ formatTime(file.uploadedAt) }}</span>
        <span v-if="file.uploader">·</span>
        <span v-if="file.uploader">{{ file.uploader }}</span>
      </p>
    </div>
    <div class="file-actions">
      <button class="action-btn" @click="$emit('download', file)" title="下载">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
      </button>
      <button class="action-btn delete" @click="$emit('delete', file.id)" title="删除">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  file: {
    type: Object,
    required: true
  }
});

defineEmits(['download', 'delete']);

const isImage = computed(() => {
  return props.file.type?.startsWith('image/') || 
         /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(props.file.name);
});

const formatFileSize = (bytes) => {
  if (!bytes) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now - date;
  const days = Math.floor(diff / 86400000);

  if (days === 0) {
    return '今天';
  } else if (days === 1) {
    return '昨天';
  } else if (days < 7) {
    return `${days}天前`;
  } else {
    return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
  }
};
</script>

<style scoped>
.file-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.file-item:hover {
  background: white;
  border-color: rgba(74, 144, 226, 0.2);
  transform: translateX(4px);
}

.file-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4A90E2;
  flex-shrink: 0;
  background: rgba(74, 144, 226, 0.1);
  border-radius: 8px;
}

.file-info {
  flex: 1;
  min-width: 0;
}

.file-name {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin: 0 0 4px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-meta {
  font-size: 12px;
  color: #999;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 6px;
}

.file-actions {
  display: flex;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.file-item:hover .file-actions {
  opacity: 1;
}

.action-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: rgba(0, 0, 0, 0.05);
  color: #666;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.action-btn:hover {
  background: rgba(74, 144, 226, 0.1);
  color: #4A90E2;
}

.action-btn.delete:hover {
  background: rgba(255, 77, 79, 0.1);
  color: #ff4d4f;
}
</style>
