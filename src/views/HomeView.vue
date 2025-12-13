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
      <div class="path-card">
        <h3>Path1</h3>
        <p>&lt;PathMate 网站设计&gt;</p>
      </div>
      <div class="path-card">
        <h3>Path2</h3>
        <p>&lt;作业展示平台数据库&gt;</p>
      </div>
      <div class="path-card">
        <h3>Path3</h3>
        <p>&lt;AI 对信息公平的影响&gt;</p>
      </div>

      <button class="cta">完整信息</button>
    </section>
  </div>
</template>

<script setup></script>

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
  color: #000000;
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
}

.path-card h3 {
  margin-bottom: 0px;
}

.path-card p {
  font-size: 14px;
  color: #ffffff;
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
