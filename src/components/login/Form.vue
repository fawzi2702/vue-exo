<template>
  <form action="" @submit.prevent="onSubmit">
    <div class="form-group">
      <label for="email">Email</label>
      <input
        required
        type="email"
        data-validation="required;email"
        id="email"
        name="email"
        class="form-control"
        aria-describedby="email-helper"
      />
      <small id="email-helper"></small>
    </div>

    <div class="form-group">
      <label for="password">Mot de passe</label>
      <input
        required
        type="password"
        data-validation="required;password"
        id="password"
        name="password"
        class="form-control"
        aria-describedby="password-helper"
      />
      <small id="password-helper"></small>
    </div>

    <button type="submit">Se connecter</button>
  </form>
</template>

<script setup lang="ts">
import { loginMockApi } from '@/helpers/mocks/login'
import validateForm from '@/helpers/validation'
import formFieldValidators from '@/utils/validators'

const postLoginForm = async (formData: FormData) => {
  const response = loginMockApi(formData)

  return response
}

const handleSubmitLoginForm = (event: Event) => {
  const form = event.target as HTMLFormElement

  const validationResult = validateForm(form, formFieldValidators)
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
  handleSubmitLoginForm(event)
}
</script>
