<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})
</script>

<template>
  <div relative>
    <FormContainer class="relative z-10">
      <template #default="{ defaultForm, updateInput }">
        <el-form-item flex="~" class="items-center justify-center" mt="5rem" prop="city" relative flex-col>
          <el-input
            v-model="defaultForm.city" placeholder="City or State" type="text"
            class="border-radius-5 border-10px border-[var(--color-grey-100)] text-center text-size-[var(--fz-h1)] outline-none"
            w="120%" p="5rem" @input="updateInput"
          />
          <CustomSvgIcon class="absolute right-[10%] top-1/2 transform -translate-y-1/2" name="search" height="50" width="50" />
          <slot />
        </el-form-item>
      </template>
    </FormContainer>
    <DynamicItems />
  </div>
</template>

<style scoped lang="scss">
ul{
  min-width: 40rem;
}
</style>
