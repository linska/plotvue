<script setup lang="ts">
import type { Path } from '../PlotPieLogic'
import SvgDefs from "../../SvgDefs.vue"
import {computed} from "vue";

const props = defineProps<{
  sectorList: Path[]
  viewBox: string
  maxWidthNormalized?: string
  maxHeightNormalized?: string
  widthNormalized?: string
  heightNormalized?: string
  legendColor: string
  legendPosition: 'top' | 'bottom' | 'left' | 'right'
  showPercent: boolean
}>()

const svgStyle = computed(() => ({
  maxWidth: props.maxWidthNormalized,
  maxHeight: props.maxHeightNormalized,
  width: props.widthNormalized,
  height: props.heightNormalized,
}));

const animationDelayStep = 50
const getAnimationDelay = (index: number) => `${index * animationDelayStep}ms`
</script>

<template>
  <svg
    class="plot-image"
    :viewBox="viewBox"
    :style="svgStyle"
    role="img"
    :aria-label="`Pie chart with ${sectorList.length} sectors`"
  >
    <svg-defs grad-id="gradient" filter-id="filter"/>
    <template v-for="(sector, s) in sectorList" :key="s">
      <path
        :d="sector.d"
        :fill="sector.color"
        :style="{animationDelay: getAnimationDelay(s)}"
        :aria-label="`${sector.text}: ${sector.percent}%`"
      />
    </template>
  </svg>
</template>

<style scoped>
.plot-image {
  flex-grow: 1;
}

path {
  opacity: 0;
  scale: 0.7;
  transform-origin: center;
  animation: path 0.5s ease-in-out forwards;
}

@keyframes path {
  from {
    opacity: 0;
    scale: 0.7;
  }
  to {
    opacity: 1;
    scale: 1;
  }
}
</style>