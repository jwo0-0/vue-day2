<script setup lang="ts">
import { computed } from 'vue'

export interface TabItem {
  key: string
  label: string
}

const props = defineProps<{
  tabs: readonly TabItem[] | TabItem[]
  modelValue: string
}>()

// 현재 선택된 탭의 인덱스 계산
const selectedIdx = computed(() => {
  return props.tabs.findIndex(tab => tab.key === props.modelValue)
})

const emit = defineEmits<{
  (e: 'update:modelValue', key: string): void
}>()

const onTabClick = (key: string) => {
  emit('update:modelValue', key)
}
</script>

<template>
  <div class="flex justify-center py-24 text-white">
    <div class="w-full max-w-xs">
      <div 
        class="relative grid rounded-full border border-zinc-800 bg-zinc-900 p-1 shadow-lg"
        :style="{ gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))` }"
      >
        <div 
          class="absolute inset-0 p-1 transition-transform duration-300"
          :style="{ 
            width: `${100 / tabs.length}%`, 
            transform: `translateX(${selectedIdx * 100}%)` 
          }"
        >
          <div class="w-full h-full bg-zinc-700 rounded-full"></div>
        </div>

        <!-- 탭 버튼 -->
        <button
          v-for="tab in tabs"
          :key="tab.key"
          type="button"
          @click="onTabClick(tab.key)"
          class="z-10 py-3 text-sm font-semibold transition-colors duration-300"
          :class="modelValue === tab.key ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>
  </div>
</template>