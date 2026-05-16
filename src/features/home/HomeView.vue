<script setup lang="ts">
import { ref } from 'vue'
import BaseTabs from '@/components/BaseTabs.vue';
import MetaView from './meta/MetaView.vue';

// 탭 데이터
const myTabs = [
  { key: 'meta', label: '추천 메타' },
  { key: 'data', label: '데이터' },
]
// 현재 선택한 탭 데이터
const selectedTab = ref('meta')

</script>

<template>
  <div>
    <BaseTabs 
      v-model="selectedTab" 
      :tabs="myTabs"
    />
    <MetaView/>
  </div>
</template>