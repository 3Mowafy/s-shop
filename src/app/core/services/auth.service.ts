import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

import { API_BASE_URL, AUTH_ENDPOINTS } from '@constants';
import { GeneralService } from './general.service';
import { ToastrService } from 'ngx-toastr';
import { AUTH_TOASTR } from '@constants';

import {
  ISignupSendData,
  ILoginSendData,
  IloginResponse,
  IVerifyCode,
  IVerifyCodeResponse,
  IResetPassword,
  IMessageResponse,
} from '@interfaces/auth';
import { IUser } from '@interfaces/users';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = signal<IUser | null>(null);
  isProfileLoaded = signal(false);
  accessToken = signal<string | null>(null);

  constructor(
    private _http: HttpClient,
    private _generalService: GeneralService<IUser>,
    private _toastr: ToastrService
  ) {}

  signUp(signupData: ISignupSendData) {
    return this._generalService.create(
      `${API_BASE_URL}${AUTH_ENDPOINTS.SIGNUP}`,
      signupData
    );
  }

  login(loginData: ILoginSendData) {
    return this._http
      .post<IloginResponse>(
        `${API_BASE_URL}${AUTH_ENDPOINTS.LOGIN}`,
        loginData,
        { withCredentials: true }
      )
      .pipe(
        tap((res: IloginResponse) => {
          this.accessToken.set(res.token);
          localStorage.setItem('accessToken', res.token);
          localStorage.setItem('refreshToken', res.refreshToken);

          this._toastr.success(
            AUTH_TOASTR.LOGIN_SUCCESS.message,
            AUTH_TOASTR.LOGIN_SUCCESS.title
          );
          this.loadProfile().subscribe({
            next: (res) => res,
            error: () => this.clearSession(),
          });
        })
      );
  }

  refreshToken() {
    const refresh = localStorage.getItem('refreshToken');
    return this._http
      .post(
        `${API_BASE_URL}${AUTH_ENDPOINTS.REFRESH_TOKEN}`,
        { refreshToken: refresh },
        { withCredentials: true }
      )
      .pipe(
        tap((res: any) => {
          localStorage.setItem('accessToken', res.token);
          if (res.newRefreshToken) {
            localStorage.setItem('refreshToken', res.newRefreshToken);
          }
          this.accessToken.set(res.token);
        })
      );
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1] || ''));
      const exp: number | undefined = payload?.exp;
      if (!exp) return false;
      const nowInSeconds = Math.floor(Date.now() / 1000);
      return exp <= nowInSeconds;
    } catch {
      return true;
    }
  }
  ensureFreshTokenBeforeRequest() {
    const token = this.token;
    if (!token) return of(null);
    if (this.isTokenExpired(token)) {
      return this.refreshToken();
    }
    return of(null);
  }

  logout() {
    return this._http
      .post<IMessageResponse>(`${API_BASE_URL}${AUTH_ENDPOINTS.LOGOUT}`, {})
      .pipe(
        tap(() => {
          this.clearSession();

          this._toastr.success(
            AUTH_TOASTR.LOGOUT_SUCCESS.message,
            AUTH_TOASTR.LOGOUT_SUCCESS.title
          );
        })
      );
  }

  forgotPassword(data: object, type: 'email' | 'phone') {
    return this._http.post<IMessageResponse>(
      `${API_BASE_URL}${AUTH_ENDPOINTS.FORGOT_PASSWORD(type)}`,
      data
    );
  }

  verifyCode(code: IVerifyCode) {
    return this._http.post<IVerifyCodeResponse>(
      `${API_BASE_URL}${AUTH_ENDPOINTS.VERIFY_CODE}`,
      code
    );
  }

  resetPassword(data: IResetPassword, id: string) {
    return this._http.put(
      `${API_BASE_URL}${AUTH_ENDPOINTS.RESET_PASSWORD(id)}`,
      data
    );
  }

  loadProfile() {
    if (this.isProfileLoaded()) return of(this.user());

    return this._http.get(`${API_BASE_URL}users/profile`).pipe(
      tap((res: any) => {
        this.user.set(res.data);
        this.isProfileLoaded.set(true);
      }),
      catchError((err) => {
        if (err?.status !== 401) {
          this.clearSession();
        }

        this.isProfileLoaded.set(true);
        return of(null);
      })
    );
  }

  get token() {
    return this.accessToken() || localStorage.getItem('accessToken');
  }

  clearSession() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.accessToken.set(null);
    this.user.set(null);
  }
}
