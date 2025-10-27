import {computed, type ComputedRef} from 'vue'
import {getUnit} from "../../utils/convertToUnit"
import {type Dot, polarToCartesian} from "../../utils/convertCoordinates"
import {generateShades} from "../../utils/colors"

export type Item = { value: number; title: string; color?: string }

export type Line = {
  start: Dot
  end: Dot
}

export type Path = {
  start: number
  end: number
  center: number
  angle: number
  percent: number
  d?: string
  color: string
  line: Line
  text: string
}

export interface PlotPieProps {
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
}

export interface UsePlotPieDataReturn {
  maxWidthNormalized: ComputedRef<string | undefined>
  maxHeightNormalized: ComputedRef<string | undefined>
  widthNormalized: ComputedRef<string | undefined>
  heightNormalized: ComputedRef<string | undefined>
  total: ComputedRef<number>
  colors: ComputedRef<string[]>
  sectorList: ComputedRef<Path[]>
  slotItems: ComputedRef<Array<Item & { color: string; percent: number }>>
  viewBox: string
  size: number
}

const size = 200
const viewBox = '0 0 200 200'
const radiusOffset = 20
const center = size / 2
const defaultColor = '#3232a8'
const noDataText = 'No data'

const createSvgPath = (
  radius: number,
  startAngle: number,
  endAngle: number
): string => {
  const start = polarToCartesian(radius, center, endAngle)
  const end = polarToCartesian(radius, center, startAngle)
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'

  return [
    'M', start.x, start.y,
    'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y,
    'L', center, center,
    'Z',
  ].join(' ')
}

const calculatePercent = (value: number, total: number): number => {
  if (total === 0) return 0
  return Math.round((value * 100) / total)
}

export function usePlotPieData(props: PlotPieProps): UsePlotPieDataReturn {
  const itemsNormalized = computed<Item[]>(() =>
    props.items?.length
      ? props.items
      : [{value: 1, title: props.noDataText || noDataText}]
  )

  const maxWidthNormalized = computed(() => getUnit(props.maxWidth))
  const maxHeightNormalized = computed(() => getUnit(props.maxHeight))
  const widthNormalized = computed(() => getUnit(props.width))
  const heightNormalized = computed(() => getUnit(props.height))

  const total = computed(() =>
    itemsNormalized.value.reduce((acc, item) => acc + item.value, 0)
  )

  const colorList = computed(() =>
    generateShades(props.color || defaultColor, props.items?.length || 1)
  )

  const sectorList = computed<Path[]>(() => {
    const totalValue = total.value
    if (!totalValue) {
      return [{
        start: 0,
        end: 0,
        center: 0,
        angle: 0,
        percent: 0,
        color: props.color || defaultColor,
        line: {start: {x: 0, y: 0}, end: {x: 0, y: 0}},
        text: props.noDataText || noDataText,
      }]
    }

    const data = itemsNormalized.value
    const colors = colorList.value
    let currentAngle = 0
    const radius = center

    const sectors: Path[] = data.map((item, index) => {
      const angle = (item.value * 360) / totalValue
      const endAngle = currentAngle + angle
      const percent = calculatePercent(item.value, totalValue)
      const color = item.color || colors[index]
      const centerAngle = currentAngle + angle / 2

      const sector: Path = {
        start: currentAngle,
        end: endAngle,
        center: centerAngle,
        angle,
        percent,
        color,
        text: item.title,
        line: {
          start: polarToCartesian(radius, center, centerAngle),
          end: polarToCartesian(radius + radiusOffset, center, centerAngle)
        },
        d: createSvgPath(radius, currentAngle, endAngle)
      }

      currentAngle = endAngle
      return sector
    })

    return sectors
  })

  const slotItems = computed(() => {
    const totalValue = total.value
    const colors = colorList.value

    return itemsNormalized.value.map((item, index) => ({
      ...item,
      color: item.color || colors[index],
      percent: calculatePercent(item.value, totalValue)
    }))
  })

  return {
    maxWidthNormalized,
    maxHeightNormalized,
    widthNormalized,
    heightNormalized,
    total,
    colors: colorList,
    sectorList,
    slotItems,
    viewBox: viewBox,
    size: size
  }
}