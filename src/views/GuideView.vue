<template>
  <div class="guide-view">
    <div class="guide-container">
      <!-- 页面标题 -->
      <div class="page-header">
        <h1 class="page-title">新手指导</h1>
        <p class="page-subtitle">快速了解 PathMate 平台的使用方法</p>
      </div>

      <!-- 指导内容 -->
      <div class="guide-content">
        <!-- 快速开始 -->
        <section class="guide-section">
          <div class="section-header">
            <div class="section-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h2 class="section-title">快速开始</h2>
          </div>
          <div class="section-content">
            <div class="step-card">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3>选择或创建 Path</h3>
                <p>在首页底部选择你感兴趣的 Path 项目，或点击"完整信息"查看所有可用项目。每个 Path 代表一个成长路径或学习方向。</p>
              </div>
            </div>
            <div class="step-card">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3>进入协作空间</h3>
                <p>点击 Path 卡片进入对应的协作空间，在这里你可以与团队成员协作，管理任务，共享文档。</p>
              </div>
            </div>
            <div class="step-card">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3>开始协作</h3>
                <p>在协作空间中，你可以查看 Path 概况、管理团队成员、使用任务系统、访问工作系统进行文件管理和群聊。</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 功能说明 -->
        <section class="guide-section">
          <div class="section-header">
            <div class="section-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="9" y1="3" x2="9" y2="21"></line>
                <line x1="3" y1="9" x2="21" y2="9"></line>
              </svg>
            </div>
            <h2 class="section-title">主要功能</h2>
          </div>
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                </svg>
              </div>
              <h3>协作空间</h3>
              <p>为每个 Path 项目提供独立的协作环境，包含 Path 概况、成员管理、任务系统和工作系统。</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <h3>任务系统</h3>
              <p>使用日历视图管理 DDL 和任务，设置截止时间、优先级，确保项目进度可控。</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <h3>工作系统</h3>
              <p>管理项目文件、共享文档，使用群聊功能与团队成员实时沟通协作。</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              </div>
              <h3>发现</h3>
              <p>浏览其他用户的 Path 项目、寻找合适的伙伴，阅读经验文章，扩展你的学习网络。</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <h3>个人中心</h3>
              <p>管理你的资源、查看通知、调整个人设置，个性化你的使用体验。</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <h3>聊天功能</h3>
              <p>与团队成员进行一对一或群组聊天，保持沟通畅通，及时解决问题。</p>
            </div>
          </div>
        </section>

        <!-- 常见问题 -->
        <section class="guide-section">
          <div class="section-header">
            <div class="section-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </div>
            <h2 class="section-title">常见问题</h2>
          </div>
          <div class="faq-list">
            <div class="faq-item">
              <h3>如何加入一个 Path 项目？</h3>
              <p>在首页或协作空间选择页面，点击你感兴趣的 Path 卡片即可进入对应的协作空间。如果是新项目，你可能需要先申请加入。</p>
            </div>
            <div class="faq-item">
              <h3>如何创建新的任务？</h3>
              <p>在协作空间的"任务系统"页面，点击日历上的日期，然后填写任务信息并设置截止时间即可创建新任务。</p>
            </div>
            <div class="faq-item">
              <h3>如何上传文件？</h3>
              <p>在协作空间的"工作系统"页面，切换到"文件"标签，点击"上传文件"按钮即可上传项目相关文件。</p>
            </div>
            <div class="faq-item">
              <h3>如何与团队成员沟通？</h3>
              <p>你可以使用工作系统中的"群聊"功能，或者通过"聊天"页面与团队成员进行一对一或群组对话。</p>
            </div>
          </div>
        </section>

        <!-- 开始使用按钮 -->
        <div class="action-section">
          <a-button type="primary" size="large" @click="goToCollaboration">
            <span>开始使用</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToCollaboration = () => {
  router.push({ name: 'collaboration' });
};
</script>

<style scoped>
.guide-view {
  min-height: 100vh;
  background: url("@/assets/images/BackGround.webp") center / cover no-repeat;
  background-attachment: fixed;
  padding: 100px 20px 60px;
  position: relative;
}

.guide-view::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.1) 50%,
    rgba(0, 0, 0, 0.3) 100%
  );
  pointer-events: none;
  z-index: 0;
}

.guide-container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

/* 页面标题 */
.page-header {
  text-align: center;
  margin-bottom: 60px;
  animation: fadeInDown 0.6s ease-out;
}

.page-title {
  font-size: 48px;
  font-weight: 700;
  background: linear-gradient(135deg, #4A90E2 0%, #50C9C3 50%, #7BDFF2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 16px;
  letter-spacing: 1px;
}

.page-subtitle {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 400;
}

/* 指导内容 */
.guide-content {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

/* 章节样式 */
.guide-section {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 40px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: fadeInUp 0.6s ease-out;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
  padding-bottom: 20px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
}

.section-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, rgba(74, 144, 226, 0.2), rgba(80, 201, 195, 0.2));
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4A90E2;
  flex-shrink: 0;
}

.section-title {
  font-size: 28px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
}

/* 步骤卡片 */
.section-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.step-card {
  display: flex;
  gap: 20px;
  padding: 24px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.step-card:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(8px);
  border-color: rgba(255, 255, 255, 0.2);
}

.step-number {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #4A90E2, #50C9C3);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
  flex-shrink: 0;
}

.step-content h3 {
  font-size: 20px;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 8px 0;
}

.step-content p {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin: 0;
}

/* 功能网格 */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.feature-card {
  padding: 24px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.feature-card:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(74, 144, 226, 0.2);
  border-color: rgba(255, 255, 255, 0.2);
}

.feature-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, rgba(74, 144, 226, 0.2), rgba(80, 201, 195, 0.2));
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4A90E2;
  margin-bottom: 16px;
}

.feature-card h3 {
  font-size: 20px;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 12px 0;
}

.feature-card p {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin: 0;
}

/* 常见问题 */
.faq-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.faq-item {
  padding: 24px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.faq-item:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
}

.faq-item h3 {
  font-size: 18px;
  font-weight: 600;
  color: #4A90E2;
  margin: 0 0 12px 0;
}

.faq-item p {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin: 0;
}

/* 操作按钮 */
.action-section {
  text-align: center;
  margin-top: 20px;
}

.action-section :deep(.ant-btn) {
  height: 50px;
  padding: 0 32px;
  font-size: 18px;
  font-weight: 600;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #4A90E2 0%, #50C9C3 100%);
  border: none;
  transition: all 0.3s ease;
}

.action-section :deep(.ant-btn:hover) {
  background: linear-gradient(135deg, #50C9C3 0%, #7BDFF2 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(74, 144, 226, 0.4);
}

.action-section :deep(.ant-btn svg) {
  transition: transform 0.3s ease;
}

.action-section :deep(.ant-btn:hover svg) {
  transform: translateX(4px);
}

/* 动画 */
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

/* 响应式设计 */
@media (max-width: 768px) {
  .guide-view {
    padding: 80px 16px 40px;
  }

  .page-title {
    font-size: 36px;
  }

  .page-subtitle {
    font-size: 16px;
  }

  .guide-section {
    padding: 24px;
  }

  .section-title {
    font-size: 24px;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .step-card {
    flex-direction: column;
    text-align: center;
  }

  .step-number {
    margin: 0 auto;
  }
}
</style>

