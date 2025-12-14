<template>
  <div class="personal-center">
    <!-- 左侧导航栏 -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <h2 class="sidebar-title">个人中心</h2>
      </div>
      <nav class="sidebar-nav">
        <ul>
          <li>
            <router-link to="/personal-center/resources" class="nav-item">
              <span class="nav-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
              </span>
              <span class="nav-text">资源系统</span>
              <span class="nav-indicator"></span>
            </router-link>
          </li>
          <li>
            <router-link to="/personal-center/notifications" class="nav-item">
              <span class="nav-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
              </span>
              <span class="nav-text">通知系统</span>
              <span class="nav-indicator"></span>
            </router-link>
          </li>
          <li>
            <router-link to="/personal-center/settings" class="nav-item">
              <span class="nav-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M12 1v6m0 6v6m9-9h-6m-6 0H3m15.364 6.364l-4.243-4.243m-4.242 0L5.636 18.364m12.728 0l-4.243-4.243m-4.242 0L5.636 5.636"></path>
                </svg>
              </span>
              <span class="nav-text">设置</span>
              <span class="nav-indicator"></span>
            </router-link>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- 右侧主内容区 -->
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
// 个人中心主视图
</script>

<style scoped>
.personal-center {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: url("@/assets/images/BackGround.webp") center / cover no-repeat;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  position: relative;
  padding-top: 70px;
}

/* 左侧导航栏样式 */
.sidebar {
  position: fixed;
  left: 0;
  top: 70px;
  bottom: 0;
  width: 280px;
  background: linear-gradient(180deg, 
    rgba(255, 255, 255, 0.1) 0%, 
    rgba(255, 255, 255, 0.05) 100%);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  box-shadow: 
    2px 0 20px rgba(0, 0, 0, 0.1),
    inset -1px 0 0 rgba(255, 255, 255, 0.2);
  border-right: 1px solid rgba(255, 255, 255, 0.18);
  display: flex;
  flex-direction: column;
  padding: 24px 0;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 999;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.sidebar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: linear-gradient(180deg, 
    rgba(74, 144, 226, 0.15) 0%, 
    rgba(80, 201, 195, 0.1) 50%,
    transparent 100%);
  pointer-events: none;
  z-index: -1;
}

.sidebar-header {
  padding: 0 24px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 16px;
  position: relative;
}

.sidebar-title {
  font-size: 22px;
  font-weight: 700;
  background: linear-gradient(135deg, #4A90E2 0%, #50C9C3 50%, #7BDFF2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  padding: 8px 16px;
  border-radius: 12px;
  display: inline-block;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(74, 144, 226, 0.3);
}

.sidebar-title::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, 
    transparent, 
    rgba(255, 255, 255, 0.3), 
    transparent);
  animation: shimmer 3s infinite;
}

@keyframes shimmer {
  0% { left: -100%; }
  100% { left: 100%; }
}

.sidebar-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  position: relative;
}

.sidebar-nav li {
  margin: 6px 0;
  position: relative;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 24px;
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-left: 3px solid transparent;
  white-space: nowrap;
  margin: 0 12px;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
}

.nav-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, 
    transparent, 
    rgba(255, 255, 255, 0.1), 
    transparent);
  transition: left 0.5s ease;
}

.nav-item:hover::before {
  left: 100%;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.15);
  border-left-color: #4A90E2;
  color: #ffffff;
  transform: translateX(8px);
  box-shadow: 
    0 4px 12px rgba(74, 144, 226, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.nav-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
}

.nav-item:hover .nav-icon {
  transform: scale(1.2) rotate(5deg);
  color: #4A90E2;
}

.nav-text {
  flex: 1;
  position: relative;
  z-index: 1;
}

.nav-indicator {
  position: absolute;
  right: 12px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: transparent;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
}

.nav-item.router-link-active {
  background: linear-gradient(135deg, 
    rgba(255, 107, 107, 0.4) 0%, 
    rgba(255, 159, 64, 0.4) 100%);
  border-left-color: #ff6b6b;
  color: #ffffff;
  transform: translateX(8px);
  box-shadow: 
    0 8px 24px rgba(255, 107, 107, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  font-weight: 600;
}

.nav-item.router-link-active .nav-icon {
  transform: scale(1.15);
  color: #ffffff;
  filter: drop-shadow(0 0 8px rgba(255, 107, 107, 0.8));
}

.nav-item.router-link-active .nav-indicator {
  background: linear-gradient(135deg, #ff6b6b, #ff9f40);
  box-shadow: 
    0 0 10px rgba(255, 107, 107, 0.8),
    0 0 20px rgba(255, 107, 107, 0.4);
  opacity: 1;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.3);
    opacity: 0.7;
  }
}

.main-content {
  flex: 1;
  margin-left: 280px;
  overflow-y: auto;
  padding: 30px;
  display: flex;
  flex-direction: column;
  transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.sidebar::-webkit-scrollbar {
  width: 6px;
}

.sidebar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}

.sidebar::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #ff6b6b, #ff9f40);
  border-radius: 10px;
  transition: background 0.3s ease;
}

.sidebar::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #ff9f40, #ffb84d);
}

@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
    top: 0;
    backdrop-filter: blur(15px);
  }

  .main-content {
    margin-left: 0;
    padding: 15px;
  }
}
</style>
