// 文档API服务 - 预留后端接口
const API_BASE_URL = '/api/documents';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// 获取文档列表
export const getDocuments = async () => {
  // TODO: 替换为真实API调用
  // return fetch(`${API_BASE_URL}/list`).then(res => res.json());
  
  // 模拟API调用
  await delay(200);
  const saved = localStorage.getItem('work-system-documents');
  if (saved) {
    return JSON.parse(saved);
  }
  return [];
};

// 创建文档
export const createDocument = async (title, description) => {
  // TODO: 替换为真实API调用
  // return fetch(`${API_BASE_URL}`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ title, description })
  // }).then(res => res.json());
  
  // 模拟API调用
  await delay(300);
  
  const doc = {
    id: Date.now(),
    title,
    description: description || '',
    createdAt: Date.now(),
    lastEditor: '当前用户',
    lastEditedAt: Date.now()
  };
  
  return doc;
};

// 删除文档
export const deleteDocument = async (docId) => {
  // TODO: 替换为真实API调用
  // return fetch(`${API_BASE_URL}/${docId}`, { method: 'DELETE' }).then(res => res.json());
  
  // 模拟API调用
  await delay(200);
  return { success: true };
};
