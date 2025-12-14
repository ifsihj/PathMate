<template>
  <div class="chat-list">
    <div class="chat-list-header">
      <h2>聊天</h2>
      <button class="new-chat-btn" @click="$emit('new-chat')" title="新聊天">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>
    </div>

    <div class="chat-items">
      <div
        v-for="chat in chatList"
        :key="chat.id"
        class="chat-item"
        :class="{ active: activeChatId === chat.id }"
        @click="$emit('select-chat', chat)"
      >
        <div class="chat-item-avatar">
          <img 
            v-if="chat.targetUserAvatar" 
            :src="chat.targetUserAvatar" 
            :alt="chat.targetUserName"
          />
          <div v-else class="avatar-placeholder">
            {{ chat.targetUserName?.charAt(0) || 'U' }}
          </div>
          <span v-if="chat.unreadCount > 0" class="unread-badge">{{ chat.unreadCount }}</span>
        </div>
        <div class="chat-item-content">
          <div class="chat-item-header">
            <h3 class="chat-item-name">{{ chat.targetUserName }}</h3>
            <span class="chat-item-time">{{ formatTime(chat.lastMessageTime) }}</span>
          </div>
          <p class="chat-item-preview">{{ chat.lastMessage || '还没有消息' }}</p>
          <p v-if="chat.context" class="chat-item-context">{{ chat.context }}</p>
        </div>
        <button 
          class="delete-chat-btn"
          @click.stop="$emit('delete-chat', chat.id)"
          title="删除聊天"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      </div>

      <div v-if="chatList.length === 0" class="empty-chat-list">
        <p>还没有聊天记录</p>
        <p class="empty-hint">点击上方按钮开始新聊天</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  chatList: {
    type: Array,
    default: () => []
  },
  activeChatId: {
    type: String,
    default: null
  }
});

defineEmits(['select-chat', 'new-chat', 'delete-chat']);

const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now - date;
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (hours < 24) {
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
  } else if (days < 7) {
    return `${days}天前`;
  } else {
    return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
  }
};
</script>

<style scoped>
.chat-list {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(16px);
  border-right: 1px solid rgba(0, 0, 0, 0.06);
}

.chat-list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.chat-list-header h2 {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.new-chat-btn {
  width: 36px;
  height: 36px;
  border: none;
  background: #4A90E2;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.new-chat-btn:hover {
  background: #3d7bc4;
  transform: scale(1.05);
}

.chat-items {
  flex: 1;
  overflow-y: auto;
}

.chat-items::-webkit-scrollbar {
  width: 6px;
}

.chat-items::-webkit-scrollbar-track {
  background: transparent;
}

.chat-items::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

.chat-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  position: relative;
}

.chat-item:hover {
  background: rgba(74, 144, 226, 0.05);
}

.chat-item.active {
  background: rgba(74, 144, 226, 0.1);
  border-left: 3px solid #4A90E2;
}

.chat-item-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  position: relative;
}

.chat-item-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #4A90E2, #50C9C3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 18px;
}

.unread-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #ff4d4f;
  color: white;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 18px;
  text-align: center;
  border: 2px solid white;
}

.chat-item-content {
  flex: 1;
  min-width: 0;
}

.chat-item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.chat-item-name {
  font-size: 15px;
  font-weight: 600;
  color: #333;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.chat-item-time {
  font-size: 12px;
  color: #999;
  flex-shrink: 0;
  margin-left: 8px;
}

.chat-item-preview {
  font-size: 13px;
  color: #666;
  margin: 0 0 4px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.chat-item-context {
  font-size: 11px;
  color: #999;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.delete-chat-btn {
  width: 28px;
  height: 28px;
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

.chat-item:hover .delete-chat-btn {
  opacity: 1;
}

.delete-chat-btn:hover {
  background: rgba(255, 77, 79, 0.1);
  color: #ff4d4f;
}

.empty-chat-list {
  text-align: center;
  padding: 60px 20px;
  color: #999;
}

.empty-hint {
  font-size: 12px;
  margin-top: 8px;
}
</style>
