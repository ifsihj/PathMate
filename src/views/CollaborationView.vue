<template>
  <div class="collaboration">
    <!-- 左侧导航栏 -->
    <aside
      class="sidebar"
      :class="{ 'sidebar-expanded': isExpanded }"
      @click="toggleSidebar"
    >
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
      <!-- 页面标题 -->
      <div class="page-header">
        <h1 class="page-title">PATH MATE</h1>
      </div>

      <!-- 主要内容（支持 Markdown） -->
      <div class="white-wrapper">
        <div class="content-wrapper">
          <div class="markdown-content" v-html="compiledMarkdown"></div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { marked } from "marked";

// 控制侧边栏点击展开/收起
const isExpanded = ref(false);

const toggleSidebar = () => {
  isExpanded.value = !isExpanded.value;
};

// 假设这是从后端或用户输入获取的 Markdown 内容
const rawMarkdown = ref(`
## 信息架构小组招募

![帮助图标](https://media.canva.cn/v2/image-resize/format:JPG/height:800/quality:92/uri:ifs%3A%2F%2FM%2F79aba401-82d7-4b1c-8cb0-0087bde3ea5c/watermark:F/width:562?csig=AAAAAAAAAAAAAAAAAAAAAC7ynQkmXnhb-ZzS4AlnwWbmK8OLNbgmfcNQn-0QUdfZ&exp=1765644225&osig=AAAAAAAAAAAAAAAAAAAAAHhHCk66LP0OmSbWAGIWQdB1j-M5FS5i4z7h16jYYExx&signer=media-rpc&x-canva-quality=screen)

**“同行者”** 是一个面向高校学生的成长协作与经验连接平台，旨在解决：
- 找不到合适的人
- 连接无法持续
- 经验无法沉淀

平台围绕真实的成长路径，将正在经历相似阶段的学生（同行者）与已经走过相关路径的学长学姐或前辈（过来人）进行结构化连接。

### 团队成员

| 角色 | 姓名 |
|------|------|
| 组长 | xxx |
| 组员 | yy, z |

> 欢迎加入我们！
`);

// 渲染 Markdown
const compiledMarkdown = computed(() => {
  return marked.parse(rawMarkdown.value, {
    sanitize: true, // 防 XSS（会过滤 HTML 标签）
    breaks: true,
    gfm: true,
  });
});
</script>

<style scoped>
.collaboration {
  display: flex;
  height: 100vh;
  background: url("@/assets/images/BackGround.webp") center / cover no-repeat;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

/* 左侧导航栏样式 */
.sidebar {
  width: 60px;
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  overflow: hidden;
  transition: width 0.3s ease;
  cursor: pointer;
}

.sidebar-expanded {
  width: 260px;
}

.sidebar-header,
.sidebar-nav {
  opacity: 0;
  transform: translateX(-20px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.sidebar-expanded .sidebar-header,
.sidebar-expanded .sidebar-nav {
  opacity: 1;
  transform: translateX(0);
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
  margin: 12px 0;
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
}

.nav-item:hover,
.nav-item.router-link-active {
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
}

/* 主内容区样式 */
.main-content {
  flex: 1;
  overflow-y: auto;
  padding: 30px;
  display: flex;
  flex-direction: column;
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

/* 白色外层 wrapper，让页面视觉更干净 */
.white-wrapper {
  background: #ffffff;
  padding: 22px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(16, 24, 40, 0.08);
  max-width: 1100px;
  margin: 0 auto;
  width: calc(100% - 80px);
}

.content-wrapper {
  background-color: rgba(255, 255, 255, 0.98);
  padding: 18px;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.04);
  /* 限制卡片高度并允许内部滚动 */
  max-height: calc(100vh - 260px);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.markdown-content {
  line-height: 1.8;
  color: #333;
}

.markdown-content h1,
.markdown-content h2,
.markdown-content h3 {
  margin-top: 1.2em;
  margin-bottom: 0.6em;
  color: #2c3e50;
}

.markdown-content p,
.markdown-content ul,
.markdown-content ol {
  margin-bottom: 1em;
}

.markdown-content img {
  max-width: 10%;
  height: auto;
  border-radius: 8px;
  margin: 12px 0;
  display: block;
}

/* 美化内部滚动条（WebKit 浏览器） */
.content-wrapper::-webkit-scrollbar {
  width: 10px;
}
.content-wrapper::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.04);
  border-radius: 10px;
}
.content-wrapper::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.12);
  border-radius: 10px;
}
.content-wrapper::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.18);
}

/* Firefox */
.content-wrapper {
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.12) rgba(0, 0, 0, 0.04);
}

.markdown-content table {
  width: 100%;
  border-collapse: collapse;
  margin: 1em 0;
}

.markdown-content th,
.markdown-content td {
  border: 1px solid #eee;
  padding: 8px 12px;
  text-align: left;
}

.markdown-content blockquote {
  border-left: 4px solid #3498db;
  padding-left: 16px;
  margin: 1em 0;
  color: #555;
  font-style: italic;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .collaboration {
    flex-direction: column;
  }

  .sidebar {
    width: 100% !important;
    height: auto;
    cursor: default;
  }

  .sidebar-header,
  .sidebar-nav {
    opacity: 1 !important;
    transform: none !important;
  }

  .main-content {
    padding: 15px;
  }

  .white-wrapper {
    width: calc(100% - 30px);
    margin: 12px auto;
    padding: 16px;
  }

  .content-wrapper {
    max-height: none; /* 移动端不限制高度 */
  }
}
</style>
