<template>
  <div class="home">
    <!-- 中央文案 -->
    <section class="hero">
      <div class="hero-text">
        <h1 class="title-en">Path Mate</h1>
        <h2 class="title-cn">你的路径被发现</h2>
        <h2 class="title-cn">你的伙伴被找到</h2>
        <p class="subtitle">Try to Begin Your Path Now!</p>
      </div>
    </section>

    <!-- 底部卡片区域 -->
    <section class="paths">
      <div 
        v-for="path in displayedPaths" 
        :key="path.id" 
        class="path-card"
        @click="handlePathClick(path)"
      >
        <h3>{{ path.name }}</h3>
        <p>&lt;{{ path.title }}&gt;</p>
      </div>

      <button class="cta" @click="showPathListModal = true">完整信息</button>
    </section>

    <!-- Path 列表模态框 -->
    <PathListModal
      v-model:open="showPathListModal"
      @view-path="handleViewPath"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import PathListModal from '@/components/PathListModal.vue';
import { getDisplayedPaths } from '@/services/pathApi';

const router = useRouter();
const showPathListModal = ref(false);
const pathList = ref([]);

// 显示在主页底部的 3 个 path
const displayedPaths = computed(() => {
  return pathList.value.length > 0 ? pathList.value.slice(0, 3) : [];
});

// 加载 Path 数据
onMounted(async () => {
  try {
    const paths = await getDisplayedPaths(3);
    pathList.value = paths;
  } catch (error) {
    console.error('Failed to load paths:', error);
  }
});

// 处理查看 Path 详情
const handleViewPath = (path) => {
  console.log('查看 Path:', path);
  // 跳转到协作空间详情页面
  router.push({
    name: 'path-description',
    params: { pathId: path.id }
  });
};

// 处理点击 Path 卡片，跳转到协作空间
const handlePathClick = (path) => {
  router.push({
    name: 'path-description',
    params: { pathId: path.id }
  });
};
</script>

<style scoped>
@font-face {
  font-family: "Signature";
  src: url("@/assets/fonts/BrittanySignature.ttf") format("truetype");
  font-weight: 700;
  font-display: swap; /* 避免字体加载时空白 */
}

/* 整页背景 */
.home {
  min-height: 100vh;
  background: url("@/assets/images/HomePage.png") center / cover no-repeat;
  color: white;
  position: relative;
}

/* ---------- 导航栏 ---------- */
.nav {
  position: absolute;
  top: 40px;
  left: 0px;
  right: 0;

  display: flex;
  align-items: right;
  justify-content: space-between;

  padding: 20px 40px;
  background: transparent;
}

.nav-center a {
  margin: 0 20px;
  cursor: pointer;
  font-size: 18px;
  opacity: 0.9;
}

.nav-center a:hover {
  opacity: 1;
}

/* ---------- 中央文字 ---------- */
.hero {
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.title-en {
  font-size: 115px;
  font-weight: 400;
  color: #f30606;
  font-family: "Signature", "Snell Roundhand", "Script MT Bold", "Kaiti SC",
    "KaiTi", cursive;
  margin-bottom: -50px;
  margin-top: 250px;
}

.title-cn {
  font-size: 90px;
  font-weight: 400;
  line-height: 0.9;
}

.subtitle {
  margin-top: 20px;
  font-size: 25px;
  opacity: 0.85;
  margin-top: -10px;
}

/* ---------- 底部路径区域 ---------- */
.paths {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  height: 65px;
  padding: 0 300px;
  box-sizing: border-box;
  color: white;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  background: rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
}

.paths > * {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.path-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0.12px;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;
  height: 100%;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.path-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.05);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.path-card:hover::before {
  opacity: 1;
}

.path-card:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.path-card h3 {
  margin-bottom: 0px;
  position: relative;
  z-index: 1;
  transition: color 0.3s ease;
}

.path-card:hover h3 {
  color: #4A90E2;
}

.path-card p {
  font-size: 14px;
  color: #ffffff;
  position: relative;
  z-index: 1;
  transition: color 0.3s ease;
}

.path-card:hover p {
  color: rgba(255, 255, 255, 0.9);
}

/* 右侧按钮 */
.cta {
  width: 160px;
  background: #ff4d00;
  color: white;
  border: none;
  font-size: 18px;
  cursor: pointer;
  height: 100%;
}

.cta:hover {
  background: #e64500;
}
</style>
