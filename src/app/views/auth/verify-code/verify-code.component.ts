import { NgFor } from '@angular/common';
import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@services';
import { AuthFormLayoutComponent } from '@VAuth/auth-form-layout/auth-form-layout.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verify-code',
  imports: [ReactiveFormsModule, NgFor, AuthFormLayoutComponent],
  templateUrl: './verify-code.component.html',
})
export class VerifyCodeComponent {
  otpLength = new Array(6);
  verifyCodeForm!: FormGroup;
  code: string[] = [];

  @ViewChildren('otp') otpInputs!: QueryList<ElementRef>;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _toastr: ToastrService
  ) {
    this.verifyCodeForm = this._fb.group({
      resetCode: ['', Validators.required],
    });
  }

  onInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    this.code[index] = value;

    if (value && index < this.otpLength.length - 1) {
      this.otpInputs.toArray()[index + 1].nativeElement.focus();
    }

    if (value.length > 1) {
      input.value = value.charAt(0);
    }
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    const input = event.target as HTMLInputElement;

    if (event.key === 'Backspace' && !input.value && index > 0) {
      this.otpInputs.toArray()[index - 1].nativeElement.focus();
    }
  }

  verifyCode() {
    this.verifyCodeForm.value.resetCode = this.code.join('');

    this._authService.verifyCode(this.verifyCodeForm.value).subscribe({
      next: (res) => {
        this._toastr.success(`Successful Code`, 'Success Code');
        this._router.navigate([`../reset-password/${res.id}`], {
          relativeTo: this._activatedRoute,
        });
      },
      // error: (err)=> console.log(err),
      // complete: ()=> console.log('complete')
    });
  }
}
