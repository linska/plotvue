<script setup lang="ts">
import {PlotPie} from 'plotvue'

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
