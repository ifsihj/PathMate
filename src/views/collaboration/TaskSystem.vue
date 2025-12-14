<template>
  <div class="task-system">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1 class="page-title">PATH MATE</h1>
    </div>

    <!-- 主要内容 -->
    <div class="white-wrapper">
      <div class="content-wrapper">
        <!-- 日历部分 -->
        <Calendar />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Calendar from "@/components/Calendar.vue";

// 任务数据
const tasks = ref([
  { id: 1, title: "绘制网站地图", avatar: "LeaderAvatar" },
  { id: 2, title: "绘制线框图", avatar: "StarAvatar" },
  { id: 3, title: "绘制内容映射", avatar: "CatAvatar" },
]);
</script>

<style scoped>
.task-system {
  width: 100%;
  min-height: calc(100vh - 60px);
}

.page-header {
  text-align: center;
  margin-bottom: 25px;
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

.white-wrapper {
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.95) 0%, 
    rgba(255, 255, 255, 0.9) 100%);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  padding: 40px;
  border-radius: 24px;
  box-shadow: 
    0 20px 60px rgba(74, 144, 226, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
  max-width: 1100px;
  margin: 0 auto;
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

/* 日历部分 */
.calendar-section {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 12px;
}

.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.nav-btn {
  background: #3498db;
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-btn:hover {
  background: #2980b9;
  transform: scale(1.1);
}

.calendar-title {
  font-size: 20px;
  font-weight: bold;
  color: #2c3e50;
  margin: 0;
}

.calendar {
  background: white;
  border-radius: 8px;
  padding: 15px;
}

.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  margin-bottom: 10px;
}

.weekday {
  text-align: center;
  font-weight: 600;
  color: #555;
  padding: 10px 0;
  font-size: 14px;
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
}

.calendar-day {
  min-height: 80px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  background: white;
  transition: all 0.2s ease;
}

.calendar-day:hover {
  background: #f0f0f0;
}

.calendar-day.other-month {
  opacity: 0.3;
  background: #f8f8f8;
}

.calendar-day.has-event {
  border-color: #3498db;
}

.day-number {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 5px;
}

.day-events {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow: hidden;
}

.event-block {
  font-size: 10px;
  padding: 2px 4px;
  border-radius: 3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.event-block.meeting {
  background: #ffb3d9;
  color: #7a0030;
}

.event-block.academic {
  background: #90ee90;
  color: #006400;
}

/* 任务列表部分 */
.tasks-section {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 12px;
}

.section-title {
  font-size: 24px;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 20px;
}

.tasks-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.task-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: white;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  transition: all 0.3s ease;
}

.task-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transform: translateX(5px);
}

.task-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f0f0;
  border: 2px solid #ddd;
  flex-shrink: 0;
}

.task-text {
  font-size: 16px;
  color: #2c3e50;
  font-weight: 500;
}

@media (max-width: 768px) {
  .calendar-days {
    gap: 3px;
  }

  .calendar-day {
    min-height: 60px;
    padding: 3px;
  }

  .event-block {
    font-size: 8px;
    padding: 1px 2px;
  }
}
</style>

