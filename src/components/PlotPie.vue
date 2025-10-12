<script setup lang="ts">
import {computed} from 'vue'
import {getUnit} from "../utils/convertToUnit";
import {polarToCartesian} from "../utils/convertCoordinates";
import {generateShades} from "../utils/colors";

type Item = { value: number; title: string; subtitle?: string; color?: string }

const props = withDefaults(defineProps<{
  items?: Item[] | null
  noDataText?: string
  maxWidth?: string | number
  maxHeight?: string | number
  width?: string | number
  height?: string | number
  color?: string
  showPercent?: boolean
  borderColor?: string
  borderWidth?: number
  legendPosition? : 'top' | 'bottom' | 'left' | 'right'
}>(), {
  noDataText: 'No data',
  color: '#253f80',
  showPercent: false,
  borderColor: '#ffffff',
  borderWidth: 2,
  legendPosition: 'bottom'
})

const itemsNormalized = computed<Item[]>(() => {
  if (props.items && props.items.length) return props.items
  return [{value: 1, title: props.noDataText}]
})

const maxWidthNormalized = computed(() => getUnit(props.maxWidth))
const maxHeightNormalized = computed(() => getUnit(props.maxHeight))
const widthNormalized = computed(() => getUnit(props.width))
const heightNormalized = computed(() => getUnit(props.height))

const total = computed(() => itemsNormalized.value.reduce((acc, item) => acc + item.value, 0))

type Path = {
  start: number
  end: number
  center: number
  angle: number
  percent: number
  d?: string
  color?: string
}

const size = 200

const colors = computed(() => generateShades(props.color, props.items?.length || 1))

const sectorList = computed<Path[]>(() => {
  if (!total.value) return []

  const data = itemsNormalized.value
  if (!data.length) {
    return [{start: 0, end: 0, center: 0, angle: 0, percent: 0, color: props.color}]
  }

  const quoterList: [Path[], Path[], Path[], Path[]] = [[], [], [], []]
  let start = 0
  const radius = size / 2
  const center = size / 2

  for (const item of data) {
    const index = data.indexOf(item)
    const angle = (item.value * 360) / total.value
    const end = start + angle
    const percent = Math.round((item.value * 100) / total.value)
    const color = item.color || colors.value[index]
    const sector = {start, end, center, angle, percent, color}
    const quoter = center < 90 ? 0 : center < 180 ? 1 : center < 270 ? 2 : 3
    quoterList[quoter].push(sector)
    start = end
  }

  const arranged: Path[][] = quoterList.map((quot, idx) => {
    const newQuot = quot.map((q) => {
      const start = polarToCartesian(radius, center, q.end)
      const end = polarToCartesian(radius, center, q.start)
      const largeArcFlag = q.end - q.start <= 180 ? '0' : '1'
      q.d = [
        'M', start.x, start.y,
        'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y,
        'L', q.center, q.center,
        'Z',
      ].join(' ')
      return q
    })
    return idx % 2 === 0 ? [...newQuot].reverse() : newQuot
  })

  return arranged.flat()
})

const slotItems = computed(() => {
  return itemsNormalized.value.map((item, index) => ({
    ...item,
    color: colors.value[index],
    percent: Math.round((item.value * 100) / total.value)
  }))
})

const viewBox = computed(() => `${props.borderWidth > 0 ? -props.borderWidth : 0 } ${props.borderWidth > 0 ? -props.borderWidth : 0 } ${size + props.borderWidth * 2} ${size + props.borderWidth * 2}`)
</script>

<template>
  <div
    class="plot_pie"
    :class="`plot_pie--${legendPosition}`"
  >
    <slot name="no-data" v-if="sectorList[0].end - sectorList[0].start >= 360">
      <svg
        class="plot-image"
        :stroke-width="borderWidth"
        :stroke="borderColor"
        :viewBox="viewBox"
        :style="{
      maxWidth: maxWidthNormalized,
      maxHeight: maxHeightNormalized,
      width: widthNormalized,
      height: heightNormalized,
  }"
      >
        <circle
          :cx="100"
          :cy="100"
          :r="100"
          :fill="sectorList[0].color"
        />
      </svg>
    </slot>
    <slot v-else :items="sectorList">
      <svg
        class="plot-image"
        :viewBox="viewBox"
        :stroke-width="borderWidth"
        :stroke="borderColor"
        :style="{
      maxWidth: maxWidthNormalized,
      maxHeight: maxHeightNormalized,
      width: widthNormalized,
      height: heightNormalized,
  }"
      >
        <path
          v-for="(sector, s) in sectorList" :key="s"
          :d="sector.d"
          :fill="sector.color"
        />
      </svg>
    </slot>
    <slot name="legend" :items="slotItems">
      <div class="plot-legend">
        <div v-for="(sector, s) in sectorList" :key="s" class="plot-legend__item">
          <div class="plot-legend__color" :style="`background-color: ${sector.color}`"></div>
          <div class="plot-legend__title">{{ itemsNormalized[s]?.title }}</div>
          <div v-if="props.showPercent" class="plot-legend__percent"> - {{ sector.percent }}%</div>
        </div>
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

.plot_pie--bottom{
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
  display: inline-block;
  margin-right: 5px;
}

.plot-legend__percent {
  white-space: pre;
}
</style>