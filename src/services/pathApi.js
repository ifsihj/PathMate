/**
 * Path 数据服务
 * 提供 Path 相关的数据和方法
 */

// Path 列表数据
export const pathList = [
  {
    id: 1,
    name: 'Path1',
    title: 'PathMate 网站设计',
    description: '一个面向高校学生的成长协作与经验连接平台，旨在帮助学生找到合适的伙伴，建立持续连接，沉淀成长经验。',
    status: 'active',
    startDate: '2025-12-13',
    participants: 4,
  },
  {
    id: 2,
    name: 'Path2',
    title: '作业展示平台数据库',
    description: '设计并实现一个用于展示学生作业作品的数据库系统，支持多类型作业的上传、分类、检索和展示功能。',
    status: 'active',
    startDate: '2024-02-01',
    participants: 8,
  },
  {
    id: 3,
    name: 'Path3',
    title: 'AI 对信息公平的影响',
    description: '研究人工智能技术在信息传播和获取过程中对公平性的影响，分析算法偏见、信息茧房等问题。',
    status: 'planning',
    startDate: '2024-03-01',
    participants: 15,
  },
];

/**
 * 获取所有 Path 列表
 * @returns {Array} Path 列表
 */
export const getPathList = () => {
  return Promise.resolve(pathList);
};

/**
 * 根据 ID 获取 Path 详情
 * @param {number} id Path ID
 * @returns {Object} Path 详情
 */
export const getPathById = (id) => {
  const path = pathList.find(p => p.id === id);
  return Promise.resolve(path);
};

/**
 * 获取前 N 个 Path（用于主页显示）
 * @param {number} count 数量
 * @returns {Array} Path 列表
 */
export const getDisplayedPaths = (count = 3) => {
  return pathList.slice(0, count);
};

