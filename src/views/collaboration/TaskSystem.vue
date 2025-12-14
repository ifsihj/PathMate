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
        <!-- <div class="calendar-section">
          <div class="calendar-header">
            <button class="nav-btn" @click="previousMonth">‹</button>
            <h2 class="calendar-title">{{ currentMonth }}</h2>
            <button class="nav-btn" @click="nextMonth">›</button>
          </div>
          <div class="calendar">
            <div class="calendar-weekdays">
              <div class="weekday" v-for="day in weekdays" :key="day">{{ day }}</div>
            </div>
            <div class="calendar-days">
              <div
                v-for="(day, index) in calendarDays"
                :key="index"
                class="calendar-day"
                :class="{
                  'other-month': day.otherMonth,
                  'has-event': day.events && day.events.length > 0,
                }"
              >
                <span class="day-number">{{ day.date }}</span>
                <div class="day-events">
                  <div
                    v-for="(event, eventIndex) in day.events"
                    :key="eventIndex"
                    class="event-block"
                    :class="event.type"
                  >
                    {{ event.time }} {{ event.title }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> -->
        <Calendar />
        <!-- 任务列表部分 -->
        <div class="tasks-section">
          <h3 class="section-title">任务列表</h3>
          <div class="tasks-list">
            <div
              v-for="task in tasks"
              :key="task.id"
              class="task-item"
            >
              <div class="task-avatar">
                <!-- 组长头像 -->
                <svg v-if="task.avatar === 'LeaderAvatar'" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 60 60" fill="none">
                  <circle cx="30" cy="20" r="12" fill="#4A4A4A" />
                  <rect x="18" y="32" width="24" height="28" rx="3" fill="#2C3E50" />
                </svg>
                <!-- 星星头像 -->
                <svg v-else-if="task.avatar === 'StarAvatar'" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 60 60" fill="none">
                  <polygon points="30,10 35,25 50,25 38,35 42,50 30,40 18,50 22,35 10,25 25,25" fill="#FFD700" />
                  <circle cx="30" cy="30" r="8" fill="#FFA500" />
                </svg>
                <!-- 猫头像 -->
                <svg v-else-if="task.avatar === 'CatAvatar'" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 60 60" fill="none">
                  <circle cx="30" cy="30" r="25" fill="#FFFFFF" />
                  <circle cx="25" cy="25" r="3" fill="#000" />
                  <circle cx="35" cy="25" r="3" fill="#000" />
                  <path d="M 20 35 Q 30 40 40 35" stroke="#000" stroke-width="2" fill="none" stroke-linecap="round" />
                  <path d="M 15 20 Q 20 15 25 20" stroke="#000" stroke-width="2" fill="none" stroke-linecap="round" />
                  <path d="M 35 20 Q 40 15 45 20" stroke="#000" stroke-width="2" fill="none" stroke-linecap="round" />
                </svg>
              </div>
              <span class="task-text">{{ task.title }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Calendar from "@/components/Calendar.vue";
// 当前日期
const currentDate = ref(new Date(2025, 11, 1)); // 2025年12月

// 星期名称
const weekdays = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];

// 当前月份文本
const currentMonth = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth() + 1;
  return `${year}年${month}月`;
});

// 事件数据
const events = ref([
  { date: 2, time: "10:00-11:00", title: "团队会议", type: "meeting" },
  { date: 9, time: "10:00-11:00", title: "团队会议", type: "meeting" },
  { date: 12, time: "10:00-11:00", title: "团队会议", type: "meeting" },
  { date: 23, time: "10:00-11:00", title: "Academic English", type: "academic" },
  { date: 23, time: "10:00-11:00", title: "团队会议", type: "meeting" },
  { date: 26, time: "10:00-11:00", title: "团队会议", type: "meeting" },
  { date: 30, time: "10:00-11:00", title: "Academic English", type: "academic" },
  { date: 30, time: "10:00-11:00", title: "团队会议", type: "meeting" },
]);

// 任务数据
const tasks = ref([
  { id: 1, title: "绘制网站地图", avatar: "LeaderAvatar" },
  { id: 2, title: "绘制线框图", avatar: "StarAvatar" },
  { id: 3, title: "绘制内容映射", avatar: "CatAvatar" },
]);

// 生成日历天数
const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  
  // 获取当月第一天和最后一天
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  // 获取第一天是星期几（0=周日，需要转换为1=周一）
  let firstDayWeek = firstDay.getDay();
  firstDayWeek = firstDayWeek === 0 ? 7 : firstDayWeek; // 将周日转换为7
  
  const days = [];
  
  // 添加上个月的天数
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = firstDayWeek - 1; i > 0; i--) {
    days.push({
      date: prevMonthLastDay - i + 1,
      otherMonth: true,
      events: [],
    });
  }
  
  // 添加当月的天数
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const dayEvents = events.value.filter((e) => e.date === i);
    days.push({
      date: i,
      otherMonth: false,
      events: dayEvents,
    });
  }
  
  // 添加下个月的天数，使日历完整
  const remainingDays = 42 - days.length; // 6行 x 7列 = 42
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      date: i,
      otherMonth: true,
      events: [],
    });
  }
  
  return days;
});

// 切换月份
const previousMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() - 1,
    1
  );
};

const nextMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + 1,
    1
  );
};
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
  font-size: 42px;
  font-weight: bold;
  color: #2c3e50;
  letter-spacing: 1.5px;
}

.white-wrapper {
  background: #ffffff;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(16, 24, 40, 0.08);
  max-width: 1100px;
  margin: 0 auto;
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

