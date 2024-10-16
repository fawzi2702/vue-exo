const VALIDATION_ATTRIBUTE = 'data-validation'
const VALIDATION_SEPARATOR = ';'

export type ValidationType = 'email' | 'password' | 'required'
export type FieldValidator = [Function, string]
export type FormFieldValidator = Record<ValidationType, Array<FieldValidator>>
export type ValidationResult = {
  isValid: boolean
  errors: Record<string, string[]>
}

const getFieldValidator = (
  field: HTMLFormElement,
  validators: FormFieldValidator,
) => {
  const { name = 'unknown' } = field

  const validationAttribute = field.getAttribute(VALIDATION_ATTRIBUTE) || ''
  const validatorsNames = validationAttribute.split(
    VALIDATION_SEPARATOR,
  ) as ValidationType[]

  return validatorsNames.reduce(
    (acc: FieldValidator[], validatorName: ValidationType) => {
      const validator = validators[validatorName]

      if (!validator) {
        console.warn(`Validator ${validatorName} not found for field ${name}`)
      }

      return acc.concat(validator)
    },
    [],
  )
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

      if (errors.length) {
        validationResult.isValid = false
        validationResult.errors[field.name] = errors
      }
    }
  }

  return validationResult
}

export default validateForm
