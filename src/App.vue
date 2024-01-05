<script setup lang="ts">
// https://github.com/vueuse/head
useHead({
  title: 'interview-ICYBOX',
  meta: [
    {
      name: 'description', content: 'Interview project',
    },
    {
      name: 'theme-color',
      content: () => isDark.value ? '#00aba9' : '#ffffff',
    },
  ],
})
</script>

<template>
  <RouterView />
</template>
