import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@services';
import { jwtDecode } from 'jwt-decode';
import {
  BehaviorSubject,
  catchError,
  filter,
  map,
  of,
  switchMap,
  take,
  throwError,
} from 'rxjs';

let isRefreshing = false;
const refreshToken$ = new BehaviorSubject<string | null>(null);

export const refreshTokenInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const authService = inject(AuthService);

  const handleWithToken = (token: string | null) => {
    const cloned = token
      ? req.clone({
          setHeaders: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        })
      : req.clone({ withCredentials: true });
    return next(cloned);
  };

  const isRefreshCall = req.url.includes('refresh');

  const isJwtExpired = (jwt: string | null): boolean => {
    if (!jwt) return false;
    try {
      const payload = jwtDecode<{ exp?: number }>(jwt);
      const exp = payload?.exp;
      if (!exp) return false;
      return Math.floor(Date.now() / 1000) >= exp;
    } catch {
      return true;
    }
  };

  const token = authService.token || null;
  const maybeRefresh$ = !isRefreshCall && isJwtExpired(token)
    ? (isRefreshing
        ? refreshToken$.pipe(
            filter((t) => t !== null),
            take(1)
          )
        : authService.refreshToken().pipe(
            map(() => authService.token || null),
            catchError((err) => {
              authService.clearSession();
              return throwError(() => err);
            })
          ))
    : of(token);

  return maybeRefresh$.pipe(
    // For cookie-based auth, we can send request as-is; handleWithToken keeps compatibility
    switchMap((newToken) => handleWithToken(newToken)),
    catchError((error: HttpErrorResponse) => {
      if (error.status !== 401) {
        return throwError(() => error);
      }

      // avoid infinite loop for refresh endpoint itself
      if (isRefreshCall) {
        authService.clearSession();
        return throwError(() => error);
      }

      if (!isRefreshing) {
        isRefreshing = true;
        refreshToken$.next(null);

        return authService.refreshToken().pipe(
          switchMap((res: any) => {
            isRefreshing = false;
            // persist new tokens if backend returns them
            if (res?.token) {
              localStorage.setItem('accessToken', res.token);
              authService.accessToken.set(res.token);
            }
            if (res?.newRefreshToken) {
              localStorage.setItem('refreshToken', res.newRefreshToken);
            }
            const latest = authService.token || localStorage.getItem('accessToken');
            refreshToken$.next(latest || null);
            return handleWithToken(latest || null);
          }),
          catchError((refreshErr) => {
            isRefreshing = false;
            authService.clearSession();
            return throwError(() => refreshErr);
          })
        );
      }

      // If a refresh is already in progress, queue the request until a new token is available
      return refreshToken$.pipe(
        filter((tkn) => tkn !== null),
        take(1),
        switchMap((tkn) => handleWithToken(tkn))
      );
    })
  );
};
