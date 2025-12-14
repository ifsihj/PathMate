<template>
  <div class="collaboration">

    <!-- 左侧导航栏 -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <h2 class="sidebar-title">协作空间</h2>
      </div>
      <nav class="sidebar-nav">
        <ul>
          <li>
            <router-link to="/collaboration/path-description" class="nav-item">
              Path概况
            </router-link>
          </li>
          <li>
            <router-link to="/collaboration/mate-management" class="nav-item">
              Mate管理
            </router-link>
          </li>
          <li>
            <router-link to="/collaboration/task-system" class="nav-item">
              任务系统
            </router-link>
          </li>
          <li>
            <router-link to="/collaboration/work-system" class="nav-item">
              工作系统
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
// 协作空间主视图，包含顶部导航、侧边栏和子路由内容
</script>

<style scoped>
.collaboration {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: url("@/assets/images/BackGround.webp") center / cover no-repeat;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  position: relative;
}

/* 顶部导航栏样式 */
.top-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 15px 40px;
  height: 60px;
  display: flex;
  align-items: center;
}

.nav-center {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
}

.nav-center a {
  color: #2c3e50;
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
  transition: color 0.3s ease;
  cursor: pointer;
}

.nav-center a:hover {
  color: #3498db;
}

.nav-center a.router-link-active {
  color: #3498db;
  font-weight: 600;
}

.search-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  cursor: pointer;
}

/* 左侧导航栏样式 */
.sidebar {
  position: fixed;
  left: 0;
  top: 60px;
  bottom: 0;
  width: 260px;
  background-color: transparent;
  backdrop-filter: blur(10px);
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  overflow-y: auto;
  z-index: 999;
}

.sidebar-header {
  padding: 0 20px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.sidebar-title {
  font-size: 20px;
  font-weight: bold;
  color: #d35400;
  background: #f39c12;
  padding: 6px 12px;
  border-radius: 16px;
  display: inline-block;
  white-space: nowrap;
}

.sidebar-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-nav li {
  margin: 8px 0;
}

.nav-item {
  display: block;
  padding: 12px 20px;
  color: #555;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease;
  border-left: 4px solid transparent;
  white-space: nowrap;
  margin: 0 10px;
  border-radius: 8px;
}

.nav-item:hover {
  background-color: #e3f2fd;
  border-left-color: #3498db;
  color: #2c3e50;
}

/* 被点击/激活的样式：粉色托底并放大 */
.nav-item.router-link-active {
  background: linear-gradient(90deg, #ffeef6 0%, #ffd6e8 100%);
  transform: scale(1.05);
  box-shadow: 0 6px 18px rgba(255, 118, 165, 0.12);
  color: #7a0030;
  border-left-color: #ff76a5;
}

/* 主内容区样式 */
.main-content {
  flex: 1;
  margin-left: 260px;
  margin-top: 60px;
  overflow-y: auto;
  padding: 30px;
  display: flex;
  flex-direction: column;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .top-nav {
    padding: 10px 20px;
  }

  .nav-center {
    gap: 15px;
    flex-wrap: wrap;
  }

  .nav-center a {
    font-size: 14px;
  }

  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
    top: 0;
  }

  .main-content {
    margin-left: 0;
    margin-top: 0;
    padding: 15px;
  }
}
</style>
