import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const phoneNumberRegex = /^[0-9]{10}$/;  // Example pattern for a 10-digit phone number
    const valid = phoneNumberRegex.test(control.value);
    return valid ? null : { invalidPhoneNumber: { value: control.value } };
  };
}
