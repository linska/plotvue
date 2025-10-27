<script setup lang="ts">
import {computed} from "vue";

const props = withDefaults(defineProps<{
  color?: string
  title: string
  percent?: number | string
  showPercent?: boolean
}>(), {
  color: '#3232a8',
  showPercent: false,
  percent: 0,
})

const colorStyle = computed(() => ({
  backgroundColor: props.color
}))

</script>

<template>
  <div class="plot-legend__item">
    <div class="plot-legend__color" :style="colorStyle"></div>
    <div class="plot-legend__title">{{ title }}</div>
    <div v-if="showPercent" class="plot-legend__percent"> - {{ percent }}%</div>
  </div>
</template>

<style scoped>
.plot-legend__item {
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.plot-legend__title {
  flex-grow: 1;
}

.plot-legend__color {
  width: 10px;
  height: 10px;
  min-width: 10px;
  min-height: 10px;
  border-radius: 2px;
  flex-shrink: 0;
}

.plot-legend__percent {
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}
</style>