import type { ValidationType } from '@/helpers/validation'
import type { InputHTMLAttributes } from 'vue'

// TS type for the data-validation attribute
// It can be a single validation type or a combination of multiple validation types
// Cause TS doesn't support recursive types, we need to define the type for each level of nesting
type DataValidationLevel1 = `${ValidationType}`
type DataValidationLevel2 = `${ValidationType};${DataValidationLevel1}`
type DataValidationLevel3 = `${ValidationType};${DataValidationLevel2}`
type DataValidationLevel4 = `${ValidationType};${DataValidationLevel3}`
type DataValidationLevel5 = `${ValidationType};${DataValidationLevel4}`
type DataValidationLevel6 = `${ValidationType};${DataValidationLevel5}`
type DataValidationLevel7 = `${ValidationType};${DataValidationLevel6}`
type DataValidationLevel8 = `${ValidationType};${DataValidationLevel7}`
type DataValidationLevel9 = `${ValidationType};${DataValidationLevel8}`
type DataValidationLevel10 = `${ValidationType};${DataValidationLevel9}`
type DataValidation =
  | DataValidationLevel1
  | DataValidationLevel2
  | DataValidationLevel3
  | DataValidationLevel4
  | DataValidationLevel5
  | DataValidationLevel6
  | DataValidationLevel7
  | DataValidationLevel8
  | DataValidationLevel9
  | DataValidationLevel10

export interface BasicInputProps extends /* @vue-ignore */ InputHTMLAttributes {
  label?: string
  dataValidation?: DataValidation
  helper?: string | string[]
  invalid?: boolean
}
