<template>
  <a-modal
    v-model:open="visible"
    title="Path 项目列表"
    :width="800"
    :footer="null"
    @cancel="handleCancel"
  >
    <div class="path-list-container">
      <a-list
        :data-source="pathList"
        :pagination="{
          pageSize: 5,
          showSizeChanger: false,
          showTotal: (total) => `共 ${total} 个项目`
        }"
      >
        <template #renderItem="{ item }">
          <a-list-item class="path-list-item">
            <a-list-item-meta>
              <template #title>
                <div class="path-item-header">
                  <span class="path-name">{{ item.name }}</span>
                  <a-tag :color="getStatusColor(item.status)">
                    {{ getStatusText(item.status) }}
                  </a-tag>
                </div>
              </template>
              <template #description>
                <div class="path-item-content">
                  <p class="path-title">{{ item.title }}</p>
                  <p class="path-description">{{ item.description }}</p>
                  <div class="path-meta">
                    <span class="meta-item">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      {{ item.startDate }}
                    </span>
                    <span class="meta-item">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                      {{ item.participants }} 人参与
                    </span>
                  </div>
                </div>
              </template>
            </a-list-item-meta>
            <template #actions>
              <a-button type="primary" size="small" @click="handleViewPath(item)">
                查看详情
              </a-button>
            </template>
          </a-list-item>
        </template>
      </a-list>
    </div>
  </a-modal>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getPathList, pathList as defaultPathList } from '@/services/pathApi';

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  // 可以传入自定义的 path 列表，如果不传则从服务获取
  paths: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['update:open', 'close', 'view-path']);

const router = useRouter();
const pathListData = ref([]);

// 使用传入的 paths 或从服务获取数据
const pathList = computed(() => {
  if (props.paths.length > 0) {
    return props.paths;
  }
  return pathListData.value.length > 0 ? pathListData.value : defaultPathList;
});

// 加载 Path 列表数据
onMounted(async () => {
  if (props.paths.length === 0) {
    try {
      const data = await getPathList();
      pathListData.value = data;
    } catch (error) {
      console.error('Failed to load path list:', error);
      // 使用默认数据
      pathListData.value = defaultPathList;
    }
  }
});

// 控制模态框显示
const visible = computed({
  get: () => props.open,
  set: (value) => {
    emit('update:open', value);
  },
});

// 获取状态颜色
const getStatusColor = (status) => {
  const colorMap = {
    active: 'green',
    planning: 'blue',
    completed: 'default',
  };
  return colorMap[status] || 'default';
};

// 获取状态文本
const getStatusText = (status) => {
  const textMap = {
    active: '进行中',
    planning: '计划中',
    completed: '已完成',
  };
  return textMap[status] || status;
};

// 处理取消
const handleCancel = () => {
  emit('close');
};

// 查看 Path 详情
const handleViewPath = (path) => {
  emit('view-path', path);
  // 可以在这里添加路由跳转，例如：
  // router.push(`/path/${path.id}`);
};
</script>

<style scoped>
.path-list-container {
  max-height: 600px;
  overflow-y: auto;
}

.path-list-item {
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.3s;
}

.path-list-item:hover {
  background-color: #fafafa;
}

.path-item-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.path-name {
  font-size: 18px;
  font-weight: 600;
  color: #1890ff;
}

.path-item-content {
  margin-top: 8px;
}

.path-title {
  font-size: 16px;
  font-weight: 500;
  color: #262626;
  margin-bottom: 8px;
}

.path-description {
  font-size: 14px;
  color: #595959;
  line-height: 1.6;
  margin-bottom: 12px;
}

.path-meta {
  display: flex;
  gap: 20px;
  font-size: 12px;
  color: #8c8c8c;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.meta-item svg {
  opacity: 0.7;
}

/* 模态框标题样式 */
:deep(.ant-modal-header) {
  border-bottom: 2px solid #f0f0f0;
}

:deep(.ant-modal-title) {
  font-size: 20px;
  font-weight: 600;
  color: #262626;
}

/* 列表项操作按钮 */
:deep(.ant-list-item-action) {
  margin-left: 16px;
}
</style>

