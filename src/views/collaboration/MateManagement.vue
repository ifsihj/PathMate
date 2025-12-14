<template>
  <div class="mate-management">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1 class="page-title">PATH MATE</h1>
    </div>

    <!-- 主要内容 -->
    <div class="white-wrapper">
      <div class="content-wrapper">
        <!-- 团队成员列表 -->
        <div class="team-members">
          <div class="member-card" v-for="member in members" :key="member.id">
            <div class="member-info">
              <div class="member-avatar" :class="{ leader: member.role === 'leader' }">
                <!-- 根据成员类型动态显示头像 -->
                <img v-if="member.avatar === 'LeaderAvatar'" src="@/assets/images/avatar1.webp" alt="Leader" style="width: 80px; height: 80px;" />
                <img v-else-if="member.avatar === 'StarAvatar'" src="@/assets/images/avatar2.webp" alt="Star" style="width: 80px; height: 80px;" />
                <img v-else-if="member.avatar === 'CatAvatar'" src="@/assets/images/avatar3.jpg" alt="Cat" style="width: 80px; height: 80px;" />
                <!-- 可扩展: 添加更多头像类型 -->
              </div>
              <span class="member-label">{{ member.role === 'leader' ? '组长' : '组员' }}: {{ member.name }}</span>
            </div>
            <div class="member-actions">
              <button class="action-btn view-profile" @click="viewProfile(member)">
                查看资料
              </button>
              <button class="action-btn enter-chat" @click="enterChat(member)">
                进入聊天
              </button>
              <button
                v-if="member.role !== 'leader'"
                class="action-btn delete"
                @click="deleteMember(member)"
              >
                删除
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// 成员数据
const members = ref([
  {
    id: 1,
    name: "xxx",
    role: "leader",
    avatar: "LeaderAvatar",
  },
  {
    id: 2,
    name: "yy",
    role: "member",
    avatar: "StarAvatar",
  },
  {
    id: 3,
    name: "z",
    role: "member",
    avatar: "CatAvatar",
  },
]);

// 操作方法
const viewProfile = (member) => {
  console.log("查看资料:", member);
  // TODO: 实现查看资料功能
};

const enterChat = (member) => {
  console.log("进入聊天:", member);
  // TODO: 实现进入聊天功能
};

const deleteMember = (member) => {
  if (confirm(`确定要删除成员 ${member.name} 吗？`)) {
    const index = members.value.findIndex((m) => m.id === member.id);
    if (index > -1) {
      members.value.splice(index, 1);
    }
  }
};
</script>

<style scoped>
.mate-management {
  width: 100%;
  min-height: calc(100vh - 60px);
}

.page-header {
  text-align: center;
  margin-bottom: 25px;
}

.page-title {
  font-size: 48px;
  font-weight: 700;
  background: linear-gradient(135deg, #4A90E2 0%, #50C9C3 50%, #7BDFF2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 2px;
  text-shadow: 0 4px 20px rgba(74, 144, 226, 0.3);
  animation: fadeInDown 0.6s ease-out;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.white-wrapper {
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.95) 0%, 
    rgba(255, 255, 255, 0.9) 100%);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  padding: 40px;
  border-radius: 24px;
  box-shadow: 
    0 20px 60px rgba(74, 144, 226, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
  max-width: 1100px;
  margin: 0 auto;
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.team-members {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.member-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.9) 0%, 
    rgba(248, 249, 250, 0.8) 100%);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.member-card::before {
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
  transition: left 0.5s ease;
}

.member-card:hover::before {
  left: 100%;
}

.member-card:hover {
  box-shadow: 
    0 12px 32px rgba(74, 144, 226, 0.2),
    0 0 0 1px rgba(74, 144, 226, 0.1);
  transform: translateY(-4px) scale(1.02);
  border-color: rgba(74, 144, 226, 0.3);
}

.member-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.member-avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f0f0f0, #e0e0e0);
  border: 3px solid transparent;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.member-avatar::before {
  content: '';
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  padding: 3px;
  background: linear-gradient(135deg, #4A90E2, #50C9C3);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.member-card:hover .member-avatar::before {
  opacity: 1;
}

.member-card:hover .member-avatar {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 8px 24px rgba(74, 144, 226, 0.4);
}

.member-avatar.leader {
  border-color: #f39c12;
  box-shadow: 0 4px 16px rgba(243, 156, 18, 0.3);
}

.member-avatar.leader::before {
  background: linear-gradient(135deg, #f39c12, #e67e22);
}

.member-label {
  font-size: 18px;
  color: #2c3e50;
  font-weight: 500;
}

.member-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.action-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.action-btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.action-btn:hover::before {
  width: 300px;
  height: 300px;
}

.view-profile {
  background: linear-gradient(135deg, #4A90E2 0%, #50C9C3 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(74, 144, 226, 0.3);
}

.view-profile:hover {
  background: linear-gradient(135deg, #50C9C3 0%, #7BDFF2 100%);
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 8px 24px rgba(74, 144, 226, 0.4);
}

.enter-chat {
  background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(46, 204, 113, 0.3);
}

.enter-chat:hover {
  background: linear-gradient(135deg, #27ae60 0%, #229954 100%);
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 8px 24px rgba(46, 204, 113, 0.4);
}

.delete {
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3);
}

.delete:hover {
  background: linear-gradient(135deg, #c0392b 0%, #a93226 100%);
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 8px 24px rgba(231, 76, 60, 0.4);
}

@media (max-width: 768px) {
  .member-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  .member-actions {
    width: 100%;
    justify-content: flex-start;
  }

  .action-btn {
    flex: 1;
    min-width: 100px;
  }
}
</style>

