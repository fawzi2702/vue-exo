const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const PASSWORD_MIN_LENGTH = 8;

const formFieldValidators = {
  email: [[(value = "") => EMAIL_REGEX.test(value), "Invalid email"]],
  password: [
    [
      (value = "") => value.length >= PASSWORD_MIN_LENGTH,
      `Password must contain at least ${PASSWORD_MIN_LENGTH} characters`,
    ],
    [
      (value = "") => /[A-Z]/.test(value),
      "Password must contain at least one uppercase letter",
    ],
    [
      (value = "") => /[a-z]/.test(value),
      "Password must contain at least one lowercase letter",
    ],
    [
      (value = "") => /\d/.test(value),
      "Password must contain at least one digit",
    ],
    [
      (value = "") => /\W/.test(value),
      "Password must contain at least one special character",
    ],
  ],
  required: [[(value = "") => !!value.trim(), "Field is required"]],
};
