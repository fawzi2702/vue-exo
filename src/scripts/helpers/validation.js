const VALIDATION_ATTRIBUTE = "data-validation";
const VALIDATION_SEPARATOR = ";";
const VALIDATION_ERROR_CONTAINER_ATTRIBUTE = "aria-describedby";
const VALIDATION_FIELD_INVALID_ATTRIBUTE = "aria-invalid";

const getFieldValidator = (field, validators) => {
  const { name = "unknown" } = field;

  const validationAttribute = field.getAttribute(VALIDATION_ATTRIBUTE);
  const validatorsNames = validationAttribute.split(VALIDATION_SEPARATOR);

  return validatorsNames.reduce((acc, validatorName) => {
    const validator = validators[validatorName];

    if (!validator) {
      console.warn(`Validator ${validatorName} not found for field ${name}`);
    }

    return acc.concat(validator);
  }, []);
};

const validateValue = (value, [validator, errorMessage]) => {
  return validator(value) ? null : errorMessage;
};

const validateField = (field, validators) => {
  const { value } = field;

  const errors = validators.reduce((acc, validator) => {
    const error = validateValue(value, validator);

    if (error) {
      acc.push(error);
    }

    return acc;
  }, []);

  return errors;
};

const setFieldValidationState = (field, isValid) => {
  field.setAttribute(VALIDATION_FIELD_INVALID_ATTRIBUTE, !isValid);
};

const setFieldErrorMessages = (field, errors) => {
  const errorContainerId = field.getAttribute(
    VALIDATION_ERROR_CONTAINER_ATTRIBUTE
  );
  const errorContainer = document.getElementById(errorContainerId);

  if (!errorContainer) {
    console.warn("Error container not found");
  }

  if (errors.length) {
    errorContainer.innerHTML = errors.join("<br>");
  } else {
    errorContainer.innerHTML = "";
  }
};

const displayFieldErrors = (field, errors) => {
  setFieldValidationState(field, !errors.length);

  setFieldErrorMessages(field, errors);
};

const validateForm = (form, validators) => {
  if (!form instanceof HTMLFormElement) {
    throw new Error("Invalid form element");
  }

  const validationResult = {
    isValid: true,
    errors: {},
  };

  const formElements = form.elements;
  for (let i = 0; i < formElements.length; i++) {
    const field = formElements[i];

    if (field.hasAttribute(VALIDATION_ATTRIBUTE)) {
      const fieldValidators = getFieldValidator(field, validators);

      const errors = validateField(field, fieldValidators);

      displayFieldErrors(field, errors);

      if (errors.length) {
        validationResult.isValid = false;
        validationResult.errors[field.name] = errors;
      }
    }
  }

  return validationResult;
};
