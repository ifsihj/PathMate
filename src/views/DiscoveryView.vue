<template>
  <div class="discovery">
    <!-- 左侧导航栏 -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <h2 class="sidebar-title">发现</h2>
      </div>
      <nav class="sidebar-nav">
        <ul>
          <li>
            <router-link to="/discovery/path" class="nav-item">
              <span class="nav-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
              </span>
              <span class="nav-text">Path</span>
              <span class="nav-indicator"></span>
            </router-link>
          </li>
          <li>
            <router-link to="/discovery/mate" class="nav-item">
              <span class="nav-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </span>
              <span class="nav-text">Mate</span>
              <span class="nav-indicator"></span>
            </router-link>
          </li>
          <li>
            <router-link to="/discovery/articles" class="nav-item">
              <span class="nav-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                  <line x1="8" y1="7" x2="16" y2="7"></line>
                  <line x1="8" y1="11" x2="16" y2="11"></line>
                  <line x1="8" y1="15" x2="12" y2="15"></line>
                </svg>
              </span>
              <span class="nav-text">经验文章</span>
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
// 发现页面主视图
</script>

<style scoped>
.discovery {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: url("@/assets/images/BackGround.webp") center / cover no-repeat;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  position: relative;
}

/* 左侧导航栏样式 */
.sidebar {
  position: fixed;
  left: 0;
  top: 60px;
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
    rgba(74, 144, 226, 0.3) 0%, 
    rgba(80, 201, 195, 0.3) 50%,
    rgba(123, 223, 242, 0.3) 100%);
  border-left-color: #4A90E2;
  color: #ffffff;
  transform: translateX(8px);
  box-shadow: 
    0 8px 24px rgba(74, 144, 226, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  font-weight: 600;
}

.nav-item.router-link-active .nav-icon {
  transform: scale(1.15);
  color: #ffffff;
  filter: drop-shadow(0 0 8px rgba(74, 144, 226, 0.8));
}

.nav-item.router-link-active .nav-indicator {
  background: linear-gradient(135deg, #4A90E2, #50C9C3);
  box-shadow: 
    0 0 10px rgba(74, 144, 226, 0.8),
    0 0 20px rgba(74, 144, 226, 0.4);
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

.nav-item.router-link-active::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, 
    rgba(74, 144, 226, 0.1) 0%, 
    transparent 50%);
  pointer-events: none;
  border-radius: 12px;
}

.main-content {
  flex: 1;
  margin-left: 280px;
  margin-top: 60px;
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
  background: linear-gradient(180deg, #4A90E2, #50C9C3);
  border-radius: 10px;
  transition: background 0.3s ease;
}

.sidebar::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #50C9C3, #7BDFF2);
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
    margin-top: 0;
    padding: 15px;
  }
}
</style>
