import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '@services';
import { InputComponent, LabelComponent } from '@ui';
import { passwordMatchValidator } from '@vaildators';
import { AuthFormLayoutComponent } from '@VAuth/auth-form-layout/auth-form-layout.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  imports: [
    FormsModule,
    AuthFormLayoutComponent,
    RouterLink,
    InputComponent,
    ReactiveFormsModule,
    LabelComponent,
  ],
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent {
  showPassword = false;

  showConfirmPassword = false;

  resetPasswordForm!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _toastr: ToastrService
  ) {
    this.resetPasswordForm = this._fb.group(
      {
        newPassword: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
            ),
          ],
        ],
        confirmNewPassword: ['', [Validators.required]],
      },
      { validators: passwordMatchValidator }
    );
  }

  control(control: string) {
    return this.resetPasswordForm.get(control) as FormControl;
  }

  togglePasswordVisibility(field: 'password' | 'confirm') {
    this[field === 'password' ? 'showPassword' : 'showConfirmPassword'] =
      !this[field === 'password' ? 'showPassword' : 'showConfirmPassword'];
  }

  ResetPassword() {
    const id = this._activatedRoute.snapshot.params['id'];
    this._authService
      .resetPassword(this.resetPasswordForm.value, id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this._toastr.success('Password Changed Successfully', 'Success');
          this._router.navigate(['/auth']);
        },
        // error: (err) => console.log(err),
        // complete: () => console.log('complete'),
      });
  }
}
