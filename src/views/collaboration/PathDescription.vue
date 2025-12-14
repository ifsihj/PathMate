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
  color: #2c3e50;
  font-size: 18px;
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
  content: "•";
  position: absolute;
  left: 0;
  color: #3498db;
  font-size: 20px;
  font-weight: bold;
}

.solution-text {
  margin-top: 20px;
  color: #555;
}

.team-members {
  margin-top: 30px;
}

.section-title {
  font-size: 24px;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 20px;
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
  background: #f0f0f0;
  border: 3px solid #ddd;
  transition: transform 0.3s ease;
}

.member-avatar:hover {
  transform: scale(1.1);
}

.member-avatar.leader {
  border-color: #f39c12;
}

.add-avatar {
  background: #E0E0E0;
  border-color: #ccc;
  cursor: pointer;
}

.add-avatar:hover {
  background: #d0d0d0;
}

.member-label {
  font-size: 14px;
  color: #555;
  font-weight: 500;
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

