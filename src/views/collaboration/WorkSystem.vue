<template>
  <div class="work-system">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1 class="page-title">PATH MATE</h1>
    </div>

    <!-- 主要内容 -->
    <div class="white-wrapper">
      <div class="content-wrapper">
        <p class="placeholder-text">工作系统功能开发中...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// 工作系统页面（待开发）
</script>

<style scoped>
.work-system {
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
  min-height: 400px;
  align-items: center;
  justify-content: center;
}

.placeholder-text {
  font-size: 18px;
  color: #999;
  text-align: center;
}
</style>

