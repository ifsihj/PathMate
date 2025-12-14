<template>
  <div 
    class="task-card"
    :class="[`priority-${task.priority}`, { 'overdue': isOverdue }]"
    draggable="true"
    @dragstart="handleDragStart"
    @click="$emit('edit', task)"
  >
    <div class="task-header">
      <div class="task-priority-dot" :class="`priority-${task.priority}`"></div>
      <h4 class="task-title">{{ task.title }}</h4>
      <button class="delete-task-btn" @click.stop="$emit('delete', task.id)" title="删除">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </svg>
      </button>
    </div>
    
    <p v-if="task.description" class="task-description">{{ task.description }}</p>
    
    <div class="task-footer">
      <div class="task-meta">
        <span v-if="task.assignee" class="task-assignee">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          {{ task.assignee }}
        </span>
        <span v-if="task.deadline" class="task-deadline" :class="{ 'overdue': isOverdue }">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          {{ formatDeadline(task.deadline) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
});

defineEmits(['edit', 'delete']);

const isOverdue = computed(() => {
  if (!props.task.deadline) return false;
  const deadline = new Date(props.task.deadline);
  const now = new Date();
  return props.task.status !== 'done' && deadline < now;
});

const handleDragStart = (event) => {
  event.dataTransfer.setData('taskId', props.task.id);
};

const formatDeadline = (timestamp) => {
  const deadline = new Date(timestamp);
  const now = new Date();
  const diff = Math.floor((deadline - now) / (1000 * 60 * 60 * 24));
  
  if (diff < 0) {
    return `已逾期 ${Math.abs(diff)} 天`;
  } else if (diff === 0) {
    return '今天';
  } else if (diff === 1) {
    return '明天';
  } else if (diff <= 7) {
    return `${diff} 天后`;
  } else {
    const month = (deadline.getMonth() + 1).toString().padStart(2, '0');
    const day = deadline.getDate().toString().padStart(2, '0');
    return `${month}-${day}`;
  }
};
</script>

<style scoped>
.task-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  position: relative;
}

.task-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: rgba(74, 144, 226, 0.3);
}

.task-card.overdue {
  border-left: 4px solid #ff4d4f;
}

.task-header {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 8px;
}

.task-priority-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 6px;
}

.task-priority-dot.priority-low {
  background: #52c41a;
}

.task-priority-dot.priority-medium {
  background: #faad14;
}

.task-priority-dot.priority-high {
  background: #ff4d4f;
}

.task-title {
  flex: 1;
  font-size: 15px;
  font-weight: 600;
  color: #333;
  margin: 0;
  line-height: 1.4;
}

.delete-task-btn {
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
  flex-shrink: 0;
}

.task-card:hover .delete-task-btn {
  opacity: 1;
}

.delete-task-btn:hover {
  background: rgba(255, 77, 79, 0.1);
  color: #ff4d4f;
}

.task-description {
  font-size: 13px;
  color: #666;
  margin: 8px 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.task-footer {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.task-meta {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.task-assignee,
.task-deadline {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #999;
}

.task-deadline.overdue {
  color: #ff4d4f;
  font-weight: 600;
}
</style>
