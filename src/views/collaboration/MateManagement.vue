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
  font-size: 42px;
  font-weight: bold;
  color: #2c3e50;
  letter-spacing: 1.5px;
}

.white-wrapper {
  background: #ffffff;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(16, 24, 40, 0.08);
  max-width: 1100px;
  margin: 0 auto;
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
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  transition: all 0.3s ease;
}

.member-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.member-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.member-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f0f0;
  border: 3px solid #ddd;
  overflow: hidden;
}

.member-avatar.leader {
  border-color: #f39c12;
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
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.view-profile {
  background: #3498db;
  color: white;
}

.view-profile:hover {
  background: #2980b9;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(52, 152, 219, 0.3);
}

.enter-chat {
  background: #2ecc71;
  color: white;
}

.enter-chat:hover {
  background: #27ae60;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(46, 204, 113, 0.3);
}

.delete {
  background: #e74c3c;
  color: white;
}

.delete:hover {
  background: #c0392b;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(231, 76, 60, 0.3);
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

