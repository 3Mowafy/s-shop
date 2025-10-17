import { Component } from '@angular/core';
import {  Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { InputComponent, LabelComponent, CheckboxComponent } from '@ui';
import { AuthFormLayoutComponent } from '@VAuth/auth-form-layout/auth-form-layout.component';
import { AuthService } from '@services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    RouterLink,

    LabelComponent,
    InputComponent,
    CheckboxComponent,
    AuthFormLayoutComponent,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  showPassword = false;
  isChecked = false;

  signinForm!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _toastrService: ToastrService,
    private _router: Router,
 
  ) {
    this.signinForm = this._fb.group({
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
      keepLoggedIn: [this.isChecked],
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  control(control: string) {
    return this.signinForm.get(control) as FormControl;
  }

  login() {
    this._authService.login(this.signinForm.value).subscribe({
      next: (res) => {
        // this._toastrService.success(res.message, 'Success');
        this._router.navigate(['/']
          
        );
      },
      // error: (err) => console.log(err),
      // complete: () => console.log(''),
    });
  }
}
