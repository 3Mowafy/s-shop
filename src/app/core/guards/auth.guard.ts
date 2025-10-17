import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@services';
import { AUTH_TOASTR } from '@constants';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const token = inject(AuthService).token;
  const router = inject(Router);
  const toastr = inject(ToastrService);

  if (token) {
    toastr.info(
      AUTH_TOASTR.ALREADY_LOGGED_IN.message,
      AUTH_TOASTR.ALREADY_LOGGED_IN.title
    );
    return router.createUrlTree(['/']);
  }
  return true;
};
