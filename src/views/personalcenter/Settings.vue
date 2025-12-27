<template>
  <div class="settings">
    <div class="settings-header">
      <h2>设置</h2>
    </div>

    <div class="settings-content">
      <div class="settings-section">
        <h3 class="section-title">账户设置</h3>
        <div class="settings-item">
          <label>用户名</label>
          <input type="text" v-model="settings.username" placeholder="请输入用户名" />
        </div>
        <div class="settings-item">
          <label>邮箱</label>
          <input type="email" v-model="settings.email" placeholder="请输入邮箱" />
        </div>
        <div class="settings-item">
          <label>个人简介</label>
          <textarea v-model="settings.bio" placeholder="请输入个人简介" rows="4"></textarea>
        </div>
      </div>

      <div class="settings-section">
        <h3 class="section-title">隐私设置</h3>
        <div class="settings-item">
          <label class="switch-label">
            <span>公开我的资料</span>
            <input type="checkbox" v-model="settings.publicProfile" class="switch" />
          </label>
        </div>
        <div class="settings-item">
          <label class="switch-label">
            <span>允许他人关注我</span>
            <input type="checkbox" v-model="settings.allowFollow" class="switch" />
          </label>
        </div>
      </div>

      <div class="settings-section">
        <h3 class="section-title">通知设置</h3>
        <div class="settings-item">
          <label class="switch-label">
            <span>接收点赞通知</span>
            <input type="checkbox" v-model="settings.notifyLikes" class="switch" />
          </label>
        </div>
        <div class="settings-item">
          <label class="switch-label">
            <span>接收评论通知</span>
            <input type="checkbox" v-model="settings.notifyComments" class="switch" />
          </label>
        </div>
      </div>

      <div class="settings-actions">
        <button class="save-btn" @click="saveSettings">保存设置</button>
        <button class="cancel-btn" @click="resetSettings">重置</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const settings = ref({
  username: '王西园',
  email: 'example@example.com',
  bio: 'RJU 23本 | 海腚留子 | Major in 糊弄学',
  publicProfile: true,
  allowFollow: true,
  notifyLikes: true,
  notifyComments: true,
});

const defaultSettings = { ...settings.value };

const saveSettings = () => {
  // 这里应该调用API保存设置
  message.success('设置已保存');
  router.push('/personal-center/resources');
};

const resetSettings = () => {
  settings.value = { ...defaultSettings };
  message.info('设置已重置');
};
</script>

<style scoped>
.settings {
  width: min(100%, 1100px);
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: clamp(20px, 3vw, 32px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.settings-header {
  margin-bottom: 32px;
  padding-bottom: 16px;
  border-bottom: 2px solid rgba(74, 144, 226, 0.1);
}

.settings-header h2 {
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin: 0;
}

.settings-content {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.settings-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  color: #4A90E2;
  margin: 0 0 8px 0;
}

.settings-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.settings-item label {
  font-size: 14px;
  font-weight: 500;
  color: #666;
}

.settings-item input[type="text"],
.settings-item input[type="email"],
.settings-item textarea {
  padding: 12px 16px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s ease;
  font-family: inherit;
}

.settings-item input:focus,
.settings-item textarea:focus {
  outline: none;
  border-color: #4A90E2;
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
}

.settings-item textarea {
  resize: vertical;
}

.switch-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.switch {
  width: 48px;
  height: 24px;
  appearance: none;
  background: #ccc;
  border-radius: 12px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
}

.switch:checked {
  background: #4A90E2;
}

.switch::before {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: white;
  top: 2px;
  left: 2px;
  transition: all 0.3s ease;
}

.switch:checked::before {
  left: 26px;
}

.settings-actions {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}

.save-btn,
.cancel-btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.save-btn {
  background: linear-gradient(135deg, #4A90E2 0%, #50C9C3 100%);
  color: white;
}

.save-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
}

.cancel-btn {
  background: rgba(0, 0, 0, 0.05);
  color: #666;
}

.cancel-btn:hover {
  background: rgba(0, 0, 0, 0.1);
}
</style>
