import { AbstractControl, ValidationErrors } from '@angular/forms'

export class CustomValidators {
  public static passwordContainsNumber(control: AbstractControl): ValidationErrors | null {
    const regex = /\d/

    if (regex.test(control.value) && control.value !== null) {
      return null
    }

    return {
      passwordInvalid: true,
    }
  }

  public static passwordsMatch(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value
    const passwordConfirm = control.get('passwordConfirm')?.value

    if ((password === passwordConfirm) && (password && passwordConfirm)) {
      return null
    }

    return {
      passwordsNotMatching: true
    }
  }
}
