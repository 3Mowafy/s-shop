const BASE_AUTH = 'auth/';

export const AUTH_ENDPOINTS = {
  SIGNUP: `${BASE_AUTH}signup`,

  LOGIN: `${BASE_AUTH}login`,

  REFRESH_TOKEN: `${BASE_AUTH}refresh`,

  FORGOT_PASSWORD: (type: 'email' | 'phone') =>
    `${BASE_AUTH}forgotPassword/${type}`,

  VERIFY_CODE: `${BASE_AUTH}verifyCode`,

  RESET_PASSWORD: (id: string) => `${BASE_AUTH}resetPassword/${id}`,

  LOGOUT: `${BASE_AUTH}logout`,
};
