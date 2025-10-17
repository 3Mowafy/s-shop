import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@services';
import { AUTH_TOASTR } from '@constants';
import { ToastrService } from 'ngx-toastr';

export const roleGuard: CanActivateFn = (route, state) => {
  const { user } = inject(AuthService);
  const router = inject(Router);
  const toastr = inject(ToastrService);

  const role = user()?.role;

  if (role !== 'admin' && role !== 'SuperAdmin') {
    toastr.error(
      AUTH_TOASTR.ACCESS_DENIED.message,
      AUTH_TOASTR.ACCESS_DENIED.title
    );
    return router.createUrlTree(['/']);
  }

  return true;
};
