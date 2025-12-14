// DDL API服务 - 预留后端接口
const API_BASE_URL = '/api/ddl';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// 获取DDL列表
export const getDDLList = async () => {
  // TODO: 替换为真实API调用
  // return fetch(`${API_BASE_URL}/list`).then(res => res.json());
  
  // 模拟API调用
  await delay(200);
  const saved = localStorage.getItem('work-system-ddl');
  if (saved) {
    return JSON.parse(saved);
  }
  return [];
};

// 创建DDL
export const createDDL = async (ddlData) => {
  // TODO: 替换为真实API调用
  // return fetch(`${API_BASE_URL}`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(ddlData)
  // }).then(res => res.json());
  
  // 模拟API调用
  await delay(300);
  return { success: true };
};

// 更新DDL
export const updateDDL = async (ddlId, updates) => {
  // TODO: 替换为真实API调用
  // return fetch(`${API_BASE_URL}/${ddlId}`, {
  //   method: 'PATCH',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(updates)
  // }).then(res => res.json());
  
  // 模拟API调用
  await delay(200);
  
  // 更新localStorage中的数据
  const saved = localStorage.getItem('work-system-ddl');
  if (saved) {
    const ddlList = JSON.parse(saved);
    const index = ddlList.findIndex(d => d.id === ddlId);
    if (index !== -1) {
      ddlList[index] = { ...ddlList[index], ...updates };
      localStorage.setItem('work-system-ddl', JSON.stringify(ddlList));
    }
  }
  
  return { success: true };
};

// 删除DDL
export const deleteDDL = async (ddlId) => {
  // TODO: 替换为真实API调用
  // return fetch(`${API_BASE_URL}/${ddlId}`, { method: 'DELETE' }).then(res => res.json());
  
  // 模拟API调用
  await delay(200);
  return { success: true };
};
