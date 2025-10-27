# PlotVue

Lightweight and customizable chart components for **Vue 3**.

[![npm version](https://img.shields.io/npm/v/plotvue.svg)](https://www.npmjs.com/package/plotvue)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/linska/plotvue/blob/main/LICENSE)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-brightgreen.svg)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?logo=typescript)](https://www.typescriptlang.org/)

---

## 📦 Installation

```bash
npm install plotvue
```
or
```bash
yarn add plotvue
```

## 🚀 Quick Start
``` vue
<script setup>
  import { PlotPie } from 'plotvue'
  const items = [
    { value: 30, title: 'Category A', color: '#ff6384' }, 
    { value: 50, title: 'Category B', color: '#36a2eb' }, 
    { value: 20, title: 'Category C', color: '#ffce56' }
  ]
</script>

<template>
  <PlotPie
    :items="items"
    :show-percent="true"
    max-width="500"
  />
</template>
```

## 🎨 Features
* ⚡️ Lightweight and dependency-free
* 🧩 Vue 3 + Composition API support
* 💡 Simple, reactive API

## 🧱 Components
| Component    | Description                                                                                                                                                                                                                                                         |
| ------------ |---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `PlotPie` | SVG-based circular charts with optional legends and percentage labels. It automatically adapts to container size and supports slots for full customization of chart and legend layout. |

## ✅ Props
| Prop                     | Type                                                      | Default     | Description                                  |
| ------------------------ | --------------------------------------------------------- | ----------- | -------------------------------------------- |
| `items`                  | `Array<{ title: string; value: number; color?: string }>` | `[]`        | Array of data items for each slice           |
| `noDataText`             | `string`                                                  | `'No data'` | Text displayed when there’s no valid data    |
| `maxWidth` / `maxHeight` | `number \| string`                                        | –           | Maximum chart size (e.g., `300` or `'100%'`) |
| `width` / `height`       | `number \| string`                                        | –           | Chart size in pixels or CSS units            |
| `color`                  | `string`                                                  | `#3232a8`   | Default fallback color for slices            |
| `legendColor`            | `string`                                                  | `#3232a8`   | Text color for legend items                  |
| `showPercent`            | `boolean`                                                 | `false`     | Displays slice percentages in legend         |
| `legendPosition`         | `'top' \| 'bottom' \| 'left' \| 'right'`                  | `'bottom'`  | Position of the legend relative to the chart |

Created with ❤️ by [Tania Linska](https://github.com/linska)