<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})
const user = useUserStore()
const name = ref(user.savedName)
onMounted(() => {
  // just test store
  user.setNewName('test2')
  console.log(name.value)
})
const router = useRouter()
function about() {
  if (name.value)
    router.push('/about')
}
</script>

<template>
  <div class="" @click="about">
    This is home page click me to about page
  </div>
  <CustomSvgIcon name="search" height="50" width="50" />
</template>
