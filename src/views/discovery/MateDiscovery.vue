<template>
  <div class="mate-discovery">
    <!-- 上传按钮 -->
    <div class="upload-section">
      <button class="upload-btn" @click="showUploadModal = true">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        <span>发布 Mate</span>
      </button>
    </div>

    <!-- 内容卡片列表 -->
    <div class="content-feed">
      <DiscoveryCard
        v-for="item in mateItems"
        :key="item.id"
        :item="item"
        @click="handleCardClick"
      />
    </div>

    <!-- 上传模态框 -->
    <a-modal
      v-model:open="showUploadModal"
      title="发布新的 Mate"
      :width="600"
      @ok="handleUpload"
      @cancel="resetForm"
    >
      <a-form :model="uploadForm" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
        <a-form-item label="标题" required>
          <a-input 
            v-model:value="uploadForm.title" 
            placeholder="请输入 Mate 标题"
            :maxlength="50"
            show-count
          />
        </a-form-item>
        <a-form-item label="封面图">
          <a-upload
            v-model:file-list="uploadForm.coverFileList"
            list-type="picture-card"
            :before-upload="beforeUpload"
          >
            <div v-if="uploadForm.coverFileList.length < 1">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <div style="margin-top: 8px">上传封面</div>
            </div>
          </a-upload>
        </a-form-item>
        <a-form-item label="内容描述" required>
          <a-textarea 
            v-model:value="uploadForm.content" 
            placeholder="请输入 Mate 的详细描述..."
            :rows="6"
            :maxlength="1000"
            show-count
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import DiscoveryCard from '@/components/DiscoveryCard.vue';

const showUploadModal = ref(false);
const uploadForm = ref({
  title: '',
  content: '',
  coverFileList: [],
});

const mateItems = ref([]);

const beforeUpload = (file) => {
  const isImage = file.type.startsWith('image/');
  if (!isImage) {
    message.error('只能上传图片文件!');
    return false;
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片大小不能超过 2MB!');
    return false;
  }
  return false;
};

const handleUpload = () => {
  if (!uploadForm.value.title.trim()) {
    message.warning('请输入标题');
    return;
  }
  if (!uploadForm.value.content.trim()) {
    message.warning('请输入内容描述');
    return;
  }

  const newItem = {
    id: Date.now(),
    title: uploadForm.value.title,
    author: '当前用户',
    authorAvatar: null,
    coverImage: uploadForm.value.coverFileList[0]?.thumbUrl || null,
    content: uploadForm.value.content,
  };

  mateItems.value.unshift(newItem);
  message.success('发布成功!');
  resetForm();
  showUploadModal.value = false;
  saveData();
};

const resetForm = () => {
  uploadForm.value = {
    title: '',
    content: '',
    coverFileList: [],
  };
};

const handleCardClick = (item) => {
  console.log('点击了卡片:', item);
};

const saveData = () => {
  localStorage.setItem('discovery-mate-items', JSON.stringify(mateItems.value));
};

onMounted(() => {
  const saved = localStorage.getItem('discovery-mate-items');
  if (saved) {
    try {
      const data = JSON.parse(saved);
      mateItems.value = data;
    } catch (e) {
      console.error('Failed to load mate items:', e);
    }
  }
});
</script>

<style scoped>
.mate-discovery {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.upload-section {
  margin-bottom: 24px;
}

.upload-btn {
  width: 100%;
  padding: 16px 24px;
  background: linear-gradient(135deg, #4A90E2 0%, #50C9C3 100%);
  color: white;
  border: none;
  border-radius: 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  box-shadow: 0 8px 24px rgba(74, 144, 226, 0.3);
  position: relative;
  overflow: hidden;
}

.upload-btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.upload-btn:hover::before {
  width: 300px;
  height: 300px;
}

.upload-btn:hover {
  background: linear-gradient(135deg, #50C9C3 0%, #7BDFF2 100%);
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(74, 144, 226, 0.4);
}

.content-feed {
  display: flex;
  flex-direction: column;
}
</style>
