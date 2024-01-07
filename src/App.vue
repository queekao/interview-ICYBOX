<script setup lang="ts">
// https://github.com/vueuse/head

useHead({
  title: 'interview-ICYBOX',
  meta: [
    {
      name: 'description', content: 'Interview project',
    },
  ],
})
</script>

<template>
  <RouterView />
</template>
