export const loginMockApi = async (formData: FormData): Promise<true> => {
  const response = true

  console.info(
    'Login Form submitted',
    formData.get('email'),
    formData.get('password'),
  )

  return response
}
