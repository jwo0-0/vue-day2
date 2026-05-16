<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Deck } from '@/types';
import ChampionAvatar from '@/components/champion/ChampionAvatar.vue';

const props = defineProps<{
  deck: Deck;
}>();

const isSelected = ref(false);

const onClick = () => {
  isSelected.value = !isSelected.value;
}

const tierClassMap: Record<Deck['tier'], string> = {
  S: 'bg-gradient-to-b from-violet-400 to-fuchsia-600',
  A: 'bg-gradient-to-b from-emerald-400 to-teal-600',
  B: 'bg-gradient-to-b from-sky-400 to-blue-600',
  C: 'bg-gradient-to-b from-slate-400 to-slate-600'
}

const statList = computed(() => [
  { label: '평균 순위', value: props.deck.avgRank.toFixed(2) },
  { label: '1등 확률', value: `${props.deck.winRate.toFixed(2)}%` },
  { label: '순방 확률', value: `${props.deck.top4Rate.toFixed(2)}%` },
  { label: '픽률', value: `${props.deck.pickRate.toFixed(2)}%` },
]);
</script>

<template>
  <div
    class="flex max-w-[1080px] mx-auto items-stretch overflow-hidden rounded-md bg-[#2b2d42]
         /* 호버 효과 */
         transition-all duration-200 cursor-pointer
         hover:bg-[#343752] hover:shadow-lg hover:-translate-y-[2px]
         /* 클릭 효과 */
         active:scale-[0.98] active:translate-y-0"
         @click="onClick"
  >
    <!-- left -->
    <div class="flex w-[400px] items-center px-4 py-3 gap-5">
      <div
        class="flex h-8 w-8 items-center justify-center rounded-[8px] text-[12px] text-white font-extrabold shadow"
        :class="tierClassMap[deck.tier]"
      >
        {{ deck.tier }}
      </div>

      <div class="flex min-w-0 flex-col justify-center">
        <div class="truncate text-[20px] font-extrabold leading-none text-white">
          {{ deck.name }}
        </div>

        <div class="mt-4 grid grid-cols-4">
          <div 
            v-for="(item, index) in statList" 
            :key="item.label"
            :class="[
              'flex flex-col justify-center px-3',
              index !== 3 ? 'border-r border-[#434762]' : '', // 마지막 요소만 보더 제외
            ]"
          >
            <p class="text-[12px] leading-none text-[#9ea5c4]">{{ item.label }}</p>
            <p class="mt-2 text-[14px] font-extrabold leading-none text-white">
              {{ item.value }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- right -->
    <div class="flex min-w-0 flex-1 flex-col justify-center px-4 py-3">
      <div class="mb-3 flex items-center justify-between">
        <div class="flex min-w-0 items-center gap-2">
          <div class="flex items-center gap-1 text-[#ffcf66]">
            <span class="text-xs">🪙</span>
            <span class="text-[14px] font-extrabold">{{ deck.cost }}</span>
          </div>

          <div class="flex flex-wrap items-center gap-1.5">
            <div
              v-for="trait in deck.traits"
              :key="trait.name"
              class="flex h-6 items-center gap-1 rounded-full bg-[#1c1e2d] px-2.5 text-[11px] font-semibold text-[#c7cbde]"
            >
              <span class="opacity-60">◈</span>
              <span>{{ trait.count }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Unit List -->
      <div class="flex items-start gap-2">
        <ChampionAvatar
          v-for="i in 10"
          :key="i"
          :unit="deck.units[i - 1]" 
          :empty="!deck.units[i - 1]"
        />
      </div>
    </div>
  </div>

  <div 
    v-if="isSelected"
    class="max-w-[1080px] h-[420px] rounded-md mx-auto bg-[#292a36]"
  >
    
  </div>
</template>