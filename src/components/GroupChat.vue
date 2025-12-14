<template>
  <div class="group-chat">
    <div class="chat-messages" ref="messagesContainer">
      <div 
        v-for="message in messages" 
        :key="message.id"
        class="message-item"
        :class="{ 'message-sent': message.senderId === 'current-user' }"
      >
        <div class="message-avatar" v-if="message.senderId !== 'current-user'">
          <img 
            v-if="message.senderAvatar" 
            :src="message.senderAvatar" 
            :alt="message.senderName"
          />
          <div v-else class="avatar-placeholder">
            {{ message.senderName?.charAt(0) || 'U' }}
          </div>
        </div>
        <div class="message-content">
          <div v-if="message.senderId !== 'current-user'" class="message-sender">
            {{ message.senderName }}
          </div>
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
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
import { sendGroupMessage, getGroupMessages } from '@/services/chatApi';
import { message } from 'ant-design-vue';

const props = defineProps({
  chatId: {
    type: String,
    required: true
  }
});

const messages = ref([]);
const inputMessage = ref('');
const messagesContainer = ref(null);
const messageInput = ref(null);

// 加载消息
const loadMessages = async () => {
  try {
    const msgs = await getGroupMessages(props.chatId);
    messages.value = msgs;
    await nextTick();
    scrollToBottom();
  } catch (error) {
    console.error('Failed to load messages:', error);
  }
};

// 发送消息
const handleSend = async () => {
  if (!inputMessage.value.trim()) return;

  const content = inputMessage.value.trim();
  inputMessage.value = '';

  try {
    const newMsg = await sendGroupMessage(props.chatId, content);
    messages.value.push(newMsg);
    await nextTick();
    scrollToBottom();
  } catch (error) {
    console.error('Failed to send message:', error);
    message.error('发送消息失败');
    inputMessage.value = content;
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
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

watch(messages, () => {
  nextTick(() => {
    scrollToBottom();
  });
}, { deep: true });

onMounted(() => {
  loadMessages();
  nextTick(() => {
    if (messageInput.value) {
      messageInput.value.focus();
    }
  });
});
</script>

<style scoped>
.group-chat {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #f8f9fa;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.chat-messages::-webkit-scrollbar {
  width: 6px;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

.message-item {
  display: flex;
  gap: 8px;
  align-items: flex-start;
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

.message-sender {
  font-size: 12px;
  color: #999;
  margin-bottom: 4px;
  padding: 0 4px;
}

.message-bubble {
  padding: 10px 14px;
  border-radius: 12px;
  position: relative;
}

.message-sent .message-bubble {
  background: #4A90E2;
  color: white;
  border-bottom-right-radius: 4px;
}

.message-item:not(.message-sent) .message-bubble {
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
  font-size: 14px;
}

.message-time {
  font-size: 11px;
  opacity: 0.7;
  display: block;
}

.empty-messages {
  text-align: center;
  color: #999;
  padding: 40px 20px;
}

.chat-input-container {
  padding: 12px 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  background: white;
}

.input-wrapper {
  display: flex;
  gap: 8px;
  align-items: flex-end;
}

.message-input {
  flex: 1;
  padding: 10px 14px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  font-size: 14px;
  font-family: inherit;
  resize: none;
  max-height: 100px;
  transition: all 0.3s ease;
}

.message-input:focus {
  outline: none;
  border-color: #4A90E2;
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
}

.send-btn {
  width: 40px;
  height: 40px;
  border: none;
  background: #4A90E2;
  color: white;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.send-btn:hover:not(:disabled) {
  background: #3d7bc4;
  transform: scale(1.05);
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
