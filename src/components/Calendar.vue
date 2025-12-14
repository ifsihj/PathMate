<template>
  <div class="calendar-container">
    <div class="layout-wrapper">
      <!-- 左侧任务列表 -->
      <div class="tasks-section">
        <div class="tasks-header">
          <h3 class="section-title">任务列表</h3>
          <a-badge :count="allTasks.length" :number-style="{ backgroundColor: '#52c41a' }" />
        </div>
        <div class="tasks-list">
          <div v-if="allTasks.length === 0" class="empty-state">
            <a-empty description="暂无任务，点击日历日期添加任务" />
          </div>
          <div
            v-for="task in allTasks"
            :key="task.id"
            class="task-item"
            @click="goToTaskDate(task.date)"
          >
            <div class="task-avatar">
              <img 
                v-if="task.avatar === 'avatar1.webp'" 
                src="@/assets/images/avatar1.webp" 
                :alt="task.assignee || '负责人'"
                class="avatar-img"
              />
              <img 
                v-else-if="task.avatar === 'avatar2.webp'" 
                src="@/assets/images/avatar2.webp" 
                :alt="task.assignee || '负责人'"
                class="avatar-img"
              />
              <img 
                v-else-if="task.avatar === 'avatar3.jpg'" 
                src="@/assets/images/avatar3.jpg" 
                :alt="task.assignee || '负责人'"
                class="avatar-img"
              />
              <div v-else class="avatar-placeholder">
                {{ (task.assignee || '未').charAt(0) }}
              </div>
            </div>
            <div class="task-badge">
              <a-badge :status="task.type" />
            </div>
            <div class="task-content">
              <div class="task-title">{{ task.content }}</div>
              <div class="task-meta">
                <span class="task-date">{{ formatTaskDate(task.date) }}</span>
                <span v-if="task.assignee" class="task-assignee">负责人: {{ task.assignee }}</span>
                <span v-if="task.description" class="task-desc">{{ task.description }}</span>
              </div>
            </div>
            <div class="task-actions">
              <a-button 
                type="text" 
                size="small" 
                @click.stop="editTaskFromList(task)"
                class="edit-btn"
              >
                编辑
              </a-button>
              <a-button 
                type="text" 
                danger 
                size="small" 
                @click.stop="deleteTaskFromList(task)"
                class="delete-btn-list"
              >
                删除
              </a-button>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧日历 -->
      <div class="calendar-section">
        <a-calendar v-model:value="value" @select="onSelect" class="beautiful-calendar">
          <template #dateCellRender="{ current }">
            <ul class="events">
              <li 
                v-for="(item, index) in getListData(current)" 
                :key="item.id"
                class="event-item"
                @click.stop="editTask(current, item, index)"
              >
                <a-badge :status="item.type" :text="item.content" />
                <a-button 
                  type="text" 
                  danger 
                  size="small" 
                  class="delete-btn"
                  @click.stop="deleteTask(current, item.id)"
                >
                  ×
                </a-button>
              </li>
            </ul>
          </template>
          <template #monthCellRender="{ current }">
            <div v-if="getMonthData(current)" class="notes-month">
              <section>{{ getMonthData(current) }}</section>
              <span>任务数量</span>
            </div>
          </template>
        </a-calendar>
      </div>
    </div>

    <!-- 添加/编辑任务的模态框 -->
    <a-modal
      v-model:open="modalVisible"
      :title="editingTask ? '编辑任务' : '添加 DDL/任务'"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form :model="taskForm" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
        <a-form-item label="任务标题" required>
          <a-input 
            v-model:value="taskForm.content" 
            placeholder="请输入任务标题"
            :maxlength="50"
            show-count
          />
        </a-form-item>
        <a-form-item label="任务类型" required>
          <a-select v-model:value="taskForm.type" placeholder="请选择任务类型">
            <a-select-option value="success">普通任务</a-select-option>
            <a-select-option value="warning">重要任务</a-select-option>
            <a-select-option value="error">紧急 DDL</a-select-option>
            <a-select-option value="processing">进行中</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="负责人">
          <a-input 
            v-model:value="taskForm.assignee" 
            placeholder="请输入负责人姓名（可选）"
            :maxlength="20"
          />
        </a-form-item>
        <a-form-item label="负责人头像">
          <a-radio-group v-model:value="taskForm.avatar">
            <a-radio-button value="avatar1.webp">
              <img src="@/assets/images/avatar1.webp" alt="头像1" class="avatar-option" />
            </a-radio-button>
            <a-radio-button value="avatar2.webp">
              <img src="@/assets/images/avatar2.webp" alt="头像2" class="avatar-option" />
            </a-radio-button>
            <a-radio-button value="avatar3.jpg">
              <img src="@/assets/images/avatar3.jpg" alt="头像3" class="avatar-option" />
            </a-radio-button>
            <a-radio-button :value="null">无头像</a-radio-button>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="任务描述">
          <a-textarea 
            v-model:value="taskForm.description" 
            placeholder="请输入任务描述（可选）"
            :rows="3"
            :maxlength="200"
            show-count
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<style>
.avatar-option {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 4px;
}
</style>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { message } from 'ant-design-vue';

// 任务接口定义
interface Task {
  id: string;
  content: string;
  type: 'success' | 'warning' | 'error' | 'processing';
  description?: string;
  date: string; // 格式: YYYY-MM-DD
  assignee?: string; // 负责人
  avatar?: string | null; // 头像文件名
}

const value = ref<Dayjs>(dayjs());
const modalVisible = ref(false);
const editingTask = ref<Task | null>(null);
const editingDate = ref<Dayjs | null>(null);
const editingIndex = ref<number>(-1);

// 任务列表，按日期存储
const tasks = ref<Map<string, Task[]>>(new Map());

// 任务表单
const taskForm = ref({
  content: '',
  type: 'success' as Task['type'],
  description: '',
  assignee: '',
  avatar: null as string | null,
});

// 从 localStorage 加载任务
const loadTasks = () => {
  const saved = localStorage.getItem('calendar-tasks');
  if (saved) {
    try {
      const data = JSON.parse(saved);
      tasks.value = new Map(Object.entries(data));
    } catch (e) {
      console.error('Failed to load tasks:', e);
    }
  }
};

// 保存任务到 localStorage
const saveTasks = () => {
  const data = Object.fromEntries(tasks.value);
  localStorage.setItem('calendar-tasks', JSON.stringify(data));
};

// 获取日期字符串（YYYY-MM-DD）
const getDateString = (date: Dayjs): string => {
  return date.format('YYYY-MM-DD');
};

// 获取指定日期的任务列表
const getListData = (current: Dayjs): Task[] => {
  const dateStr = getDateString(current);
  return tasks.value.get(dateStr) || [];
};

// 获取月份的任务数量
const getMonthData = (value: Dayjs): number => {
  let count = 0;
  const year = value.year();
  const month = value.month();
  
  tasks.value.forEach((taskList, dateStr) => {
    const taskDate = dayjs(dateStr);
    if (taskDate.year() === year && taskDate.month() === month) {
      count += taskList.length;
    }
  });
  
  return count > 0 ? count : 0;
};

// 获取所有任务（按日期排序）
const allTasks = computed(() => {
  const all: Task[] = [];
  tasks.value.forEach((taskList) => {
    all.push(...taskList);
  });
  // 按日期排序，最近的在前
  return all.sort((a, b) => {
    const dateA = dayjs(a.date);
    const dateB = dayjs(b.date);
    if (dateA.isBefore(dateB)) return -1;
    if (dateA.isAfter(dateB)) return 1;
    return 0;
  });
});

// 格式化任务日期显示
const formatTaskDate = (dateStr: string): string => {
  const date = dayjs(dateStr);
  const today = dayjs();
  const tomorrow = today.add(1, 'day');
  
  if (date.isSame(today, 'day')) {
    return '今天';
  } else if (date.isSame(tomorrow, 'day')) {
    return '明天';
  } else if (date.isBefore(today, 'day')) {
    return date.format('MM月DD日');
  } else {
    return date.format('MM月DD日');
  }
};


// 跳转到任务日期
const goToTaskDate = (dateStr: string) => {
  value.value = dayjs(dateStr);
};

// 从列表编辑任务
const editTaskFromList = (task: Task) => {
  const taskDate = dayjs(task.date);
  const dateStr = getDateString(taskDate);
  const taskList = tasks.value.get(dateStr) || [];
  const index = taskList.findIndex(t => t.id === task.id);
  
  if (index >= 0) {
    editingTask.value = task;
    editingDate.value = taskDate;
    editingIndex.value = index;
    taskForm.value = {
      content: task.content,
      type: task.type,
      description: task.description || '',
      assignee: task.assignee || '',
      avatar: task.avatar || null,
    };
    modalVisible.value = true;
    // 跳转到该日期
    value.value = taskDate;
  }
};

// 从列表删除任务
const deleteTaskFromList = (task: Task) => {
  const taskDate = dayjs(task.date);
  deleteTask(taskDate, task.id);
};

// 选择日期时的回调
const onSelect = (date: Dayjs, { source }: { source: 'year' | 'month' | 'date' | 'customize' }) => {
  // 只有从面板点击日期时才打开模态框
  if (source === 'date') {
    editingTask.value = null;
    editingDate.value = date;
    editingIndex.value = -1;
    taskForm.value = {
      content: '',
      type: 'success',
      description: '',
      assignee: '',
      avatar: null,
    };
    modalVisible.value = true;
  }
};

// 编辑任务
const editTask = (date: Dayjs, task: Task, index: number) => {
  editingTask.value = task;
  editingDate.value = date;
  editingIndex.value = index;
    taskForm.value = {
      content: task.content,
      type: task.type,
      description: task.description || '',
      assignee: task.assignee || '',
      avatar: task.avatar || null,
    };
    modalVisible.value = true;
};

// 删除任务
const deleteTask = (date: Dayjs, taskId: string) => {
  const dateStr = getDateString(date);
  const taskList = tasks.value.get(dateStr) || [];
  const filtered = taskList.filter(t => t.id !== taskId);
  
  if (filtered.length === 0) {
    tasks.value.delete(dateStr);
  } else {
    tasks.value.set(dateStr, filtered);
  }
  
  saveTasks();
  message.success('任务已删除');
};

// 确认添加/编辑任务
const handleOk = () => {
  if (!taskForm.value.content.trim()) {
    message.warning('请输入任务标题');
    return;
  }

  if (!editingDate.value) {
    return;
  }

  const dateStr = getDateString(editingDate.value);
  const taskList = tasks.value.get(dateStr) || [];

  if (editingTask.value && editingIndex.value >= 0) {
    // 编辑模式
    const updatedTask: Task = {
      ...editingTask.value,
      content: taskForm.value.content,
      type: taskForm.value.type,
      description: taskForm.value.description || undefined,
      assignee: taskForm.value.assignee || undefined,
      avatar: taskForm.value.avatar || undefined,
    };
    taskList[editingIndex.value] = updatedTask;
    tasks.value.set(dateStr, taskList);
    message.success('任务已更新');
  } else {
    // 添加模式
    const newTask: Task = {
      id: `${dateStr}-${Date.now()}`,
      content: taskForm.value.content,
      type: taskForm.value.type,
      description: taskForm.value.description || undefined,
      assignee: taskForm.value.assignee || undefined,
      avatar: taskForm.value.avatar || undefined,
      date: dateStr,
    };
    taskList.push(newTask);
    tasks.value.set(dateStr, taskList);
    message.success('任务已添加');
  }

  saveTasks();
  handleCancel();
};

// 取消操作
const handleCancel = () => {
  modalVisible.value = false;
  editingTask.value = null;
  editingDate.value = null;
  editingIndex.value = -1;
  taskForm.value = {
    content: '',
    type: 'success',
    description: '',
    assignee: '',
    avatar: null,
  };
};

// 组件挂载时加载任务
onMounted(() => {
  loadTasks();
});
</script>

<style scoped>
.calendar-container {
  width: 100%;
}

.layout-wrapper {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

/* 左侧任务列表样式 */
.tasks-section {
  flex: 0 0 320px;
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  max-height: 800px;
  overflow-y: auto;
}

.tasks-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 2px solid #f0f0f0;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
}

.tasks-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.empty-state {
  padding: 40px 20px;
  text-align: center;
}

.task-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  cursor: pointer;
  transition: all 0.3s ease;
}

.task-item:hover {
  background: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateX(4px);
  border-color: #3498db;
}

.task-avatar {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  background: #f0f0f0;
  border: 2px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  color: #8c8c8c;
  background: linear-gradient(135deg, #4A90E2 0%, #50C9C3 100%);
  color: white;
}

.task-badge {
  flex-shrink: 0;
  margin-top: 2px;
}

.task-content {
  flex: 1;
  min-width: 0;
}

.task-title {
  font-size: 15px;
  font-weight: 500;
  color: #2c3e50;
  margin-bottom: 6px;
  word-break: break-word;
}

.task-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 12px;
  color: #6c757d;
}

.task-date {
  font-weight: 500;
  color: #495057;
}

.task-assignee {
  color: #495057;
  font-weight: 500;
  margin-top: 2px;
}

.task-desc {
  color: #868e96;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 2px;
}

.task-actions {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex-shrink: 0;
  opacity: 0;
  transition: opacity 0.2s;
}

.task-item:hover .task-actions {
  opacity: 1;
}

.edit-btn,
.delete-btn-list {
  padding: 4px 8px;
  font-size: 12px;
  height: auto;
}

/* 右侧日历样式 */
.calendar-section {
  flex: 1;
  background: #ffffff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.beautiful-calendar {
  background: transparent;
}

/* 美化日历头部 */
.beautiful-calendar :deep(.ant-picker-calendar-header) {
  padding: 16px 0;
  border-bottom: 2px solid #f0f0f0;
  margin-bottom: 16px;
}

.beautiful-calendar :deep(.ant-picker-calendar-year-select),
.beautiful-calendar :deep(.ant-picker-calendar-month-select) {
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
}

.beautiful-calendar :deep(.ant-picker-calendar-date) {
  border-radius: 8px;
  transition: all 0.2s ease;
}

.beautiful-calendar :deep(.ant-picker-calendar-date:hover) {
  background: #e6f7ff;
}

.beautiful-calendar :deep(.ant-picker-calendar-date-selected) {
  background: #1890ff;
  border-color: #1890ff;
}

.beautiful-calendar :deep(.ant-picker-calendar-date-selected .ant-picker-calendar-date-value) {
  color: #ffffff;
}

.beautiful-calendar :deep(.ant-picker-calendar-date-today) {
  border-color: #1890ff;
}

.beautiful-calendar :deep(.ant-picker-calendar-date-today .ant-picker-calendar-date-value) {
  color: #1890ff;
  font-weight: 600;
}

/* 日历单元格样式 */
.events {
  list-style: none;
  margin: 0;
  padding: 0;
  margin-top: 4px;
}

.event-item {
  position: relative;
  padding: 2px 0;
  cursor: pointer;
  transition: background-color 0.2s;
  border-radius: 4px;
  margin-bottom: 2px;
}

.event-item:hover {
  background-color: rgba(24, 144, 255, 0.1);
}

.event-item:hover .delete-btn {
  opacity: 1;
}

.events .ant-badge-status {
  overflow: hidden;
  white-space: nowrap;
  width: calc(100% - 20px);
  text-overflow: ellipsis;
  font-size: 11px;
  line-height: 1.4;
}

.delete-btn {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0;
  transition: opacity 0.2s;
  padding: 0 4px;
  font-size: 14px;
  line-height: 1;
  width: 16px;
  height: 16px;
}

.notes-month {
  text-align: center;
  font-size: 24px;
  color: #1890ff;
}

.notes-month section {
  font-size: 24px;
  font-weight: 600;
}

.notes-month span {
  display: block;
  font-size: 12px;
  color: #8c8c8c;
  margin-top: 4px;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .layout-wrapper {
    flex-direction: column;
  }

  .tasks-section {
    flex: 1;
    width: 100%;
    max-height: 400px;
  }

  .calendar-section {
    width: 100%;
  }
}

/* 滚动条样式 */
.tasks-section::-webkit-scrollbar {
  width: 6px;
}

.tasks-section::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.tasks-section::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}

.tasks-section::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
  