<script setup lang="ts">
import { usePlotPieData, type Item } from './PlotPieLogic'
import PlotPieUiMain from './ui/PlotPieUIMain.vue'
import PlotPieUiLegend from './ui/PlotPieUILegend.vue'
import SvgDefs from "../SvgDefs.vue"
import { computed } from "vue"

const props = withDefaults(defineProps<{
  items?: Item[] | null
  noDataText?: string
  maxWidth?: string | number
  maxHeight?: string | number
  width?: string | number
  height?: string | number
  color?: string
  legendColor?: string
  showPercent?: boolean
  legendPosition?: 'top' | 'bottom' | 'left' | 'right'
}>(), {
  noDataText: 'No data',
  color: '#3232a8',
  legendColor: '#3232a8',
  showPercent: false,
  legendPosition: 'bottom',
})

const {
  maxWidthNormalized,
  maxHeightNormalized,
  widthNormalized,
  heightNormalized,
  sectorList,
  slotItems,
  viewBox
} = usePlotPieData(props)

const isNoData = computed(() => {
  const firstSector = sectorList.value[0]
  return firstSector && (firstSector.end - firstSector.start >= 360)
})

const svgStyle = computed(() => ({
  maxWidth: maxWidthNormalized.value,
  maxHeight: maxHeightNormalized.value,
  width: widthNormalized.value,
  height: heightNormalized.value,
}))
</script>

<template>
  <div
    class="plot_pie"
    :class="`plot_pie--${legendPosition}`"
  >
    <slot name="no-data" v-if="isNoData">
      <svg
        class="plot-image"
        :viewBox="viewBox"
        :style="svgStyle"
      >
        <svg-defs grad-id="gradient" filter-id="filter"/>
        <circle
          cx="100"
          cy="100"
          r="100"
          :fill="sectorList[0].color"
        />
      </svg>
    </slot>
    <slot v-else :items="sectorList">
      <plot-pie-ui-main
        :sector-list="sectorList"
        :view-box="viewBox"
        :max-width-normalized="maxWidthNormalized"
        :max-height-normalized="maxHeightNormalized"
        :width-normalized="widthNormalized"
        :height-normalized="heightNormalized"
        :legend-color="legendColor"
        :legend-position="legendPosition"
        :show-percent="showPercent"
      />
    </slot>
    <slot name="legend" :items="slotItems">
      <div v-if="!isNoData" class="plot-legend">
        <plot-pie-ui-legend
          v-for="(item, i) in slotItems"
          :key="i"
          :title="item.title"
          :color="item.color"
          :percent="item.percent"
          :show-percent="showPercent"
        />
      </div>
    </slot>
  </div>
</template>

<style scoped>
.plot_pie {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.plot_pie--top {
  flex-direction: column-reverse;
}

.plot_pie--bottom {
  flex-direction: column;
}

.plot_pie--left {
  flex-direction: row-reverse;
}

.plot_pie--right {
  flex-direction: row;
}

.plot-image, .plot-legend {
  flex-grow: 1;
}
</style>