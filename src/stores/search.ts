import { acceptHMRUpdate, defineStore } from 'pinia'

interface DynamicItemProps {
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

  const allDatas = ref<DynamicItemProps[]>([])
  const matchArr = ref<DynamicItemProps[]>([])
  const matchArrSearch = computed(() => matchArr)

  const outputDefault = ref<DynamicItemProps[]>([{ name: 'Filter For A City' },
    { name: 'Or A State' }])
  function searchDatas(newValue: string) {
    console.log(allDatas.value)

    matchArr.value = allDatas.value.filter((place: DynamicItemProps) => {
      const regex = new RegExp(newValue, 'gi')
      return place?.city?.match(regex) || place?.state?.match(regex)
    })
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
