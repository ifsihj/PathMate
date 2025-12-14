<template>
  <div class="work-system">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1 class="page-title">工作系统</h1>
    </div>

    <!-- 主要内容区 -->
    <div class="work-content">
      <!-- 左侧：任务看板 -->
      <div class="kanban-board">
        <!-- To do 列 -->
        <div class="kanban-column">
          <div class="column-header">
            <h3 class="column-title">To do</h3>
            <span class="task-count">{{ getTasksByStatus('todo').length }}</span>
          </div>
          <div class="task-list" @drop="handleDrop($event, 'todo')" @dragover.prevent>
            <TaskCard
              v-for="task in getTasksByStatus('todo')"
              :key="task.id"
              :task="task"
              @edit="handleEditTask"
              @delete="handleDeleteTask"
            />
            <button class="add-task-btn" @click="showAddTaskModal('todo')">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              添加任务
            </button>
          </div>
        </div>

        <!-- In progress 列 -->
        <div class="kanban-column">
          <div class="column-header">
            <h3 class="column-title">In progress</h3>
            <span class="task-count">{{ getTasksByStatus('in-progress').length }}</span>
          </div>
          <div class="task-list" @drop="handleDrop($event, 'in-progress')" @dragover.prevent>
            <TaskCard
              v-for="task in getTasksByStatus('in-progress')"
              :key="task.id"
              :task="task"
              @edit="handleEditTask"
              @delete="handleDeleteTask"
            />
            <button class="add-task-btn" @click="showAddTaskModal('in-progress')">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              添加任务
            </button>
          </div>
        </div>

        <!-- Done 列 -->
        <div class="kanban-column">
          <div class="column-header">
            <h3 class="column-title">Done</h3>
            <span class="task-count">{{ getTasksByStatus('done').length }}</span>
          </div>
          <div class="task-list" @drop="handleDrop($event, 'done')" @dragover.prevent>
            <TaskCard
              v-for="task in getTasksByStatus('done')"
              :key="task.id"
              :task="task"
              @edit="handleEditTask"
              @delete="handleDeleteTask"
            />
            <button class="add-task-btn" @click="showAddTaskModal('done')">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              添加任务
            </button>
          </div>
        </div>
      </div>

      <!-- 右侧：功能面板 -->
      <!-- 收起状态的圆形按钮 -->
      <button 
        v-if="!isPanelExpanded" 
        class="panel-toggle-btn"
        :style="{ bottom: toggleBtnPosition.bottom + 'px', right: toggleBtnPosition.right + 'px' }"
        @mousedown.prevent="handleToggleBtnDragStart"
        title="展开功能面板（可拖动）"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="9" y1="3" x2="9" y2="21"></line>
          <line x1="3" y1="9" x2="21" y2="9"></line>
        </svg>
      </button>

      <!-- 展开状态的浮动窗口 -->
      <transition name="panel-slide">
        <div 
          v-if="isPanelExpanded" 
          class="side-panel floating-panel"
          :style="{ 
            bottom: panelPosition.bottom + 'px', 
            right: panelPosition.right + 'px',
            width: panelSize.width + 'px',
            height: panelSize.height + 'px'
          }"
        >
          <!-- 窗口标题栏 -->
          <div 
            class="panel-title-bar"
            @mousedown="handlePanelDragStart"
          >
            <span class="panel-title-text">功能面板</span>
            <button class="panel-close-btn" @click="isPanelExpanded = false" title="收起">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <!-- 调整大小手柄 -->
          <div class="resize-handle resize-handle-right" @mousedown.stop="(e) => handleResizeStart('right', e)"></div>
          <div class="resize-handle resize-handle-bottom" @mousedown.stop="(e) => handleResizeStart('bottom', e)"></div>
          <div class="resize-handle resize-handle-corner" @mousedown.stop="(e) => handleResizeStart('corner', e)"></div>
          
          <!-- 功能标签 -->
        <div class="panel-tabs">
          <button 
            class="tab-btn" 
            :class="{ active: activeTab === 'files' }"
            @click="activeTab = 'files'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
            </svg>
            <span class="tab-text">文件</span>
          </button>
          <button 
            class="tab-btn" 
            :class="{ active: activeTab === 'documents' }"
            @click="activeTab = 'documents'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            <span class="tab-text">文档</span>
          </button>
          <button 
            class="tab-btn" 
            :class="{ active: activeTab === 'chat' }"
            @click="activeTab = 'chat'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <span class="tab-text">群聊</span>
          </button>
          <button 
            class="tab-btn" 
            :class="{ active: activeTab === 'ddl' }"
            @click="activeTab = 'ddl'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span class="tab-text">DDL</span>
          </button>
        </div>

        <!-- 文件云盘 -->
        <div v-if="activeTab === 'files'" class="panel-content">
          <div class="panel-header">
            <h3>共同云盘</h3>
            <button class="upload-file-btn" @click="triggerFileUpload">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
              上传文件
            </button>
          </div>
          <input
            ref="fileInput"
            type="file"
            multiple
            style="display: none"
            @change="handleFileUpload"
          />
          <div class="file-list">
            <FileItem
              v-for="file in files"
              :key="file.id"
              :file="file"
              @download="handleDownloadFile"
              @delete="handleDeleteFile"
            />
            <div v-if="files.length === 0" class="empty-state">
              <p>还没有文件，上传一个吧！</p>
            </div>
          </div>
        </div>

        <!-- 共享文档 -->
        <div v-if="activeTab === 'documents'" class="panel-content">
          <div class="panel-header">
            <h3>共享文档</h3>
            <button class="create-doc-btn" @click="showCreateDocModal = true">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              新建文档
            </button>
          </div>
          <div class="document-list">
            <DocumentItem
              v-for="doc in documents"
              :key="doc.id"
              :document="doc"
              @open="handleOpenDocument"
              @delete="handleDeleteDocument"
            />
            <div v-if="documents.length === 0" class="empty-state">
              <p>还没有文档，创建一个吧！</p>
            </div>
          </div>
        </div>

        <!-- 群聊 -->
        <div v-if="activeTab === 'chat'" class="panel-content chat-panel">
          <div class="panel-header">
            <h3>群聊</h3>
          </div>
          <GroupChat :chat-id="groupChatId" />
        </div>

        <!-- DDL管理 -->
        <div v-if="activeTab === 'ddl'" class="panel-content">
          <div class="panel-header">
            <h3>DDL管理</h3>
            <button class="add-ddl-btn" @click="showAddDDLModal = true">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              添加DDL
            </button>
          </div>
          <div class="ddl-list">
            <DDLItem
              v-for="ddl in ddlList"
              :key="ddl.id"
              :ddl="ddl"
              @edit="handleEditDDL"
              @delete="handleDeleteDDL"
            />
            <div v-if="ddlList.length === 0" class="empty-state">
              <p>还没有DDL，添加一个吧！</p>
            </div>
          </div>
        </div>
        </div>
      </transition>
    </div>

    <!-- 添加/编辑任务模态框 -->
    <a-modal
      v-model:open="showTaskModal"
      :title="editingTask ? '编辑任务' : '添加任务'"
      :width="600"
      @ok="handleSaveTask"
      @cancel="resetTaskForm"
    >
      <a-form :model="taskForm" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
        <a-form-item label="任务标题" required>
          <a-input v-model:value="taskForm.title" placeholder="请输入任务标题" />
        </a-form-item>
        <a-form-item label="任务描述">
          <a-textarea v-model:value="taskForm.description" placeholder="请输入任务描述" :rows="4" />
        </a-form-item>
        <a-form-item label="负责人">
          <a-input v-model:value="taskForm.assignee" placeholder="请输入负责人" />
        </a-form-item>
        <a-form-item label="优先级">
          <a-select v-model:value="taskForm.priority" placeholder="选择优先级">
            <a-select-option value="low">低</a-select-option>
            <a-select-option value="medium">中</a-select-option>
            <a-select-option value="high">高</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="DDL">
          <a-date-picker
            v-model:value="taskForm.deadline"
            show-time
            format="YYYY-MM-DD HH:mm"
            placeholder="选择截止时间"
            style="width: 100%"
          />
        </a-form-item>
      </a-form>
    </a-modal>

    <!-- 创建文档模态框 -->
    <a-modal
      v-model:open="showCreateDocModal"
      title="创建共享文档"
      :width="600"
      @ok="handleCreateDocument"
      @cancel="resetDocForm"
    >
      <a-form :model="docForm" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
        <a-form-item label="文档标题" required>
          <a-input v-model:value="docForm.title" placeholder="请输入文档标题" />
        </a-form-item>
        <a-form-item label="文档描述">
          <a-textarea v-model:value="docForm.description" placeholder="请输入文档描述" :rows="3" />
        </a-form-item>
      </a-form>
    </a-modal>

    <!-- 添加DDL模态框 -->
    <a-modal
      v-model:open="showAddDDLModal"
      title="添加DDL"
      :width="600"
      @ok="handleSaveDDL"
      @cancel="resetDDLForm"
    >
      <a-form :model="ddlForm" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
        <a-form-item label="DDL标题" required>
          <a-input v-model:value="ddlForm.title" placeholder="请输入DDL标题" />
        </a-form-item>
        <a-form-item label="截止时间" required>
          <a-date-picker
            v-model:value="ddlForm.deadline"
            show-time
            format="YYYY-MM-DD HH:mm"
            placeholder="选择截止时间"
            style="width: 100%"
          />
        </a-form-item>
        <a-form-item label="描述">
          <a-textarea v-model:value="ddlForm.description" placeholder="请输入描述" :rows="3" />
        </a-form-item>
        <a-form-item label="优先级">
          <a-select v-model:value="ddlForm.priority" placeholder="选择优先级">
            <a-select-option value="low">低</a-select-option>
            <a-select-option value="medium">中</a-select-option>
            <a-select-option value="high">高</a-select-option>
            <a-select-option value="urgent">紧急</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import TaskCard from '@/components/TaskCard.vue';
import FileItem from '@/components/FileItem.vue';
import DocumentItem from '@/components/DocumentItem.vue';
import GroupChat from '@/components/GroupChat.vue';
import DDLItem from '@/components/DDLItem.vue';
import { uploadFile, getFiles, deleteFile } from '@/services/fileApi';
import { getDocuments, createDocument, deleteDocument } from '@/services/documentApi';
import { getDDLList, createDDL, updateDDL, deleteDDL } from '@/services/ddlApi';

const activeTab = ref('files');
const groupChatId = ref('group-chat-1'); // 群聊ID
const isPanelExpanded = ref(false); // 控制面板展开/收起

// 圆形按钮位置
const toggleBtnPosition = ref({
  bottom: 32,
  right: 32
});

// 浮动窗口位置和大小
const panelPosition = ref({
  bottom: 32,
  right: 32
});

const panelSize = ref({
  width: 420,
  height: 600
});

// 拖拽状态
const isDragging = ref(false);
const isResizing = ref(false);
const dragType = ref(null); // 'toggleBtn', 'panel', 'resize'
const dragStartPos = ref({ x: 0, y: 0 });
const dragStartElementPos = ref({ bottom: 0, right: 0, width: 0, height: 0 });

// 任务相关
const tasks = ref([]);
const showTaskModal = ref(false);
const editingTask = ref(null);
const taskForm = ref({
  title: '',
  description: '',
  assignee: '',
  priority: 'medium',
  deadline: null,
  status: 'todo'
});

// 文件相关
const files = ref([]);
const fileInput = ref(null);

// 文档相关
const documents = ref([]);
const showCreateDocModal = ref(false);
const docForm = ref({
  title: '',
  description: ''
});

// DDL相关
const ddlList = ref([]);
const showAddDDLModal = ref(false);
const editingDDL = ref(null);
const ddlForm = ref({
  title: '',
  deadline: null,
  description: '',
  priority: 'medium'
});

// 获取指定状态的任务
const getTasksByStatus = (status) => {
  return tasks.value.filter(task => task.status === status);
};

// 显示添加任务模态框
const showAddTaskModal = (status) => {
  taskForm.value.status = status;
  editingTask.value = null;
  showTaskModal.value = true;
};

// 编辑任务
const handleEditTask = (task) => {
  editingTask.value = task;
  taskForm.value = {
    title: task.title,
    description: task.description || '',
    assignee: task.assignee || '',
    priority: task.priority || 'medium',
    deadline: task.deadline || null,
    status: task.status
  };
  showTaskModal.value = true;
};

// 保存任务
const handleSaveTask = () => {
  if (!taskForm.value.title.trim()) {
    message.warning('请输入任务标题');
    return;
  }

  if (editingTask.value) {
    // 更新任务
    const index = tasks.value.findIndex(t => t.id === editingTask.value.id);
    if (index !== -1) {
      tasks.value[index] = {
        ...tasks.value[index],
        ...taskForm.value,
        deadline: taskForm.value.deadline ? (typeof taskForm.value.deadline === 'number' ? taskForm.value.deadline : taskForm.value.deadline.valueOf()) : null
      };
    }
    message.success('任务已更新');
  } else {
    // 创建新任务
    const newTask = {
      id: Date.now(),
      ...taskForm.value,
      deadline: taskForm.value.deadline ? (typeof taskForm.value.deadline === 'number' ? taskForm.value.deadline : taskForm.value.deadline.valueOf()) : null,
      createdAt: Date.now()
    };
    tasks.value.push(newTask);
    message.success('任务已创建');
  }

  saveTasks();
  resetTaskForm();
  showTaskModal.value = false;
};

// 删除任务
const handleDeleteTask = (taskId) => {
  tasks.value = tasks.value.filter(t => t.id !== taskId);
  saveTasks();
  message.success('任务已删除');
};

// 拖拽处理
const handleDrop = (event, targetStatus) => {
  const taskId = parseInt(event.dataTransfer.getData('taskId'));
  const task = tasks.value.find(t => t.id === taskId);
  if (task) {
    task.status = targetStatus;
    saveTasks();
  }
};

// 重置任务表单
const resetTaskForm = () => {
  taskForm.value = {
    title: '',
    description: '',
    assignee: '',
    priority: 'medium',
    deadline: null,
    status: 'todo'
  };
  editingTask.value = null;
};

// 文件上传
const triggerFileUpload = () => {
  fileInput.value?.click();
};

const handleFileUpload = async (event) => {
  const uploadedFiles = Array.from(event.target.files);
  
  for (const file of uploadedFiles) {
    try {
      const fileData = await uploadFile(file);
      files.value.unshift(fileData);
      message.success(`${file.name} 上传成功`);
    } catch (error) {
      console.error('Failed to upload file:', error);
      message.error(`${file.name} 上传失败`);
    }
  }
  
  event.target.value = ''; // 清空input
  saveFiles();
};

// 下载文件
const handleDownloadFile = (file) => {
  // TODO: 实现真实下载
  const link = document.createElement('a');
  if (file.url) {
    link.href = file.url;
    link.download = file.name;
    link.click();
  } else {
    message.info('文件下载功能开发中...');
  }
};

// 删除文件
const handleDeleteFile = async (fileId) => {
  try {
    await deleteFile(fileId);
    files.value = files.value.filter(f => f.id !== fileId);
    saveFiles();
    message.success('文件已删除');
  } catch (error) {
    console.error('Failed to delete file:', error);
    message.error('删除文件失败');
  }
};

// 创建文档
const handleCreateDocument = async () => {
  if (!docForm.value.title.trim()) {
    message.warning('请输入文档标题');
    return;
  }

  try {
    const doc = await createDocument(docForm.value.title, docForm.value.description);
    documents.value.unshift(doc);
    saveDocuments();
    message.success('文档已创建');
    resetDocForm();
    showCreateDocModal.value = false;
  } catch (error) {
    console.error('Failed to create document:', error);
    message.error('创建文档失败');
  }
};

// 打开文档
const handleOpenDocument = (doc) => {
  // TODO: 打开文档编辑器
  message.info(`打开文档: ${doc.title}`);
};

// 删除文档
const handleDeleteDocument = async (docId) => {
  try {
    await deleteDocument(docId);
    documents.value = documents.value.filter(d => d.id !== docId);
    saveDocuments();
    message.success('文档已删除');
  } catch (error) {
    console.error('Failed to delete document:', error);
    message.error('删除文档失败');
  }
};

// 保存DDL
const handleSaveDDL = () => {
  if (!ddlForm.value.title.trim()) {
    message.warning('请输入DDL标题');
    return;
  }
  if (!ddlForm.value.deadline) {
    message.warning('请选择截止时间');
    return;
  }

  if (editingDDL.value) {
    // 更新DDL
    const index = ddlList.value.findIndex(d => d.id === editingDDL.value.id);
    if (index !== -1) {
      ddlList.value[index] = {
        ...ddlList.value[index],
        ...ddlForm.value,
        deadline: ddlForm.value.deadline.valueOf()
      };
    }
    message.success('DDL已更新');
  } else {
    // 创建新DDL
    const newDDL = {
      id: Date.now(),
      ...ddlForm.value,
      deadline: ddlForm.value.deadline ? (typeof ddlForm.value.deadline === 'number' ? ddlForm.value.deadline : ddlForm.value.deadline.valueOf()) : null,
      createdAt: Date.now(),
      completed: false
    };
    ddlList.value.unshift(newDDL);
    message.success('DDL已添加');
  }

  saveDDLList();
  resetDDLForm();
  showAddDDLModal.value = false;
};

// 编辑DDL
const handleEditDDL = (ddl) => {
  editingDDL.value = ddl;
  ddlForm.value = {
    title: ddl.title,
    deadline: ddl.deadline,
    description: ddl.description || '',
    priority: ddl.priority || 'medium'
  };
  showAddDDLModal.value = true;
};

// 删除DDL
const handleDeleteDDL = async (ddlId) => {
  try {
    await deleteDDL(ddlId);
    ddlList.value = ddlList.value.filter(d => d.id !== ddlId);
    saveDDLList();
    message.success('DDL已删除');
  } catch (error) {
    console.error('Failed to delete DDL:', error);
    message.error('删除DDL失败');
  }
};

// 重置DDL表单
const resetDDLForm = () => {
  ddlForm.value = {
    title: '',
    deadline: null,
    description: '',
    priority: 'medium'
  };
  editingDDL.value = null;
};

// 重置文档表单
const resetDocForm = () => {
  docForm.value = {
    title: '',
    description: ''
  };
};

// 保存数据
const saveTasks = () => {
  localStorage.setItem('work-system-tasks', JSON.stringify(tasks.value));
};

const saveFiles = () => {
  localStorage.setItem('work-system-files', JSON.stringify(files.value));
};

const saveDocuments = () => {
  localStorage.setItem('work-system-documents', JSON.stringify(documents.value));
};

const saveDDLList = () => {
  localStorage.setItem('work-system-ddl', JSON.stringify(ddlList.value));
};

// 加载数据
const loadData = async () => {
  // 加载任务
  const savedTasks = localStorage.getItem('work-system-tasks');
  if (savedTasks) {
    try {
      tasks.value = JSON.parse(savedTasks);
    } catch (e) {
      console.error('Failed to load tasks:', e);
    }
  } else {
    // 初始化示例任务
    tasks.value = [
      {
        id: 1,
        title: 'Path概括',
        description: '完成Path项目的整体概括',
        assignee: '小明',
        priority: 'high',
        status: 'todo',
        deadline: Date.now() + 86400000 * 3,
        createdAt: Date.now() - 86400000 * 2
      },
      {
        id: 2,
        title: 'Mate管理',
        description: '完善团队成员管理功能',
        assignee: '小红',
        priority: 'medium',
        status: 'todo',
        deadline: Date.now() + 86400000 * 5,
        createdAt: Date.now() - 86400000
      },
      {
        id: 3,
        title: '数据库设计',
        description: '设计项目数据库结构',
        assignee: '小李',
        priority: 'high',
        status: 'in-progress',
        deadline: Date.now() + 86400000 * 2,
        createdAt: Date.now() - 86400000 * 3
      },
      {
        id: 4,
        title: 'API接口开发',
        description: '开发后端API接口',
        assignee: '小张',
        priority: 'medium',
        status: 'in-progress',
        deadline: Date.now() + 86400000 * 7,
        createdAt: Date.now() - 86400000 * 4
      },
      {
        id: 5,
        title: '需求分析',
        description: '完成项目需求分析文档',
        assignee: '小王',
        priority: 'low',
        status: 'done',
        deadline: Date.now() - 86400000,
        createdAt: Date.now() - 86400000 * 10
      }
    ];
    saveTasks();
  }

  // 加载文件
  try {
    files.value = await getFiles();
  } catch (error) {
    console.error('Failed to load files:', error);
  }

  // 加载文档
  try {
    documents.value = await getDocuments();
  } catch (error) {
    console.error('Failed to load documents:', error);
  }

  // 加载DDL
  try {
    ddlList.value = await getDDLList();
  } catch (error) {
    console.error('Failed to load DDL list:', error);
  }
};

// 圆形按钮拖拽开始
const handleToggleBtnDragStart = (e) => {
  // 延迟判断是否为拖拽
  let isDrag = false;
  const startX = e.clientX;
  const startY = e.clientY;
  
  const handleMouseMove = (moveEvent) => {
    const deltaX = Math.abs(moveEvent.clientX - startX);
    const deltaY = Math.abs(moveEvent.clientY - startY);
    if (deltaX > 5 || deltaY > 5) {
      isDrag = true;
      isDragging.value = true;
      dragType.value = 'toggleBtn';
      dragStartPos.value = { x: startX, y: startY };
      dragStartElementPos.value = {
        bottom: toggleBtnPosition.value.bottom,
        right: toggleBtnPosition.value.right
      };
      document.addEventListener('mousemove', handleDragMove);
      document.addEventListener('mouseup', handleDragEnd);
      document.removeEventListener('mousemove', handleMouseMove);
    }
  };
  
  document.addEventListener('mousemove', handleMouseMove);
  
  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    if (!isDrag) {
      // 如果不是拖拽，执行点击
      isPanelExpanded.value = true;
    }
  };
  
  document.addEventListener('mouseup', handleMouseUp);
};

// 窗口拖拽开始
const handlePanelDragStart = (e) => {
  if (e.target.closest('.panel-close-btn')) {
    return; // 点击关闭按钮时不拖拽
  }
  isDragging.value = true;
  dragType.value = 'panel';
  dragStartPos.value = { x: e.clientX, y: e.clientY };
  dragStartElementPos.value = {
    bottom: panelPosition.value.bottom,
    right: panelPosition.value.right
  };
  document.addEventListener('mousemove', handleDragMove);
  document.addEventListener('mouseup', handleDragEnd);
  e.preventDefault();
};

// 调整大小开始
const resizeDirection = ref(null);
const handleResizeStart = (direction, e) => {
  isResizing.value = true;
  dragType.value = 'resize';
  resizeDirection.value = direction;
  dragStartPos.value = { x: e.clientX, y: e.clientY };
  dragStartElementPos.value = {
    bottom: panelPosition.value.bottom,
    right: panelPosition.value.right,
    width: panelSize.value.width,
    height: panelSize.value.height
  };
  document.addEventListener('mousemove', handleResizeMove);
  document.addEventListener('mouseup', handleResizeEnd);
  e.preventDefault();
  e.stopPropagation();
};

// 拖拽移动
const handleDragMove = (e) => {
  if (!isDragging.value) return;
  
  const deltaX = e.clientX - dragStartPos.value.x;
  const deltaY = dragStartPos.value.y - e.clientY; // Y轴反向
  
  if (dragType.value === 'toggleBtn') {
    const newRight = dragStartElementPos.value.right - deltaX;
    const newBottom = dragStartElementPos.value.bottom + deltaY;
    
    // 限制在视口内
    const maxRight = window.innerWidth - 56;
    const maxBottom = window.innerHeight - 56;
    
    toggleBtnPosition.value.right = Math.max(0, Math.min(newRight, maxRight));
    toggleBtnPosition.value.bottom = Math.max(0, Math.min(newBottom, maxBottom));
  } else if (dragType.value === 'panel') {
    const newRight = dragStartElementPos.value.right - deltaX;
    const newBottom = dragStartElementPos.value.bottom + deltaY;
    
    // 限制在视口内
    const maxRight = window.innerWidth - panelSize.value.width;
    const maxBottom = window.innerHeight - panelSize.value.height;
    
    panelPosition.value.right = Math.max(0, Math.min(newRight, maxRight));
    panelPosition.value.bottom = Math.max(0, Math.min(newBottom, maxBottom));
  }
};

// 调整大小移动
const handleResizeMove = (e) => {
  if (!isResizing.value) return;
  
  const deltaX = e.clientX - dragStartPos.value.x;
  const deltaY = dragStartPos.value.y - e.clientY; // Y轴反向
  
  const direction = resizeDirection.value;
  
  if (direction === 'right' || direction === 'corner') {
    const newWidth = dragStartElementPos.value.width + deltaX;
    const minWidth = 300;
    const maxWidth = window.innerWidth - panelPosition.value.right - 32;
    panelSize.value.width = Math.max(minWidth, Math.min(newWidth, maxWidth));
  }
  
  if (direction === 'bottom' || direction === 'corner') {
    const newHeight = dragStartElementPos.value.height + deltaY;
    const minHeight = 400;
    const maxHeight = window.innerHeight - panelPosition.value.bottom - 32;
    panelSize.value.height = Math.max(minHeight, Math.min(newHeight, maxHeight));
  }
};

// 拖拽结束
const handleDragEnd = () => {
  isDragging.value = false;
  dragType.value = null;
  document.removeEventListener('mousemove', handleDragMove);
  document.removeEventListener('mouseup', handleDragEnd);
};

// 调整大小结束
const handleResizeEnd = () => {
  isResizing.value = false;
  dragType.value = null;
  resizeDirection.value = null;
  document.removeEventListener('mousemove', handleResizeMove);
  document.removeEventListener('mouseup', handleResizeEnd);
};

onMounted(() => {
  loadData();
  
  // 清理事件监听器
  return () => {
    document.removeEventListener('mousemove', handleDragMove);
    document.removeEventListener('mouseup', handleDragEnd);
    document.removeEventListener('mousemove', handleResizeMove);
    document.removeEventListener('mouseup', handleResizeEnd);
  };
});
</script>

<style scoped>
.work-system {
  width: 100%;
  min-height: calc(100vh - 72px);
  padding: 24px;
}

.page-header {
  text-align: center;
  margin-bottom: 32px;
}

.page-title {
  font-size: 48px;
  font-weight: 700;
  background: linear-gradient(135deg, #4A90E2 0%, #50C9C3 50%, #7BDFF2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 2px;
  text-shadow: 0 4px 20px rgba(74, 144, 226, 0.3);
  animation: fadeInDown 0.6s ease-out;
}

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

.work-content {
  display: flex;
  gap: 24px;
  max-width: 1600px;
  margin: 0 auto;
}

.kanban-board {
  flex: 1;
  display: flex;
  gap: 20px;
  min-width: 0;
}

.kanban-column {
  flex: 1;
  min-width: 280px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(16px);
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.column-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.06);
}

.column-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.task-count {
  background: rgba(74, 144, 226, 0.1);
  color: #4A90E2;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.task-list {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 200px;
}

.task-list::-webkit-scrollbar {
  width: 6px;
}

.task-list::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

.add-task-btn {
  padding: 12px;
  border: 2px dashed rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  background: transparent;
  color: #666;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
  transition: all 0.3s ease;
}

.add-task-btn:hover {
  border-color: #4A90E2;
  color: #4A90E2;
  background: rgba(74, 144, 226, 0.05);
}

/* 收起状态的圆形按钮 */
.panel-toggle-btn {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4A90E2 0%, #6BB6FF 100%);
  border: none;
  cursor: move;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.4);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: fixed;
  z-index: 1000;
  user-select: none;
}

.panel-toggle-btn:active {
  cursor: grabbing;
}

.panel-toggle-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(74, 144, 226, 0.5);
}

.panel-toggle-btn:active {
  transform: scale(0.95);
}

.panel-toggle-btn svg {
  width: 24px;
  height: 24px;
}

/* 展开状态的浮动窗口 */
.floating-panel {
  position: fixed;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.08);
  overflow: hidden;
  z-index: 1001;
  min-width: 300px;
  min-height: 400px;
}

/* 窗口标题栏 */
.panel-title-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  background: rgba(248, 249, 250, 0.8);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  cursor: move;
  user-select: none;
  flex-shrink: 0;
}

.panel-title-bar:active {
  cursor: grabbing;
}

.panel-title-text {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
}

.panel-title-text::before {
  content: '';
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4A90E2 0%, #6BB6FF 100%);
}

.panel-close-btn {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: none;
  background: transparent;
  color: #666;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.panel-close-btn:hover {
  background: rgba(0, 0, 0, 0.06);
  color: #333;
}

.panel-close-btn:active {
  transform: scale(0.95);
}

/* 调整大小手柄 */
.resize-handle {
  position: absolute;
  background: transparent;
  z-index: 10;
}

.resize-handle-right {
  top: 0;
  right: 0;
  width: 8px;
  height: 100%;
  cursor: ew-resize;
}

.resize-handle-bottom {
  bottom: 0;
  left: 0;
  width: 100%;
  height: 8px;
  cursor: ns-resize;
}

.resize-handle-corner {
  bottom: 0;
  right: 0;
  width: 16px;
  height: 16px;
  cursor: nwse-resize;
  background: rgba(74, 144, 226, 0.1);
  border-radius: 4px 0 0 0;
}

.resize-handle-corner:hover {
  background: rgba(74, 144, 226, 0.2);
}

.resize-handle-right:hover,
.resize-handle-bottom:hover {
  background: rgba(74, 144, 226, 0.1);
}

.side-panel {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: relative;
}

.panel-tabs {
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  background: rgba(248, 249, 250, 0.5);
  flex-wrap: wrap;
  min-height: 48px;
}

.tab-btn {
  flex: 1;
  min-width: 0;
  padding: 12px 6px;
  border: none;
  background: transparent;
  color: #666;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 12px;
  transition: all 0.3s ease;
  border-bottom: 2px solid transparent;
  white-space: nowrap;
  overflow: hidden;
  position: relative;
}

.tab-btn svg {
  flex-shrink: 0;
}

.tab-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tab-btn:hover {
  color: #4A90E2;
  background: rgba(74, 144, 226, 0.05);
}

.tab-btn.active {
  color: #4A90E2;
  border-bottom-color: #4A90E2;
  background: rgba(74, 144, 226, 0.08);
  font-weight: 600;
}

.panel-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.panel-header h3 {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.upload-file-btn,
.create-doc-btn,
.add-ddl-btn {
  padding: 6px 12px;
  background: #4A90E2;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s ease;
}

.upload-file-btn:hover,
.create-doc-btn:hover,
.add-ddl-btn:hover {
  background: #3d7bc4;
  transform: translateY(-1px);
}

.file-list,
.document-list,
.ddl-list {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.chat-panel {
  padding: 0;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #999;
}

.empty-state p {
  margin: 0;
  font-size: 14px;
}

/* 面板展开/收起动画 */
.panel-slide-enter-active,
.panel-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.panel-slide-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

.panel-slide-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

@media (max-width: 1200px) {
  .work-content {
    flex-direction: column;
  }

  .kanban-board {
    overflow-x: auto;
  }

  .kanban-column {
    min-width: 300px;
  }

  .floating-panel {
    width: 380px;
    max-width: calc(100vw - 32px);
    bottom: 16px;
    right: 16px;
  }

  .panel-toggle-btn {
    bottom: 16px;
    right: 16px;
    width: 52px;
    height: 52px;
  }
}

@media (max-width: 768px) {
  .work-system {
    padding: 16px;
  }

  .work-content {
    gap: 16px;
  }

  .kanban-board {
    gap: 12px;
  }

  .kanban-column {
    min-width: 260px;
    padding: 16px;
  }

  .floating-panel {
    width: calc(100vw - 32px);
    max-width: 100%;
    bottom: 16px;
    right: 16px;
    max-height: calc(100vh - 80px);
  }

  .panel-toggle-btn {
    width: 48px;
    height: 48px;
    bottom: 16px;
    right: 16px;
  }

  .panel-toggle-btn svg {
    width: 20px;
    height: 20px;
  }

  .panel-tabs {
    flex-wrap: wrap;
    gap: 0;
  }

  .tab-btn {
    flex: 0 0 50%;
    min-width: 50%;
    max-width: 50%;
    padding: 10px 4px;
    font-size: 11px;
    box-sizing: border-box;
  }

  .tab-btn svg {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
  }

  .tab-text {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .panel-header {
    padding: 12px 16px;
    flex-wrap: wrap;
    gap: 8px;
  }

  .panel-header h3 {
    font-size: 14px;
  }

  .upload-file-btn,
  .create-doc-btn,
  .add-ddl-btn {
    padding: 6px 10px;
    font-size: 11px;
  }
}

@media (max-width: 480px) {
  .tab-btn {
    flex: 0 0 50%;
    max-width: 50%;
    padding: 10px 4px;
    font-size: 10px;
    gap: 4px;
    box-sizing: border-box;
  }

  .tab-text {
    display: block;
    font-size: 10px;
  }

  .tab-btn svg {
    width: 14px;
    height: 14px;
  }

  .kanban-column {
    min-width: 240px;
    padding: 12px;
  }

  .column-title {
    font-size: 16px;
  }
}
</style>
