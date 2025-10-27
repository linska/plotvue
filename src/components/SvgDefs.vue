<script setup lang="ts">
defineProps<{ gradId: string; filterId: string }>()
</script>

<template>
  <defs>
    <filter :id="filterId" color-interpolation-filters="linearRGB" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse">
      <feMorphology operator="erode" radius="8 8" in="SourceGraphic" result="morphology"/>
      <feGaussianBlur stdDeviation="4 4" in="morphology" result="blur"/>
    </filter>
    <linearGradient :id="gradId" x1="0%" y1="0%" x2="100%" y2="50%">
      <stop offset="0%" stop-color="white" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="white" stop-opacity="0"/>
    </linearGradient>
  </defs>
</template>

<style scoped>

</style>