import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordValidator(control: AbstractControl): ValidationErrors | null {
  const value: string = control.value || '';

  if (!value) {
    return null;
  }

  const hasUpperCase = /[A-Z]+/.test(value);
  const hasLowerCase = /[a-z]+/.test(value);
  const hasNumeric = /[0-9]+/.test(value);
  const hasSpecial = /[\W_]+/.test(value);
  const isValidLength = value.length >= 8;

  const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecial && isValidLength;

  return !passwordValid ? { passwordStrength: true } : null;
}
