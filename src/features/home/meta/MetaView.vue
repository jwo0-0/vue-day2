<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Deck } from '@/types';
import { mainApi } from '@/api/api';

// 1. 상태 정의
const items = ref<Deck[]>([]);

// 2. 데이터 호출
onMounted(async () => {
    items.value = await mainApi.getMetaList();
});

</script>

<template>
  <div class="space-y-2">
    <div
      class="flex max-w-[1080px] mx-auto items-stretch overflow-hidden rounded-md bg-[#2b2d42]
           hover:bg-[#343752] cursor-pointer"
    >
      <div class="min-h-[140px]">
        {{ items[0]?.name }}
      </div>
    </div>
  </div>
</template>