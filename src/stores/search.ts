import { acceptHMRUpdate, defineStore } from 'pinia'

interface SearchItemProps {
  name?: string
  city?: string
  state?: string
  population?: string
}
export const useSearchStore = defineStore('search', () => {
  /**
   * Current inputValue.
   */
  const inputValue = ref<string>('')
  const searchInputValue = computed(() => inputValue)

  const allDatas = ref<SearchItemProps[]>([])
  const matchArr = ref<SearchItemProps[]>([])
  const matchArrSearch = computed(() => matchArr)
  const searchCache = new Map<string, SearchItemProps[]>()

  const outputDefault = ref<SearchItemProps[]>([{ name: 'Filter For A City' },
    { name: 'Or A State' }])
  function searchDatas(newValue: string) {
    if (searchCache.has(newValue)) {
      console.time('Cached Search Time')

      // O(1)  we need to cache search result
      matchArr.value = searchCache.get(newValue) as SearchItemProps[]
      console.timeEnd('Cached Search Time')
    }
    else {
    // O(p * (m + n)) p for place
      console.time('Search Time')

      matchArr.value = allDatas.value.filter((place: SearchItemProps) => {
        const regex = new RegExp(newValue, 'gi')
        // if the pattern becomes more complex, the time complexity of the regex matching could increase
        return place?.city?.match(regex) || place?.state?.match(regex)
      })
      console.timeEnd('Search Time')

      searchCache.set(newValue, matchArr.value)
    }
  }
  /**
   *
   *
   * @param datas - The fetch datas
   */
  function setAllDatas(datas: any) {
    allDatas.value = [...allDatas.value, ...datas]
  }
  function setInputValue(value: string) {
    inputValue.value = value
  }
  return {
    outputDefault,
    matchArrSearch,
    searchInputValue,
    setAllDatas,
    searchDatas,
    setInputValue,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useSearchStore as any, import.meta.hot))
