const handleSubmitLoginForm = (event) => {
  event.preventDefault();

  const form = event.target;

  const validationResult = validateForm(form, formFieldValidators);
  if (!validationResult.isValid) {
    console.warn("Login Form is invalid", validationResult.errors);
    return;
  }
};
