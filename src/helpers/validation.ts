const VALIDATION_ATTRIBUTE = 'data-validation'
const VALIDATION_SEPARATOR = ';'
const VALIDATION_ERROR_CONTAINER_ATTRIBUTE = 'aria-describedby'
const VALIDATION_FIELD_INVALID_ATTRIBUTE = 'aria-invalid'

export type FieldValidator = [Function, string]
export type FormFieldValidator = Record<string, Array<FieldValidator>>

const getFieldValidator = (
  field: HTMLFormElement,
  validators: FormFieldValidator,
) => {
  const { name = 'unknown' } = field

  const validationAttribute = field.getAttribute(VALIDATION_ATTRIBUTE) || ''
  const validatorsNames = validationAttribute.split(VALIDATION_SEPARATOR)

  return validatorsNames.reduce((acc: FieldValidator[], validatorName) => {
    const validator = validators[validatorName]

    if (!validator) {
      console.warn(`Validator ${validatorName} not found for field ${name}`)
    }

    return acc.concat(validator)
  }, [])
}

const validateValue = (
  value: string,
  [validator, errorMessage]: FieldValidator,
) => {
  return validator(value) ? null : errorMessage
}

const validateField = (
  field: HTMLFormElement,
  validators: Array<FieldValidator>,
) => {
  const { value } = field

  const errors = validators.reduce((acc: string[], validator) => {
    const error = validateValue(value, validator)

    if (error) {
      acc.push(error)
    }

    return acc
  }, [])

  return errors
}

const setFieldValidationState = (field: HTMLFormElement, isValid: boolean) => {
  field.setAttribute(VALIDATION_FIELD_INVALID_ATTRIBUTE, String(!isValid))
}

const setFieldErrorMessages = (field: HTMLFormElement, errors: string[]) => {
  const errorContainerId = field.getAttribute(
    VALIDATION_ERROR_CONTAINER_ATTRIBUTE,
  )

  if (!errorContainerId) {
    return
  }
  const errorContainer = document.getElementById(errorContainerId)

  if (!errorContainer) {
    console.warn('Error container not found')
    return
  }

  if (errors.length) {
    errorContainer.innerHTML = errors.join('<br>')
  } else {
    errorContainer.innerHTML = ''
  }
}

const displayFieldErrors = (field: HTMLFormElement, errors: string[]) => {
  setFieldValidationState(field, !errors.length)

  setFieldErrorMessages(field, errors)
}

const validateForm = (
  form: HTMLFormElement,
  validators: FormFieldValidator,
) => {
  if (!(form instanceof HTMLFormElement)) {
    throw new Error('Invalid form element')
  }

  const validationResult = {
    isValid: true,
    errors: {} as Record<string, string[]>,
  }

  const formElements = form.elements
  for (let i = 0; i < formElements.length; i++) {
    const field = formElements[i] as HTMLFormElement

    if (field.hasAttribute(VALIDATION_ATTRIBUTE)) {
      const fieldValidators = getFieldValidator(field, validators)

      const errors = validateField(field, fieldValidators)

      displayFieldErrors(field, errors)

      if (errors.length) {
        validationResult.isValid = false
        validationResult.errors[field.name] = errors
      }
    }
  }

  return validationResult
}

export default validateForm
