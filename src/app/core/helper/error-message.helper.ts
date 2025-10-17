import { FormControl } from '@angular/forms';

const patternMessages: Record<string, string> = {
  '/^(010|011|012|015)[0-9]{8}$/': 'Please enter a valid 11-digit phone number',

  '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).{8,}$/': `<ul class="list-decimal ms-4">
      <li>At least 8 characters</li>
      <li>One uppercase letter</li>
      <li>One lowercase letter</li>
      <li>One number</li>
      <li>One special character</li>
    </ul>`,
};

export function errorMessage(control: FormControl): string[] {
  if (!control || !control.errors) return [];

  return Object.keys(control.errors).map((key) => {
    switch (key) {
      case 'required':
        return 'This field is required';
      case 'minlength':
        return `Minimum length is ${
          control.errors![key].requiredLength
        } characters`;
      case 'maxlength':
        return `Maximum length is ${
          control.errors![key].requiredLength
        } characters`;
      case 'email':
        return 'Please enter a valid email address';
      case 'pattern': {
        const requiredPattern = control.errors!['pattern'].requiredPattern;
        return patternMessages[requiredPattern] || 'Invalid format';
      }
      case 'passwordMismatch':
        return 'Passwords must match';
      default:
        return 'Invalid input';
    }
  });
}
