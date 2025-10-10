<script setup lang="ts">
import {PlotPie} from 'plotvue'
</script>

<template>
<div>
  <plot-pie
    :items="[{value: 1, title: '1'}, {value: 2, title: '2'}, {value: 3, title: '3'}]"
  />
</div>
</template>

<style scoped>

</style>
