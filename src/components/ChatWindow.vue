<template>
  <div class="chat-window">
    <!-- 聊天头部 -->
    <div class="chat-header">
      <div class="chat-user-info">
        <img 
          v-if="chatInfo.targetUserAvatar" 
          :src="chatInfo.targetUserAvatar" 
          :alt="chatInfo.targetUserName"
          class="user-avatar"
        />
        <div v-else class="user-avatar-placeholder">
          {{ chatInfo.targetUserName?.charAt(0) || 'U' }}
        </div>
        <div class="user-details">
          <h3 class="user-name">{{ chatInfo.targetUserName }}</h3>
          <p v-if="chatInfo.context" class="chat-context">{{ chatInfo.context }}</p>
        </div>
      </div>
      <button class="close-btn" @click="$emit('close')">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>

    <!-- 消息列表 -->
    <div class="messages-container" ref="messagesContainer">
      <div 
        v-for="message in messages" 
        :key="message.id"
        class="message-item"
        :class="{ 'message-sent': message.senderId === 'current-user', 'message-received': message.senderId !== 'current-user' }"
      >
        <div class="message-avatar" v-if="message.senderId !== 'current-user'">
          <img 
            v-if="chatInfo.targetUserAvatar" 
            :src="chatInfo.targetUserAvatar" 
            :alt="chatInfo.targetUserName"
          />
          <div v-else class="avatar-placeholder">
            {{ chatInfo.targetUserName?.charAt(0) || 'U' }}
          </div>
        </div>
        <div class="message-content">
          <div class="message-bubble">
            <p class="message-text">{{ message.content }}</p>
            <span class="message-time">{{ formatTime(message.timestamp) }}</span>
          </div>
        </div>
      </div>
      
      <div v-if="messages.length === 0" class="empty-messages">
        <p>还没有消息，开始聊天吧！</p>
      </div>
    </div>

    <!-- 输入框 -->
    <div class="chat-input-container">
      <div class="input-wrapper">
        <textarea
          v-model="inputMessage"
          @keydown.enter.exact.prevent="handleSend"
          @keydown.shift.enter.exact="inputMessage += '\n'"
          placeholder="输入消息..."
          class="message-input"
          rows="1"
          ref="messageInput"
        ></textarea>
        <button 
          class="send-btn" 
          @click="handleSend"
          :disabled="!inputMessage.trim()"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted } from 'vue';
import { sendMessage, getChatMessages, markAsRead } from '@/services/chatApi';
import { message } from 'ant-design-vue';

const props = defineProps({
  chatInfo: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['close', 'message-sent']);

const messages = ref([]);
const inputMessage = ref('');
const messagesContainer = ref(null);
const messageInput = ref(null);
const loading = ref(false);

// 加载消息
const loadMessages = async () => {
  try {
    loading.value = true;
    const msgs = await getChatMessages(props.chatInfo.id);
    messages.value = msgs;
    await nextTick();
    scrollToBottom();
    // 标记为已读
    await markAsRead(props.chatInfo.id);
  } catch (error) {
    console.error('Failed to load messages:', error);
    message.error('加载消息失败');
  } finally {
    loading.value = false;
  }
};

// 发送消息
const handleSend = async () => {
  if (!inputMessage.value.trim()) return;

  const content = inputMessage.value.trim();
  inputMessage.value = '';

  try {
    const newMsg = await sendMessage(props.chatInfo.id, content);
    messages.value.push(newMsg);
    await nextTick();
    scrollToBottom();
    
    // 通知父组件更新聊天列表
    emit('message-sent', {
      chatId: props.chatInfo.id,
      lastMessage: content,
      lastMessageTime: newMsg.timestamp
    });
  } catch (error) {
    console.error('Failed to send message:', error);
    message.error('发送消息失败');
    inputMessage.value = content; // 恢复输入内容
  }
};

// 滚动到底部
const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

// 格式化时间
const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now - date;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) {
    return '刚刚';
  } else if (minutes < 60) {
    return `${minutes}分钟前`;
  } else if (hours < 24) {
    return `${hours}小时前`;
  } else if (days < 7) {
    return `${days}天前`;
  } else {
    return date.toLocaleDateString();
  }
};

// 监听消息变化，自动滚动
watch(messages, () => {
  nextTick(() => {
    scrollToBottom();
  });
}, { deep: true });

onMounted(() => {
  loadMessages();
  // 聚焦输入框
  nextTick(() => {
    if (messageInput.value) {
      messageInput.value.focus();
    }
  });
});
</script>

<style scoped>
.chat-window {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(16px);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  background: rgba(255, 255, 255, 0.98);
}

.chat-user-info {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.user-avatar,
.user-avatar-placeholder {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(74, 144, 226, 0.2);
}

.user-avatar-placeholder {
  background: linear-gradient(135deg, #4A90E2, #50C9C3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 18px;
}

.user-details {
  flex: 1;
}

.user-name {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 4px 0;
}

.chat-context {
  font-size: 12px;
  color: #999;
  margin: 0;
}

.close-btn {
  width: 36px;
  height: 36px;
  border: none;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: rgba(0, 0, 0, 0.1);
  color: #333;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: #f8f9fa;
}

.messages-container::-webkit-scrollbar {
  width: 6px;
}

.messages-container::-webkit-scrollbar-track {
  background: transparent;
}

.messages-container::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

.message-item {
  display: flex;
  gap: 12px;
  align-items: flex-end;
}

.message-item.message-sent {
  flex-direction: row-reverse;
}

.message-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.message-avatar img {
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
  font-size: 14px;
}

.message-content {
  max-width: 70%;
}

.message-bubble {
  padding: 12px 16px;
  border-radius: 16px;
  position: relative;
}

.message-sent .message-bubble {
  background: #4A90E2;
  color: white;
  border-bottom-right-radius: 4px;
}

.message-received .message-bubble {
  background: white;
  color: #333;
  border-bottom-left-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.message-text {
  margin: 0 0 4px 0;
  word-wrap: break-word;
  white-space: pre-wrap;
  line-height: 1.5;
}

.message-time {
  font-size: 11px;
  opacity: 0.7;
  display: block;
  margin-top: 4px;
}

.empty-messages {
  text-align: center;
  color: #999;
  padding: 40px 20px;
}

.chat-input-container {
  padding: 16px 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  background: rgba(255, 255, 255, 0.98);
}

.input-wrapper {
  display: flex;
  gap: 12px;
  align-items: flex-end;
}

.message-input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  font-size: 14px;
  font-family: inherit;
  resize: none;
  max-height: 120px;
  transition: all 0.3s ease;
}

.message-input:focus {
  outline: none;
  border-color: #4A90E2;
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
}

.send-btn {
  width: 44px;
  height: 44px;
  border: none;
  background: #4A90E2;
  color: white;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.send-btn:hover:not(:disabled) {
  background: #3d7bc4;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
