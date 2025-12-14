<template>
  <div class="note-card">
    <div class="note-header">
      <span class="note-label">Notes</span>
      <div class="note-actions">
        <button class="action-icon" title="上传">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
        </button>
        <button class="action-icon" title="历史">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        </button>
      </div>
    </div>
    <div class="note-content">
      <h3 class="note-title">{{ item.title }}</h3>
    </div>
    <div class="note-footer">
      <span class="note-icon">{{ item.icon || '📝' }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.note-card {
  background: 
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 19px,
      rgba(0, 0, 0, 0.1) 19px,
      rgba(0, 0, 0, 0.1) 20px
    ),
    linear-gradient(
      to bottom,
      #fef9e7 0%,
      #fffef5 100%
    );
  border-radius: 16px;
  padding: 24px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.note-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.note-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px dashed rgba(0, 0, 0, 0.2);
}

.note-label {
  font-size: 12px;
  font-weight: 600;
  color: #666;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.note-actions {
  display: flex;
  gap: 8px;
}

.action-icon {
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  color: #666;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.action-icon:hover {
  background: rgba(0, 0, 0, 0.1);
  color: #4A90E2;
}

.note-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.note-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
  text-align: center;
  line-height: 1.4;
}

.note-footer {
  display: flex;
  justify-content: center;
  margin-top: auto;
  padding-top: 16px;
}

.note-icon {
  font-size: 32px;
}
</style>
