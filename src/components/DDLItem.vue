<template>
  <div 
    class="ddl-item"
    :class="{ 'overdue': isOverdue, 'urgent': ddl.priority === 'urgent', 'completed': ddl.completed }"
    @click="$emit('edit', ddl)"
  >
    <div class="ddl-header">
      <div class="ddl-priority" :class="`priority-${ddl.priority}`"></div>
      <h4 class="ddl-title">{{ ddl.title }}</h4>
      <button 
        class="complete-btn"
        @click.stop="handleToggleComplete"
        :class="{ completed: ddl.completed }"
        title="标记完成"
      >
        <svg v-if="ddl.completed" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
        </svg>
      </button>
    </div>
    
    <div class="ddl-deadline">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
      <span :class="{ 'overdue-text': isOverdue }">{{ formatDeadline(ddl.deadline) }}</span>
    </div>
    
    <p v-if="ddl.description" class="ddl-description">{{ ddl.description }}</p>
    
    <div class="ddl-footer">
      <span class="ddl-priority-label" :class="`priority-${ddl.priority}`">
        {{ getPriorityLabel(ddl.priority) }}
      </span>
      <button 
        class="delete-ddl-btn"
        @click.stop="$emit('delete', ddl.id)"
        title="删除"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { updateDDL } from '@/services/ddlApi';
import { message } from 'ant-design-vue';

const props = defineProps({
  ddl: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['edit', 'delete']);

const isOverdue = computed(() => {
  if (props.ddl.completed) return false;
  const deadline = new Date(props.ddl.deadline);
  const now = new Date();
  return deadline < now;
});

const formatDeadline = (timestamp) => {
  const deadline = new Date(timestamp);
  const now = new Date();
  const diff = Math.floor((deadline - now) / (1000 * 60 * 60 * 24));
  
  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };
  
  if (diff < 0) {
    return `已逾期 ${Math.abs(diff)} 天`;
  } else if (diff === 0) {
    return `今天 ${formatTime(deadline)}`;
  } else if (diff === 1) {
    return `明天 ${formatTime(deadline)}`;
  } else if (diff <= 7) {
    const month = (deadline.getMonth() + 1).toString().padStart(2, '0');
    const day = deadline.getDate().toString().padStart(2, '0');
    return `${diff} 天后 ${month}-${day} ${formatTime(deadline)}`;
  } else {
    const year = deadline.getFullYear();
    const month = (deadline.getMonth() + 1).toString().padStart(2, '0');
    const day = deadline.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${formatTime(deadline)}`;
  }
};

const getPriorityLabel = (priority) => {
  const labels = {
    low: '低',
    medium: '中',
    high: '高',
    urgent: '紧急'
  };
  return labels[priority] || '中';
};

const handleToggleComplete = async () => {
  try {
    await updateDDL(props.ddl.id, { completed: !props.ddl.completed });
    props.ddl.completed = !props.ddl.completed;
    message.success(props.ddl.completed ? '已标记为完成' : '已取消完成');
  } catch (error) {
    console.error('Failed to update DDL:', error);
    message.error('操作失败');
  }
};
</script>

<style scoped>
.ddl-item {
  background: white;
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  position: relative;
}

.ddl-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: rgba(74, 144, 226, 0.3);
}

.ddl-item.overdue {
  border-left: 4px solid #ff4d4f;
}

.ddl-item.urgent {
  border-left: 4px solid #ff4d4f;
  background: linear-gradient(90deg, rgba(255, 77, 79, 0.05) 0%, white 4%);
}

.ddl-item.completed {
  opacity: 0.6;
}

.ddl-item.completed .ddl-title {
  text-decoration: line-through;
}

.ddl-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.ddl-priority {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.ddl-priority.priority-low {
  background: #52c41a;
}

.ddl-priority.priority-medium {
  background: #faad14;
}

.ddl-priority.priority-high {
  background: #ff7875;
}

.ddl-priority.priority-urgent {
  background: #ff4d4f;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.ddl-title {
  flex: 1;
  font-size: 15px;
  font-weight: 600;
  color: #333;
  margin: 0;
  line-height: 1.4;
}

.complete-btn {
  width: 28px;
  height: 28px;
  border: 2px solid #ddd;
  background: white;
  color: #52c41a;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.complete-btn.completed {
  background: #52c41a;
  border-color: #52c41a;
  color: white;
}

.complete-btn:hover {
  border-color: #52c41a;
  transform: scale(1.1);
}

.ddl-deadline {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #666;
  margin-bottom: 8px;
}

.ddl-deadline.overdue-text,
.overdue-text {
  color: #ff4d4f;
  font-weight: 600;
}

.ddl-description {
  font-size: 13px;
  color: #666;
  margin: 8px 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.ddl-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.ddl-priority-label {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 12px;
  font-weight: 500;
}

.ddl-priority-label.priority-low {
  background: rgba(82, 196, 26, 0.1);
  color: #52c41a;
}

.ddl-priority-label.priority-medium {
  background: rgba(250, 173, 20, 0.1);
  color: #faad14;
}

.ddl-priority-label.priority-high {
  background: rgba(255, 120, 117, 0.1);
  color: #ff7875;
}

.ddl-priority-label.priority-urgent {
  background: rgba(255, 77, 79, 0.1);
  color: #ff4d4f;
  font-weight: 600;
}

.delete-ddl-btn {
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  color: #999;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  opacity: 0;
  transition: all 0.3s ease;
}

.ddl-item:hover .delete-ddl-btn {
  opacity: 1;
}

.delete-ddl-btn:hover {
  background: rgba(255, 77, 79, 0.1);
  color: #ff4d4f;
}
</style>
