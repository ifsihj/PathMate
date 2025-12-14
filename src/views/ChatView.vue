<template>
  <div class="chat-view">
    <div class="chat-layout">
      <!-- 聊天列表 -->
      <ChatList
        :chat-list="chatList"
        :active-chat-id="activeChatId"
        @select-chat="handleSelectChat"
        @new-chat="showNewChatModal = true"
        @delete-chat="handleDeleteChat"
      />

      <!-- 聊天窗口 -->
      <div class="chat-window-container">
        <div v-if="activeChat" class="chat-window-wrapper">
          <ChatWindow
            :chat-info="activeChat"
            @close="activeChatId = null"
            @message-sent="handleMessageSent"
          />
        </div>
        <div v-else class="no-chat-selected">
          <div class="empty-state">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <p>选择一个聊天开始对话</p>
            <button class="start-chat-btn" @click="showNewChatModal = true">
              开始新聊天
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 新聊天模态框 -->
    <a-modal
      v-model:open="showNewChatModal"
      title="开始新聊天"
      :width="500"
      @ok="handleCreateChat"
      @cancel="resetNewChatForm"
    >
      <a-form :model="newChatForm" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
        <a-form-item label="用户名" required>
          <a-input 
            v-model:value="newChatForm.userName" 
            placeholder="请输入用户名"
          />
        </a-form-item>
        <a-form-item label="用户ID">
          <a-input 
            v-model:value="newChatForm.userId" 
            placeholder="可选：用户ID"
          />
        </a-form-item>
        <a-form-item label="上下文">
          <a-input 
            v-model:value="newChatForm.context" 
            placeholder="可选：聊天上下文（如Path标题）"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import ChatList from '@/components/ChatList.vue';
import ChatWindow from '@/components/ChatWindow.vue';
import { getChatList, getOrCreateChat, deleteChat } from '@/services/chatApi';

const route = useRoute();
const router = useRouter();

const chatList = ref([]);
const activeChatId = ref(null);
const showNewChatModal = ref(false);
const newChatForm = ref({
  userName: '',
  userId: '',
  context: ''
});

const activeChat = computed(() => {
  if (!activeChatId.value) return null;
  return chatList.value.find(chat => chat.id === activeChatId.value);
});

// 加载聊天列表
const loadChatList = async () => {
  try {
    const list = await getChatList();
    chatList.value = list;
    
    // 如果有URL参数，打开对应的聊天
    const chatId = route.query.chatId;
    if (chatId && list.find(c => c.id === chatId)) {
      activeChatId.value = chatId;
    } else if (list.length > 0 && !activeChatId.value) {
      activeChatId.value = list[0].id;
    }
  } catch (error) {
    console.error('Failed to load chat list:', error);
    message.error('加载聊天列表失败');
  }
};

// 选择聊天
const handleSelectChat = (chat) => {
  activeChatId.value = chat.id;
  router.replace({ query: { chatId: chat.id } });
};

// 创建新聊天
const handleCreateChat = async () => {
  if (!newChatForm.value.userName.trim()) {
    message.warning('请输入用户名');
    return;
  }

  try {
    const userId = newChatForm.value.userId || `user-${Date.now()}`;
    const chat = await getOrCreateChat(
      userId,
      newChatForm.value.userName,
      null,
      newChatForm.value.context || null
    );
    
    await loadChatList();
    activeChatId.value = chat.id;
    showNewChatModal.value = false;
    resetNewChatForm();
    message.success('聊天已创建');
  } catch (error) {
    console.error('Failed to create chat:', error);
    message.error('创建聊天失败');
  }
};

// 删除聊天
const handleDeleteChat = async (chatId) => {
  try {
    await deleteChat(chatId);
    await loadChatList();
    if (activeChatId.value === chatId) {
      activeChatId.value = null;
    }
    message.success('聊天已删除');
  } catch (error) {
    console.error('Failed to delete chat:', error);
    message.error('删除聊天失败');
  }
};

// 处理消息发送
const handleMessageSent = async (data) => {
  // 更新聊天列表中的最后一条消息
  const chat = chatList.value.find(c => c.id === data.chatId);
  if (chat) {
    chat.lastMessage = data.lastMessage;
    chat.lastMessageTime = data.lastMessageTime;
    // 保存到localStorage
    localStorage.setItem('chat-list', JSON.stringify(chatList.value));
  }
};

// 重置表单
const resetNewChatForm = () => {
  newChatForm.value = {
    userName: '',
    userId: '',
    context: ''
  };
};

onMounted(() => {
  loadChatList();
  
  // 如果有URL参数，创建新聊天
  const targetUserId = route.query.userId;
  const targetUserName = route.query.userName;
  const context = route.query.context;
  
  if (targetUserId && targetUserName) {
    getOrCreateChat(targetUserId, targetUserName, route.query.avatar || null, context)
      .then(chat => {
        loadChatList().then(() => {
          activeChatId.value = chat.id;
          router.replace({ query: { chatId: chat.id } });
        });
      });
  }
});
</script>

<style scoped>
.chat-view {
  width: 100%;
  height: calc(100vh - 72px);
  margin-top: 72px;
  padding: 20px;
}

.chat-layout {
  display: flex;
  height: 100%;
  max-width: 1400px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(16px);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.chat-window-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.chat-window-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.no-chat-selected {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
}

.empty-state {
  text-align: center;
  color: #999;
}

.empty-state svg {
  color: #ccc;
  margin-bottom: 16px;
}

.empty-state p {
  font-size: 16px;
  margin: 0 0 24px 0;
}

.start-chat-btn {
  padding: 12px 24px;
  background: #4A90E2;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.start-chat-btn:hover {
  background: #3d7bc4;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
}

@media (max-width: 768px) {
  .chat-layout {
    flex-direction: column;
  }
  
  .chat-list {
    border-right: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    max-height: 40vh;
  }
}
</style>
