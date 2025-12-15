<template>
  <div class="home">
    <!-- 顶部导航栏 -->
    <header class="nav" :class="{ 'nav-home': isHome }">
      <div class="nav-left">
        <router-link to="/" class="logo-link">
          <div class="logo">
            <img :src="logoUrl" alt="PathMate" class="logo-img" />
            <span class="logo-text">PathMate</span>
          </div>
        </router-link>
      </div>
      <nav class="nav-center">        
        <router-link to="/collaboration" class="nav-link">
          <span class="nav-link-text">协作空间</span>
        </router-link>
        <router-link to="/discovery" class="nav-link">
          <span class="nav-link-text">发现</span>
        </router-link>
        <router-link to="/personal-center" class="nav-link">
          <span class="nav-link-text">个人中心</span>
        </router-link>
        <router-link to="/guide" class="nav-link">
          <span class="nav-link-text">新手指导</span>
        </router-link>
      </nav>
      <div class="nav-right">
        <button class="search-btn" @click="handleSearchClick">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </div>
    </header>
  </div>
</template>

<script setup>
import { computed, inject, ref } from "vue";
import { useRoute } from "vue-router";
import logoImage from "@/assets/images/logo.jpg";

// 获取当前路由
const route = useRoute();

// 判断是否在首页
const isHome = computed(() => route.path === "/");

// Logo图片路径
const logoUrl = logoImage;

// 获取全局搜索模态框控制
const showSearchModal = inject('showSearchModal');

// 打开搜索模态框
const handleSearchClick = () => {
  if (showSearchModal) {
    showSearchModal.value = true;
  }
};
</script>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 48px;
  height: 72px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  box-shadow: 
    0 1px 3px rgba(0, 0, 0, 0.05),
    0 8px 24px rgba(0, 0, 0, 0.04);
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-home {
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.1) 0%, 
    rgba(255, 255, 255, 0.05) 100%);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-left {
  display: flex;
  align-items: center;
}

.logo-link {
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;
}

.logo-link:hover {
  transform: scale(1.02);
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-img {
  width: 40px;
  height: 40px;
  object-fit: contain;
  border-radius: 8px;
  transition: all 0.3s ease;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1));
}

.logo-link:hover .logo-img {
  transform: rotate(-5deg) scale(1.05);
  filter: drop-shadow(0 4px 12px rgba(74, 144, 226, 0.3));
}

.nav-home .logo-img {
  filter: drop-shadow(0 2px 8px rgba(255, 255, 255, 0.2));
}

.logo-text {
  font-size: 22px;
  font-weight: 600;
  background: linear-gradient(135deg, #2c3e50 0%, #4A90E2 50%, #50C9C3 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 0.5px;
  position: relative;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
}

.nav-home .logo-text {
  background: linear-gradient(135deg, #FFFFFF 0%, rgba(255, 255, 255, 0.9) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.nav-center {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  justify-content: center;
}

.nav-link {
  position: relative;
  padding: 10px 18px;
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  color: #2c3e50;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 12px;
  cursor: pointer;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
}

.nav-home .nav-link {
  color: rgba(255, 255, 255, 0.9);
}

.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(74, 144, 226, 0.06);
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 12px;
}

.nav-link:hover::before {
  opacity: 1;
}

.nav-link:hover {
  color: #4A90E2;
  transform: translateY(-2px);
}

.nav-home .nav-link:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.15);
}

.nav-link.router-link-active {
  color: #4A90E2;
  background: rgba(74, 144, 226, 0.08);
  font-weight: 600;
}

.nav-home .nav-link.router-link-active {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.2);
}

.nav-link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 2px;
  background: linear-gradient(90deg, #4A90E2, #50C9C3);
  border-radius: 2px;
  opacity: 0.8;
}

.nav-home .nav-link.router-link-active::after {
  background: linear-gradient(90deg, #ffffff, rgba(255, 255, 255, 0.7));
}

.nav-link-text {
  position: relative;
  z-index: 1;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.search-btn {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  border: none;
  background: rgba(74, 144, 226, 0.06);
  color: #4A90E2;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.nav-home .search-btn {
  background: rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.9);
}

.search-btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(74, 144, 226, 0.2);
  transform: translate(-50%, -50%);
  transition: width 0.4s, height 0.4s;
}

.search-btn:hover::before {
  width: 100px;
  height: 100px;
}

.search-btn:hover {
  background: linear-gradient(135deg, 
    rgba(74, 144, 226, 0.2) 0%, 
    rgba(80, 201, 195, 0.2) 100%);
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 6px 20px rgba(74, 144, 226, 0.3);
}

.nav-home .search-btn:hover {
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 6px 20px rgba(255, 255, 255, 0.2);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .nav {
    padding: 0 20px;
    height: 60px;
  }

  .logo-text {
    font-size: 20px;
  }

  .nav-center {
    gap: 4px;
  }

  .nav-link {
    padding: 8px 12px;
    font-size: 14px;
  }

  .search-btn {
    width: 40px;
    height: 40px;
  }
}
</style>
