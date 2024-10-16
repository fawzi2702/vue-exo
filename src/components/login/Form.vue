<template>
  <form action="" @submit.prevent="onSubmit">
    <BasicInput
      label="Email"
      type="email"
      name="email"
      id="email"
      data-validation="required;email"
      autocomplete="email"
      :invalid="!!formValidation?.errors?.email?.length"
      :helper="formValidation?.errors?.email"
    />

    <BasicInput
      label="Mot de passe"
      type="password"
      name="password"
      id="password"
      data-validation="required;password"
      autocomplete="current-password"
      :invalid="!!formValidation?.errors?.password?.length"
      :helper="formValidation?.errors?.password"
    />

    <button type="submit">Se connecter</button>
  </form>
</template>

<script setup lang="ts">
import { loginMockApi } from '@/helpers/mocks/login'
import validateForm, { type ValidationResult } from '@/helpers/validation'
import formFieldValidators from '@/utils/validators'
import BasicInput from '@/components/form/BasicInput.vue'
import { ref } from 'vue'

const formValidation = ref<ValidationResult | null>(null)

const postLoginForm = async (formData: FormData) => loginMockApi(formData)

const handleSubmitLoginForm = (form: HTMLFormElement) => {
  const validationResult = validateForm(form, formFieldValidators)

  formValidation.value = validationResult
  if (!validationResult.isValid) {
    console.warn('Login Form is invalid', validationResult.errors)
    return
  }

  try {
    postLoginForm(new FormData(form))
  } catch (error) {
    console.error('Login Form submission failed', error)
  }
}

const onSubmit = (event: Event) => {
  handleSubmitLoginForm(event.target as HTMLFormElement)
}
</script>
