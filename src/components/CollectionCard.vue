<template>
  <div class="collection-card" :class="cardClass">
    <div v-if="item.type === 'quote'" class="quote-card" @click="handleClick">
      <div class="quote-icon">"</div>
      <p class="quote-text">{{ item.title }}</p>
    </div>
    <NoteCard v-else :item="item" @click="handleClick" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import NoteCard from './NoteCard.vue';

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['click']);

const cardClass = computed(() => {
  return props.item.type === 'quote' ? 'quote-type' : 'note-type';
});

const handleClick = () => {
  emit('click', props.item);
};
</script>

<style scoped>
.collection-card {
  transition: all 0.3s ease;
}

.quote-card {
  background: linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%);
  border-radius: 16px;
  padding: 32px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(155, 89, 182, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.quote-card::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  pointer-events: none;
}

.quote-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(155, 89, 182, 0.4);
}

.quote-icon {
  font-size: 80px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.3);
  line-height: 1;
  margin-bottom: 16px;
  font-family: Georgia, serif;
}

.quote-text {
  font-size: 16px;
  color: white;
  text-align: center;
  line-height: 1.6;
  margin: 0;
  font-weight: 500;
  z-index: 1;
  position: relative;
}
</style>
