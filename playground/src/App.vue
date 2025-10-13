<script setup lang="ts">
import {PlotPie} from 'plotvue'

const items = [{value: 2.5, title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}, {value: 1, title: '1'},  {value: 1, title: '1'}, {value: 1, title: '1'}, ]
</script>

<template>
<div>
  <plot-pie
    :items="items"
    max-width="500"
    donat="9"
    legend-position="center"
  />
  <plot-pie max-width="200"/>
</div>
</template>

<style scoped>

</style>
