<template>
  <div class="home">
    <!-- 顶部导航栏 -->
    <header class="nav" :class="{ 'nav-home': isHome }">
      <div class="nav-left"></div>
      <nav class="nav-center">
        <a>协作空间</a>
        <a>发现</a>
        <a>个人中心</a>
        <a>新手指导</a>
        <a
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg
        ></a>
      </nav>
    </header>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

// 获取当前路由
const route = useRoute();

// 判断是否在首页
const isHome = computed(() => route.path === "/");

console.log(route);
</script>

<style scoped>
.nav {
  position: absolute;
  top: 40px;
  left: 0;
  right: 0;

  display: flex;
  align-items: right;
  justify-content: space-between;

  padding: 20px 40px;
  background: transparent;
  color: black;
  transition: color 0.3s ease;
}

.nav-home {
  color: white;
}

.nav-center a {
  margin: 0 20px;
  cursor: pointer;
  font-size: 18px;
  opacity: 0.9;
  color: inherit;
}

.nav-center a:hover {
  opacity: 1;
}
</style>
