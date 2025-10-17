import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { AuthService } from '@services';
import { InputComponent, LabelComponent } from '@ui';
import { AuthFormLayoutComponent } from '@VAuth/auth-form-layout/auth-form-layout.component';

@Component({
  selector: 'app-forgot-password',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    InputComponent,
    AuthFormLayoutComponent,
    LabelComponent,
  ],
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent {
  method: 'email' | 'phone' = 'email';

  forgotPasswordForm!: FormGroup;

  emailForm!: FormGroup;
  phoneForm!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _toastr: ToastrService
  ) {
    this.emailForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.phoneForm = this._fb.group({
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(010|011|012|015)[0-9]{8}$/),
        ],
      ],
    });

    this.forgotPasswordForm = this.emailForm;
  }

  control(control: string) {
    return this.forgotPasswordForm.get(control) as FormControl;
  }

  switchMethod() {
    this.method = this.method === 'email' ? 'phone' : 'email';

    this.forgotPasswordForm =
      this.method === 'email' ? this.emailForm : this.phoneForm;
  }

  sendCode() {
    const data =
      this.method === 'email'
        ? this.forgotPasswordForm.value
        : { phone: `+2${this.forgotPasswordForm.value.phone}` };

    this._authService.forgotPassword(data, this.method).subscribe({
      next: (res) => {
        this._toastr.success(`${res.message}`, 'Code Sent');
        this._router.navigate(['/auth/verify-code']);
      },
      // error: (err) => console.log(err),
      // complete: () => console.log('Complete'),
    });
  }
}
