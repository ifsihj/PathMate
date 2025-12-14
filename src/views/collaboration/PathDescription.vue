<template>
  <div class="path-description">
    <!-- 主要内容 -->
    <div class="white-wrapper">
      <div class="content-wrapper">
        <!-- 插图 -->
        <div class="illustration">
          <img src="@/assets/images/help.jpg" alt="PathDescription" style="max-width: 200px;" />
          <div class="illustration-placeholder">
          </div>
        </div>

        <!-- 描述文本 -->
        <div class="description">
          <p class="intro-text">
            <strong>"同行者"</strong> 是一个面向高校学生的成长协作与经验连接平台，旨在解决：
          </p>
          <ul class="problem-list">
            <li>找不到合适的人</li>
            <li>连接无法持续</li>
            <li>经验无法沉淀</li>
          </ul>
          <p class="solution-text">
            平台围绕真实的成长路径，将正在经历相似阶段的学生（同行者）与已经走过相关路径的学长学姐或前辈（过来人）进行结构化连接。帮助用户在学习、竞赛、求职与发展选择中获得更精准、更可信、更可持续的支持。
          </p>
        </div>

        <!-- 团队成员 -->
        <div class="team-members">
          <h3 class="section-title">团队成员</h3>
          <div class="members-list">
            <div class="member-item">
              <div class="member-avatar leader">
                <img src="@/assets/images/avatar1.webp" alt="Leader" style="width: 80px; height: 80px;" />
              </div>
              <span class="member-label">组长: xxx</span>
            </div>
            <div class="member-item">
              <div class="member-avatar">
                <img src="@/assets/images/avatar2.webp" alt="Member" style="width: 80px; height: 80px;" />
              </div>
              <span class="member-label">组员1: yy</span>
            </div>
            <div class="member-item">
              <div class="member-avatar">
                <img src="@/assets/images/avatar3.jpg" alt="Member" style="width: 80px; height: 80px;" />
              </div>
              <span class="member-label">组员2: z</span>
            </div>
            <div class="member-item add-member">
              <div class="member-avatar add-avatar">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  viewBox="0 0 60 60"
                  fill="none"
                >
                  <circle cx="30" cy="30" r="25" fill="#E0E0E0" />
                  <line
                    x1="30"
                    y1="20"
                    x2="30"
                    y2="40"
                    stroke="#FFFFFF"
                    stroke-width="4"
                    stroke-linecap="round"
                  />
                  <line
                    x1="20"
                    y1="30"
                    x2="40"
                    y2="30"
                    stroke="#FFFFFF"
                    stroke-width="4"
                    stroke-linecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Path概况页面
</script>

<style scoped>
.path-description {
  width: 100%;
  min-height: calc(100vh - 60px);
}

.page-header {
  text-align: center;
  margin-bottom: 25px;
}

.page-title {
  font-size: 36px;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 10px;
}

.page-subtitle {
  font-size: 24px;
  font-weight: 600;
  color: #e74c3c;
  margin: 0;
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
    0 20px 60px rgba(102, 126, 234, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
  max-width: 1100px;
  margin: 0 auto;
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
  animation: fadeInUp 0.6s ease-out;
}

.white-wrapper::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, 
    rgba(102, 126, 234, 0.1) 0%, 
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
  gap: 30px;
}

.illustration {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin: 20px 0;
  max-width: 200px;
}

.illustration-placeholder {
  width: 10%;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  padding: 20px;
}

.description {
  line-height: 1.8;
  color: #333;
  font-size: 16px;
}

.intro-text {
  margin-bottom: 15px;
}

.intro-text strong {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 20px;
  font-weight: 700;
}

.problem-list {
  list-style: none;
  padding-left: 0;
  margin: 15px 0;
}

.problem-list li {
  padding: 8px 0;
  padding-left: 25px;
  position: relative;
}

.problem-list li::before {
  content: "✦";
  position: absolute;
  left: 0;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 18px;
  font-weight: bold;
  animation: twinkle 2s ease-in-out infinite;
}

@keyframes twinkle {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.1);
  }
}

.solution-text {
  margin-top: 20px;
  color: #555;
}

.team-members {
  margin-top: 30px;
}

.section-title {
  font-size: 28px;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 24px;
  position: relative;
  padding-bottom: 12px;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 2px;
}

.members-list {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  align-items: center;
}

.member-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.member-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f0f0f0, #e0e0e0);
  border: 3px solid transparent;
  background-clip: padding-box;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.member-avatar::before {
  content: '';
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  padding: 3px;
  background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.member-avatar:hover::before {
  opacity: 1;
}

.member-avatar:hover {
  transform: scale(1.15) rotate(5deg);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
}

.member-avatar.leader {
  border-color: #f39c12;
  box-shadow: 0 4px 16px rgba(243, 156, 18, 0.3);
}

.member-avatar.leader::before {
  background: linear-gradient(135deg, #f39c12, #e67e22);
}

.add-avatar {
  background: linear-gradient(135deg, #E0E0E0, #d0d0d0);
  border-color: #ccc;
  cursor: pointer;
}

.add-avatar:hover {
  background: linear-gradient(135deg, #d0d0d0, #c0c0c0);
  transform: scale(1.1) rotate(90deg);
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);
}

.member-label {
  font-size: 14px;
  color: #555;
  font-weight: 600;
  transition: color 0.3s ease;
}

.member-item:hover .member-label {
  color: #667eea;
}

.add-member .member-label {
  display: none;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 28px;
  }

  .page-subtitle {
    font-size: 20px;
  }

  .white-wrapper {
    padding: 20px;
  }

  .members-list {
    justify-content: center;
  }
}
</style>

