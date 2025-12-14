// 聊天API服务 - 预留后端接口
// 目前使用localStorage模拟数据，后续可替换为真实API调用

const API_BASE_URL = '/api/chat'; // 后端API基础路径

// 模拟延迟
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// 获取聊天列表
export const getChatList = async () => {
  // TODO: 替换为真实API调用
  // return fetch(`${API_BASE_URL}/list`).then(res => res.json());
  
  // 模拟API调用
  await delay(300);
  const saved = localStorage.getItem('chat-list');
  if (saved) {
    return JSON.parse(saved);
  }
  return [];
};

// 获取聊天消息
export const getChatMessages = async (chatId) => {
  // TODO: 替换为真实API调用
  // return fetch(`${API_BASE_URL}/messages/${chatId}`).then(res => res.json());
  
  // 模拟API调用
  await delay(200);
  const saved = localStorage.getItem(`chat-messages-${chatId}`);
  if (saved) {
    return JSON.parse(saved);
  }
  return [];
};

// 发送消息
export const sendMessage = async (chatId, message) => {
  // TODO: 替换为真实API调用
  // return fetch(`${API_BASE_URL}/messages`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ chatId, message })
  // }).then(res => res.json());
  
  // 模拟API调用
  await delay(300);
  const newMessage = {
    id: Date.now(),
    chatId,
    senderId: 'current-user', // 当前用户ID
    senderName: '我',
    content: message,
    timestamp: Date.now(),
    type: 'text'
  };
  
  // 保存到localStorage
  const messages = await getChatMessages(chatId);
  messages.push(newMessage);
  localStorage.setItem(`chat-messages-${chatId}`, JSON.stringify(messages));
  
  return newMessage;
};

// 创建或获取聊天会话
export const getOrCreateChat = async (targetUserId, targetUserName, targetUserAvatar, context) => {
  // TODO: 替换为真实API调用
  // return fetch(`${API_BASE_URL}/create`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ targetUserId, context })
  // }).then(res => res.json());
  
  // 模拟API调用
  await delay(300);
  
  // 保存到聊天列表
  const chatList = await getChatList();
  const existingChat = chatList.find(c => c.targetUserId === targetUserId);
  
  if (existingChat) {
    return existingChat;
  }
  
  const chatId = `chat-${targetUserId}-${Date.now()}`;
  const chat = {
    id: chatId,
    targetUserId,
    targetUserName,
    targetUserAvatar,
    context, // 上下文信息，如Path标题等
    lastMessage: null,
    lastMessageTime: Date.now(),
    unreadCount: 0,
    createdAt: Date.now()
  };
  
  chatList.unshift(chat);
  localStorage.setItem('chat-list', JSON.stringify(chatList));
  
  // 初始化示例消息（仅用于演示）
  if (!localStorage.getItem(`chat-messages-${chatId}`)) {
    const sampleMessages = [
      {
        id: Date.now() - 3600000,
        chatId,
        senderId: targetUserId,
        senderName: targetUserName,
        content: '你好！',
        timestamp: Date.now() - 3600000,
        type: 'text'
      }
    ];
    localStorage.setItem(`chat-messages-${chatId}`, JSON.stringify(sampleMessages));
    chat.lastMessage = '你好！';
  }
  
  return chat;
};

// 标记消息为已读
export const markAsRead = async (chatId) => {
  // TODO: 替换为真实API调用
  // return fetch(`${API_BASE_URL}/read/${chatId}`, { method: 'POST' }).then(res => res.json());
  
  // 模拟API调用
  await delay(200);
  const chatList = await getChatList();
  const chat = chatList.find(c => c.id === chatId);
  if (chat) {
    chat.unreadCount = 0;
    localStorage.setItem('chat-list', JSON.stringify(chatList));
  }
  return chat;
};

// 删除聊天
export const deleteChat = async (chatId) => {
  // TODO: 替换为真实API调用
  // return fetch(`${API_BASE_URL}/${chatId}`, { method: 'DELETE' }).then(res => res.json());
  
  // 模拟API调用
  await delay(200);
  const chatList = await getChatList();
  const filtered = chatList.filter(c => c.id !== chatId);
  localStorage.setItem('chat-list', JSON.stringify(filtered));
  localStorage.removeItem(`chat-messages-${chatId}`);
  return { success: true };
};
