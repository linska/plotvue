<script setup lang="ts">
import {computed} from 'vue'
import {getUnit} from "../utils/convertToUnit.ts";
import {polarToCartesian} from "../utils/convertCoordinates.ts";
import {generateShades} from "../utils/colors.ts";

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
}>(), {
  noDataText: 'No data',
  color: '#253f80',
  showPercent: false,
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
    return [{ start: 0, end: 0, center: 0, angle: 0, percent: 0, color: props.color }]
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
    const sector = { start, end, center, angle, percent, color }
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
</script>

<template>
  <div
    class="plot_pie"
    :style="{
      maxWidth: maxWidthNormalized,
      maxHeight: maxHeightNormalized,
      width: widthNormalized,
      height: heightNormalized,
  }"
  >
    <svg viewBox="0 0 200 200">
      <template v-for="(sector, s) in sectorList" :key="s">
        <circle
          v-if="sector.end - sector.start >= 360"
          :cx="100"
          :cy="100"
          :r="100"
          :fill="sector.color"
        />
        <path
          v-else
          :d="sector.d"
          :fill="sector.color"
        />
      </template>
    </svg>
    <div>
      <div v-for="(sector, s) in sectorList" :key="s">
        <div class="color_box" :style="`background-color: ${sector.color}`"></div>
        <span>{{props.items?.[s]?.title}}</span>
        <span v-if="props.showPercent" class="percent"> - {{ sector.percent }}%</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.plot_pie {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;

  .color_box {
    width: 10px;
    height: 10px;
    display: inline-block;
    margin-right: 5px;
  }

  .percent {
    white-space: pre;
  }
}
</style>