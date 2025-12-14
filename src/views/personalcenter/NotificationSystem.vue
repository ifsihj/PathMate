<template>
  <div class="notification-system">
    <div class="notification-header">
      <h2>通知系统</h2>
      <button class="mark-all-read" @click="markAllAsRead">全部标记为已读</button>
    </div>

    <div class="notifications-list">
      <div 
        v-for="notification in notifications" 
        :key="notification.id"
        class="notification-item"
        :class="{ unread: !notification.read }"
        @click="markAsRead(notification.id)"
      >
        <div class="notification-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
        </div>
        <div class="notification-content">
          <h3 class="notification-title">{{ notification.title }}</h3>
          <p class="notification-message">{{ notification.message }}</p>
          <span class="notification-time">{{ formatTime(notification.createdAt) }}</span>
        </div>
        <div v-if="!notification.read" class="unread-indicator"></div>
      </div>

      <div v-if="notifications.length === 0" class="empty-state">
        <p>暂无通知</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { message } from 'ant-design-vue';

const notifications = ref([
  {
    id: 1,
    title: '新的点赞',
    message: '有人为您的文章《Vue3 项目开发经验分享》点赞了',
    read: false,
    createdAt: Date.now() - 3600000, // 1小时前
  },
  {
    id: 2,
    title: '新的评论',
    message: '小红评论了您的文章：非常实用的经验分享，学到了很多！',
    read: false,
    createdAt: Date.now() - 7200000, // 2小时前
  },
  {
    id: 3,
    title: 'Path申请',
    message: '有人申请加入您的Path《信息架构小组 找3人!!!》',
    read: true,
    createdAt: Date.now() - 86400000, // 1天前
  },
]);

const formatTime = (timestamp) => {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 60) {
    return `${minutes}分钟前`;
  } else if (hours < 24) {
    return `${hours}小时前`;
  } else {
    return `${days}天前`;
  }
};

const markAsRead = (id) => {
  const notification = notifications.value.find(n => n.id === id);
  if (notification && !notification.read) {
    notification.read = true;
    message.success('已标记为已读');
  }
};

const markAllAsRead = () => {
  notifications.value.forEach(n => n.read = true);
  message.success('已全部标记为已读');
};
</script>

<style scoped>
.notification-system {
  max-width: 1200px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.notification-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid rgba(74, 144, 226, 0.1);
}

.notification-header h2 {
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin: 0;
}

.mark-all-read {
  padding: 8px 16px;
  background: linear-gradient(135deg, #4A90E2 0%, #50C9C3 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.mark-all-read:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
}

.notifications-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.notification-item {
  display: flex;
  gap: 16px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.notification-item:hover {
  background: rgba(255, 255, 255, 1);
  border-color: rgba(74, 144, 226, 0.3);
  transform: translateX(4px);
}

.notification-item.unread {
  background: rgba(74, 144, 226, 0.05);
  border-color: rgba(74, 144, 226, 0.2);
}

.notification-icon {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4A90E2 0%, #50C9C3 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.notification-content {
  flex: 1;
}

.notification-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px 0;
}

.notification-message {
  font-size: 14px;
  color: #666;
  margin: 0 0 8px 0;
  line-height: 1.5;
}

.notification-time {
  font-size: 12px;
  color: #999;
}

.unread-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #4A90E2;
  flex-shrink: 0;
  align-self: center;
  box-shadow: 0 0 8px rgba(74, 144, 226, 0.5);
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #999;
}

.empty-state p {
  font-size: 16px;
  margin: 0;
}
</style>
