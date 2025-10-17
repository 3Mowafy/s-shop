import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@services';

export const credentialsInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  let authReq = req;
  const accessToken = authService.token || localStorage.getItem('accessToken');
  authReq = accessToken 
    ? req.clone({
        setHeaders: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      })
    : req.clone({ withCredentials: true });

  return next(authReq);
};
