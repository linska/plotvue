<script setup lang="ts">
import PlotPie from "./components/PlotPie.vue";
</script>

<template>
  <PlotPie
    :items="[{value: 12, title: 'test'}, {value: 12, title: 'test'}, {value: 12, title: 'test'}, {value: 22, title: 'test'}, {value: 10, title: 'test2', subtitle: 'test subtitle'}]"
    max-width="600"
    show-percent
  />
</template>

<style scoped>

</style>
