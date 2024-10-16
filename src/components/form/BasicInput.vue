<template>
  <div class="form-group">
    <label v-if="!!label" :for="id">{{ label }}</label>

    <input
      :id="id"
      class="form-control"
      :type="type"
      :data-validation="dataValidation"
      :name="name"
      v-bind="$attrs"
      v-model="model"
      :aria-invalid="invalid"
    />

    <small>
      <div v-for="message in helperMessages">{{ message }}</div>
    </small>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import type { BasicInputProps } from './BasicInput.type'

const {
  id,
  label,
  name,
  type = 'text',
  dataValidation,
  invalid,
  helper,
} = defineProps<BasicInputProps>()

const model = defineModel()

const helperMessages = computed<string[]>(() => {
  if (!helper) {
    return []
  }

  return Array.isArray(helper) ? helper : [helper]
})
</script>
