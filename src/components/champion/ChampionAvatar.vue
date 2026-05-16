<script setup lang="ts">
import { computed } from 'vue';
import type { Unit } from '@/types';

const props = defineProps<{
  unit?: Unit;
  empty?: boolean;
}>();

const tierColorsMap: Record<number, { text: string; border: string }> = {
  1: { text: 'text-slate-500',   border: 'border-slate-500' },
  2: { text: 'text-green-500',   border: 'border-green-500' },
  3: { text: 'text-sky-500',     border: 'border-sky-500' },
  4: { text: 'text-fuchsia-500', border: 'border-fuchsia-500' },
  5: { text: 'text-amber-400',   border: 'border-amber-400' }
};

const defaultColor = { text: 'text-slate-500', border: 'border-slate-500' };

const currentTierStyle = computed(() => {
  if (props.empty || !props.unit?.cost) return defaultColor;
  return tierColorsMap[props.unit.cost] ?? defaultColor;
});

const textColorClass = computed(() => currentTierStyle.value.text);
const borderClass = computed(() => currentTierStyle.value.border);

const rankClassMap = {
  '1st': 'bg-sky-500 text-white',
  '2nd': 'bg-pink-500 text-white',
  '3rd': 'bg-blue-500 text-white'
} as const

const rankClass = computed(() => {
  if (!props.unit?.rank) return '';
  return rankClassMap[props.unit.rank] ?? '';
});
</script>

<template>
  <div class="w-[54px] shrink-0">
    <!-- 실제 데이터가 있는 경우 -->
    <template v-if="!empty && unit">
      <div class="mb-1 flex h-3 items-center justify-center gap-[1px]">
        <span
          v-for="star in unit.star ?? 0"
          :key="star"
          class="text-[11px] leading-none"
          :class="textColorClass"
        >
          ★
        </span>
      </div>

      <div class="relative">
        <img
          :src="unit.image"
          :alt="unit.name"
          class="h-[54px] w-[54px] rounded-md border-2 object-cover bg-[#1b1d2b]"
          :class="borderClass"
        />

        <span
          v-if="unit.rank"
          class="absolute -right-1 -top-1 rounded px-1 py-[1px] text-[10px] font-bold leading-none"
          :class="rankClass"
        >
          {{ unit.rank }}
        </span>
      </div>

      <p class="mt-1 truncate text-center text-[11px] font-semibold leading-none text-white">
        {{ unit.name }}
      </p>
    </template>

    <!-- 빈 칸인 경우 -->
    <div v-else class="flex flex-col items-center">
      <!-- 별 영역 높이 유지 -->
      <div class="mb-1 h-3" /> 
      <div class="h-[54px] w-[54px] rounded-md border border-[#50536d] bg-transparent" />
      <!-- 이름 영역 높이 유지 -->
      <div class="mt-1 h-[11px]" />
    </div>
  </div>
</template>