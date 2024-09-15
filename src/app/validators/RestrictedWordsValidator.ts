import {AbstractControl, ValidationErrors} from '@angular/forms'
export function RestrictedWordsValidator(control: AbstractControl): ValidationErrors | null{     
    return control.value.includes('fuck')
        ? { restrictedWords: true} : null
}