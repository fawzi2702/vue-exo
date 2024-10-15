const postLoginForm = async (formData) => {
  const response = loginMockApi(formData);

  return response;
};

const handleSubmitLoginForm = (event) => {
  event.preventDefault();

  const form = event.target;

  const validationResult = validateForm(form, formFieldValidators);
  if (!validationResult.isValid) {
    console.warn("Login Form is invalid", validationResult.errors);
    return;
  }

  try {
    postLoginForm(new FormData(form));
  } catch (error) {
    console.error("Login Form submission failed", error);
  }
};
