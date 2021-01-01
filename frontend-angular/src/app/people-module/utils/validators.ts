import {AbstractControl} from '@angular/forms';

export function isValidEmail(control: AbstractControl): object | null {
  return !control.value.match(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)
    ? {invalidEmail: true}
    : null;
}
