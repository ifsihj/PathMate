<template>
  <a-modal
    :open="open"
    :title="title"
    :width="640"
    @cancel="emit('update:open', false)"
    :footer="null"
  >
    <div class="list-scroll">
      <a-list
        :data-source="items"
        item-layout="horizontal"
        :split="true"
      >
        <template #renderItem="{ item }">
          <a-list-item class="detail-row" @click="emit('select', item)">
            <a-list-item-meta>
              <template #title>
                <span class="row-title">{{ item.title }}</span>
              </template>
              <template #description>
                <span class="row-desc">{{ item.typeLabel || item.type || '' }}</span>
              </template>
            </a-list-item-meta>
            <template #actions>
              <a-button type="link" @click.stop="emit('select', item)">查看详情</a-button>
            </template>
          </a-list-item>
        </template>
      </a-list>
    </div>

    <div v-if="!items || items.length === 0" class="empty">暂无内容</div>
  </a-modal>
</template>

<script setup>
const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: '详情列表',
  },
  items: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['update:open', 'select']);
</script>

<style scoped>
.list-scroll {
  max-height: min(60vh, 520px);
  overflow-y: auto;
}

.detail-row {
  cursor: pointer;
}

.row-title {
  font-weight: 600;
  color: #333;
}

.row-desc {
  color: #888;
}

.empty {
  padding: 18px 0 6px;
  text-align: center;
  color: #999;
}
</style>
