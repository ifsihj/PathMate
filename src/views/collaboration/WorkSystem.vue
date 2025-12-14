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
  font-size: 48px;
  font-weight: 700;
  background: linear-gradient(135deg, #4A90E2 0%, #50C9C3 50%, #7BDFF2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 2px;
  text-shadow: 0 4px 20px rgba(74, 144, 226, 0.3);
  animation: fadeInDown 0.6s ease-out;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.white-wrapper {
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.95) 0%, 
    rgba(255, 255, 255, 0.9) 100%);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  padding: 40px;
  border-radius: 24px;
  box-shadow: 
    0 20px 60px rgba(74, 144, 226, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
  max-width: 1100px;
  margin: 0 auto;
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: fadeInUp 0.6s ease-out;
  position: relative;
  overflow: hidden;
}

.white-wrapper::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, 
    rgba(74, 144, 226, 0.1) 0%, 
    transparent 70%);
  pointer-events: none;
  animation: rotate 20s linear infinite;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
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
  font-size: 24px;
  background: linear-gradient(135deg, #4A90E2 0%, #50C9C3 50%, #7BDFF2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
  font-weight: 600;
  position: relative;
  padding: 20px;
  border-radius: 16px;
  background-color: rgba(74, 144, 226, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(74, 144, 226, 0.2);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.02);
  }
}
</style>

