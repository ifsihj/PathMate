<script setup>
import { ref, provide } from 'vue';
import NavBar from "./components/NavBar.vue";
import SearchModal from "./components/SearchModal.vue";

const showSearchModal = ref(false);

// 提供全局搜索功能
provide('showSearchModal', showSearchModal);
</script>

<template>
  <div id="app">
    <router-view />
    <NavBar />
    <SearchModal v-model:open="showSearchModal" />
  </div>
</template>

<style></style>
