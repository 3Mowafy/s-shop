import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { catchError, switchMap, throwError } from 'rxjs';

import { IErrorDetails } from '@interfaces/error';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const _toastr = inject(ToastrService);
  // Optional: could import and use AuthService here to trigger refresh on 401, but
  // we will handle 401 retry logic directly in AuthService callers.

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      // Keep showing messages for non-401 errors only
      if (err.status === 401) return throwError(() => err);
      if (err.error?.errors?.length) {
        _toastr.warning(
          `
          <hr class="mt-2">
          <ul class="ms-3 mt-2 list-disc">
          ${err.error.errors
            .map((e: IErrorDetails) => `<li>${e.msg}</li>`)
            .join('')}
          </ul>
          `,
          'Validation Error',
          { enableHtml: true }
        );
      } else {
        _toastr.error(err.error.message || 'Unexpected error', 'Server Error');
      }

      return throwError(() => err);
    })
  );
};
