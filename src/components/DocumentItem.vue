<template>
  <div class="document-item" @click="$emit('open', document)">
    <div class="doc-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
      </svg>
    </div>
    <div class="doc-info">
      <h4 class="doc-title">{{ document.title }}</h4>
      <p v-if="document.description" class="doc-description">{{ document.description }}</p>
      <p class="doc-meta">
        <span>{{ formatTime(document.createdAt) }}</span>
        <span v-if="document.lastEditor">·</span>
        <span v-if="document.lastEditor">最后编辑: {{ document.lastEditor }}</span>
      </p>
    </div>
    <button 
      class="delete-doc-btn"
      @click.stop="$emit('delete', document.id)"
      title="删除"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      </svg>
    </button>
  </div>
</template>

<script setup>
defineProps({
  document: {
    type: Object,
    required: true
  }
});

defineEmits(['open', 'delete']);

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
.document-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid transparent;
  position: relative;
}

.document-item:hover {
  background: white;
  border-color: rgba(74, 144, 226, 0.2);
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.doc-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4A90E2;
  flex-shrink: 0;
  background: rgba(74, 144, 226, 0.1);
  border-radius: 10px;
}

.doc-info {
  flex: 1;
  min-width: 0;
}

.doc-title {
  font-size: 15px;
  font-weight: 600;
  color: #333;
  margin: 0 0 6px 0;
}

.doc-description {
  font-size: 13px;
  color: #666;
  margin: 0 0 6px 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.doc-meta {
  font-size: 12px;
  color: #999;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 6px;
}

.delete-doc-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: #999;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.document-item:hover .delete-doc-btn {
  opacity: 1;
}

.delete-doc-btn:hover {
  background: rgba(255, 77, 79, 0.1);
  color: #ff4d4f;
}
</style>
