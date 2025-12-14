// 文件API服务 - 预留后端接口
const API_BASE_URL = '/api/files';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// 上传文件
export const uploadFile = async (file) => {
  // TODO: 替换为真实API调用
  // const formData = new FormData();
  // formData.append('file', file);
  // return fetch(`${API_BASE_URL}/upload`, {
  //   method: 'POST',
  //   body: formData
  // }).then(res => res.json());
  
  // 模拟API调用
  await delay(500);
  
  const fileData = {
    id: Date.now(),
    name: file.name,
    size: file.size,
    type: file.type,
    url: URL.createObjectURL(file), // 临时URL
    uploadedAt: Date.now(),
    uploader: '当前用户'
  };
  
  return fileData;
};

// 获取文件列表
export const getFiles = async () => {
  // TODO: 替换为真实API调用
  // return fetch(`${API_BASE_URL}/list`).then(res => res.json());
  
  // 模拟API调用
  await delay(200);
  const saved = localStorage.getItem('work-system-files');
  if (saved) {
    return JSON.parse(saved);
  }
  return [];
};

// 删除文件
export const deleteFile = async (fileId) => {
  // TODO: 替换为真实API调用
  // return fetch(`${API_BASE_URL}/${fileId}`, { method: 'DELETE' }).then(res => res.json());
  
  // 模拟API调用
  await delay(200);
  return { success: true };
};
