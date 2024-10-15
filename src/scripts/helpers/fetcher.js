const loginMockApi = async (formData) => {
  const response = true;

  console.info(
    "Login Form submitted",
    formData.get("email"),
    formData.get("password")
  );

  return response;
};
