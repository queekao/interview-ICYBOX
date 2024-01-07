<script lang="ts" setup>
import { ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { debounce } from 'lodash'

interface FormContainerProps {
  class?: string
}
interface FormRule {
  // Add any key here if you need have different form
  input?: string
}

const props = defineProps<FormContainerProps>()
const { setInputValue } = useSearchStore()
const ruleFormRef = ref<FormInstance>()
const defaultForm = reactive<FormRule>({
  input: '',
})

const rules = reactive<FormRules<FormRule>>({
  input: [
    // You can pass the field rules here
  ],
})
const updateInput = debounce((value: string) => {
  setInputValue(value) // form value should separate from input value
}, 500)
function submitForm() {
  ruleFormRef?.value?.validate((valid: boolean) => {
    if (valid) {
      // Handle valid form submission
      alert('submit!')
    }
    else {
      console.error('Validation failed.')
      return false
    }
  })
}
</script>

<template>
  <el-form
    ref="ruleFormRef" :model="defaultForm" :rules="rules" label-width="200px" size="large"
    status-icon :class="props.class" @submit="submitForm"
  >
    <slot :default-form="defaultForm" :update-input="updateInput" />
  </el-form>
</template>

<style lang="scss" scoped>
</style>
