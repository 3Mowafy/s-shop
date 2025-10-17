import { Routes } from '@angular/router';

import { AuthComponent } from '@layouts/auth/auth.component';
import { LoginComponent } from '@VAuth/login/login.component';
import { SignUpComponent } from '@VAuth/sign-up/sign-up.component';
import { VerifyCodeComponent } from '@VAuth/verify-code/verify-code.component';
import { ForgotPasswordComponent } from '@VAuth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from '@VAuth/reset-password/reset-password.component';
import { authGuard } from 'core/guards/auth.guard';

export const authRoutes: Routes = [
  {
    path: '',
    component: AuthComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'signin',
        pathMatch: 'full',
      },
      {
        path: 'signin',
        component: LoginComponent,
        title: 'Sign In | S-Shop',
      },
      {
        path: 'signup',
        component: SignUpComponent,
        title: 'Sign Up | S-Shop',
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        title: 'Forgot Password | S-shop',
      },
      {
        path: 'verify-code',
        component: VerifyCodeComponent,
        title: 'Verify Code | S-shop',
      },
      {
        path: 'reset-password/:id',
        component: ResetPasswordComponent,
        title: 'Reset Password | S-shop',
      },
    ],
  },
];
