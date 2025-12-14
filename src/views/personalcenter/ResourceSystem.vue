<template>
  <div class="resource-system">
    <!-- 用户资料卡片 -->
    <div class="profile-card">
      <!-- 用户头像 -->
      <div class="profile-avatar">
        <img 
          v-if="userProfile.avatar" 
          :src="userProfile.avatar" 
          :alt="userProfile.name"
          class="avatar-img"
        />
        <div v-else class="avatar-placeholder">
          <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
      </div>

      <!-- 用户信息 -->
      <div class="profile-info">
        <h1 class="profile-name">{{ userProfile.name }}</h1>
        <div class="profile-meta">
          <span class="pm-id">PM号:{{ userProfile.pmId }}</span>
          <span class="ip-location">IP属地:{{ userProfile.ipLocation }}</span>
        </div>

        <!-- 个人简介 -->
        <div class="profile-bio">
          <div class="bio-item" v-for="(item, index) in userProfile.bio" :key="index">
            <span class="bio-icon">{{ item.icon }}</span>
            <span class="bio-text">{{ item.text }}</span>
          </div>
        </div>

        <!-- 座右铭 -->
        <div class="profile-motto">
          {{ userProfile.motto }}
        </div>

        <!-- 统计数据 -->
        <div class="profile-stats">
          <span class="stat-item">
            <span class="stat-number">{{ userProfile.stats.mates }}</span>
            <span class="stat-label">Mate</span>
          </span>
          <span class="stat-item">
            <span class="stat-number">{{ userProfile.stats.paths }}</span>
            <span class="stat-label">Path</span>
          </span>
          <span class="stat-item">
            <span class="stat-number">{{ userProfile.stats.likesAndCollections }}</span>
            <span class="stat-label">获赞与收藏</span>
          </span>
        </div>
      </div>
    </div>

    <!-- 内容标签 -->
    <div class="content-tabs">
      <button 
        class="tab-btn" 
        :class="{ active: activeTab === 'created' }"
        @click="activeTab = 'created'"
      >
        我的创建
      </button>
      <button 
        class="tab-btn" 
        :class="{ active: activeTab === 'collected' }"
        @click="activeTab = 'collected'"
      >
        我的收藏
      </button>
    </div>

    <!-- 内容卡片列表 -->
    <div class="content-grid">
      <!-- 我的创建 -->
      <template v-if="activeTab === 'created'">
        <NoteCard
          v-for="item in createdItems"
          :key="item.id"
          :item="item"
        />
      </template>

      <!-- 我的收藏 -->
      <template v-if="activeTab === 'collected'">
        <CollectionCard
          v-for="item in collectedItems"
          :key="item.id"
          :item="item"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import NoteCard from '@/components/NoteCard.vue';
import CollectionCard from '@/components/CollectionCard.vue';

const activeTab = ref('created');

const userProfile = ref({
  name: '王西园',
  pmId: '1145142778',
  ipLocation: '北京',
  avatar: '/src/assets/images/avatar3.jpg',
  bio: [
    { icon: '■', text: 'RJU 23本 | 海腚留子 | Major in 糊弄学 |' },
    { icon: '●', text: '世界最大艺术影院引座员Internship' },
    { icon: '●', text: '男女混血 | AZZD' },
    { icon: '✨', text: '生命是一万次的死去活来' },
  ],
  motto: '势在必得！！!',
  stats: {
    mates: 95,
    paths: 55,
    likesAndCollections: 2345,
  },
});

const createdItems = ref([
  {
    id: 1,
    title: '台湾生存手册 1:消费篇',
    type: 'note',
    icon: '🏖️',
  },
  {
    id: 2,
    title: 'Vue3 项目开发经验分享',
    type: 'note',
    icon: '💻',
  },
  {
    id: 3,
    title: '前端路由设计最佳实践',
    type: 'note',
    icon: '📚',
  },
]);

const collectedItems = ref([
  {
    id: 1,
    title: '有未发表论文的 参考文献列表, 一键导入Zotero 方法',
    type: 'quote',
  },
  {
    id: 2,
    title: '台湾生存手册 2:行李篇',
    type: 'note',
    icon: '🌴',
  },
  {
    id: 3,
    title: '团队协作开发经验',
    type: 'note',
    icon: '👥',
  },
]);
</script>

<style scoped>
.resource-system {
  max-width: 1200px;
  margin: 0 auto;
}

.profile-card {
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(16px);
  border-radius: 20px;
  padding: 36px;
  margin-bottom: 28px;
  box-shadow: 
    0 2px 8px rgba(0, 0, 0, 0.04),
    0 8px 24px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.06);
  display: flex;
  gap: 32px;
}

.profile-avatar {
  flex-shrink: 0;
}

.avatar-img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid rgba(74, 144, 226, 0.3);
  box-shadow: 0 8px 24px rgba(74, 144, 226, 0.2);
}

.avatar-placeholder {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4A90E2, #50C9C3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border: 4px solid rgba(74, 144, 226, 0.3);
  box-shadow: 0 8px 24px rgba(74, 144, 226, 0.2);
}

.profile-info {
  flex: 1;
}

.profile-name {
  font-size: 36px;
  font-weight: 700;
  color: #333;
  margin: 0 0 12px 0;
}

.profile-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
  font-size: 14px;
  color: #666;
}

.pm-id,
.ip-location {
  padding: 4px 12px;
  background: rgba(74, 144, 226, 0.1);
  border-radius: 8px;
}

.profile-bio {
  margin-bottom: 20px;
}

.bio-item {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 15px;
  color: #555;
}

.bio-icon {
  font-size: 18px;
  width: 24px;
  text-align: center;
}

.profile-motto {
  font-size: 28px;
  font-weight: 700;
  color: #4A90E2;
  margin-bottom: 24px;
}

.profile-stats {
  display: flex;
  gap: 32px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.stat-number {
  font-size: 24px;
  font-weight: 700;
  color: #4A90E2;
}

.stat-label {
  font-size: 14px;
  color: #666;
}

.content-tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}

.tab-btn {
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.5);
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 500;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tab-btn:hover {
  background: rgba(255, 255, 255, 0.7);
  transform: translateY(-2px);
}

.tab-btn.active {
  background: rgba(255, 255, 255, 0.95);
  color: #4A90E2;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(74, 144, 226, 0.15);
}

.content-grid {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 16px;
  scrollbar-width: thin;
  scrollbar-color: rgba(74, 144, 226, 0.3) transparent;
}

.content-grid::-webkit-scrollbar {
  height: 8px;
}

.content-grid::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.content-grid::-webkit-scrollbar-thumb {
  background: linear-gradient(90deg, #4A90E2, #50C9C3);
  border-radius: 4px;
}

.content-grid::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(90deg, #50C9C3, #7BDFF2);
}

.content-grid > * {
  flex-shrink: 0;
  width: 300px;
}

@media (max-width: 768px) {
  .profile-card {
    flex-direction: column;
    padding: 24px;
  }

  .profile-name {
    font-size: 28px;
  }

  .profile-motto {
    font-size: 22px;
  }

  .content-grid > * {
    width: 280px;
  }
}
</style>
