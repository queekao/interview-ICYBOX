<script setup lang="ts">
import nProgress from 'nprogress'
import { toast } from 'vue3-toastify'

const { matchArrSearch, searchInputValue, searchDatas, setAllDatas, outputDefault } = useSearchStore()
nProgress.start()
fetch(`${import.meta.env.VITE_API_ENDPOINT}`, {
  method: 'GET',
  headers: {
    // 'Cache-Control': 'max-age=3600', // Caches response for 1 hour
    // 'If-None-Match': 'your-etag-value', // ETag value for cache validation
    // 'If-Modified-Since': 'Wed, 21 Oct 2015 07:28:00 GMT', // Last-Modified date for cache validation
  },
})
  .then(blob => blob.json())
  .then((data: any[]) => {
    setAllDatas(data)
    nProgress.done()
  }).catch((err) => {
    toast.error('request error')
    throw new Error(err)
  })

watchEffect(() => {
  if (searchInputValue.value)
    searchDatas(searchInputValue.value)
})
watch(() => searchInputValue.value, () => {
  if (matchArrSearch.value.length === 0)
    toast.warn('No Result')
})
function highlightMatch(text: string) {
  if (!searchInputValue.value)
    return text
  const regex = new RegExp(searchInputValue.value, 'gi')
  return text.replace(regex, matched => `<span class="highlight">${matched}</span>`)
}
defineExpose({ matchArrSearch, setAllDatas, outputDefault, searchInputValue })
</script>

<template>
  <ul v-if="searchInputValue !== ''" m="0" p="0" class="absolute left-1/2 top-[98%] transform -translate-x-1/2" w="35%">
    <li v-for="(place, index) in matchArrSearch" :key="index">
      <div>
        <span mr="5" v-html="highlightMatch(place.city || '')" />
        <span v-html="highlightMatch(place.state || '')" />
      </div>
      <span>
        {{ place?.population?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}
      </span>
    </li>
  </ul>
  <ul v-else m="0" p="0" class="absolute left-1/2 top-[98%] transform -translate-x-1/2" w="35%">
    <li v-for="(item, index) in outputDefault" :key="index">
      {{ item?.name }}
    </li>
  </ul>
</template>

<style scoped lang="scss">
li {
      background:var(--color-white);
      list-style: none;
      border-bottom: 1px solid var(--color-grey-200);
      box-shadow: var(--bs-style-normal);
      margin:0;
      padding:20px;
      transition:background 0.2s;
      display:flex;
      justify-content:space-between;
      text-transform: capitalize;
      font-size: var(--fz-h2);
  }
li:nth-child(even) {
    transform: perspective(100px) rotateX(3deg) translateY(2px) scale(1.001);
    background: linear-gradient(to bottom,  var(--color-white) 0%,var(--color-grey-50) 100%);
}
li:nth-child(odd) {
    transform: perspective(100px) rotateX(-3deg) translateY(3px);
    background: linear-gradient(to top,  var(--color-white) 0%,var(--color-grey-50) 100%);
}
</style>
