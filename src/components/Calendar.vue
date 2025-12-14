<template>
  <div class="calendar-container">
    <a-calendar v-model:value="value" @select="onSelect">
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

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
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

.events {
  list-style: none;
  margin: 0;
  padding: 0;
}

.event-item {
  position: relative;
  padding: 2px 0;
  cursor: pointer;
  transition: background-color 0.2s;
}

.event-item:hover {
  background-color: rgba(0, 0, 0, 0.02);
  border-radius: 2px;
}

.event-item:hover .delete-btn {
  opacity: 1;
}

.events .ant-badge-status {
  overflow: hidden;
  white-space: nowrap;
  width: calc(100% - 20px);
  text-overflow: ellipsis;
  font-size: 12px;
}

.delete-btn {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0;
  transition: opacity 0.2s;
  padding: 0 4px;
  font-size: 16px;
  line-height: 1;
}

.notes-month {
  text-align: center;
  font-size: 28px;
}

.notes-month section {
  font-size: 28px;
}
</style>
  