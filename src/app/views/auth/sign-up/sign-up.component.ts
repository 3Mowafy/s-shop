import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { AuthService } from '@services';
import { InputComponent, LabelComponent } from '@ui';
import { passwordMatchValidator } from '@vaildators';
import { AuthFormLayoutComponent } from '@VAuth/auth-form-layout/auth-form-layout.component';

@Component({
  selector: 'app-sign-up',

  imports: [
    ReactiveFormsModule,
    RouterLink,

    AuthFormLayoutComponent,
    LabelComponent,
    InputComponent,
  ],
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent {
  showPassword = false;

  showConfirmPassword = false;

  signupForm!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _toastrService: ToastrService,
    private _router: Router
  ) {
    this.signupForm = this._fb.group(
      {
        name: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(30),
          ],
        ],
        phone: [
          '',
          [
            Validators.required,
            Validators.pattern(/^(010|011|012|015)[0-9]{8}$/),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
            ),
          ],
        ],
        confirmpassword: ['', [Validators.required]],
      },
      { validators: passwordMatchValidator }
    );
  }

  control(control: string) {
    return this.signupForm.get(control) as FormControl;
  }

  togglePasswordVisibility(status: string) {
    if (status == 'password') this.showPassword = !this.showPassword;
    if (status == 'confirm')
      this.showConfirmPassword = !this.showConfirmPassword;
  }

  createUser() {
    this._authService.signUp(this.signupForm.value).subscribe({
      next: (res) => {
        this._toastrService.success('Account created successfully', 'Success');
        this.signupForm.reset();
        this._router.navigate(['/auth/signin']);
        // console.log(res);
      },
      error: (err) => {
        // console.log(err);
      },
      complete: () => {
        // console.log('complete');
      },
    });
  }
}
