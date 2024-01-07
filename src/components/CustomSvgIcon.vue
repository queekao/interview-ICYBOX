<script>
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'SvgIcon',
  props: {
    prefix: {
      type: String,
      default: 'icon',
    },
    name: {
      // name of the icon
      type: String,
      required: true,
    },
    width: {
      type: [String, Number],
      default: '20',
    },
    height: {
      type: [String, Number],
      default: '20',
    },
  },
  setup(props) {
    const symbolId = computed(() => `#${props.prefix}-${props.name}`)
    return { symbolId }
  },
})
</script>

<template>
  <svg aria-hidden="true" :width="width" :height="height">
    <use :href="symbolId" />
  </svg>
</template>
