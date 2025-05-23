// types/api.ts

export interface RegisterResponse {
  success: boolean;
  userId: string;
  message?: string;
}

export interface LoginResponse {
  accessToken?: string;
  require2FA?: boolean;
  userId?: string;
  message?: string;
}

export interface Verify2FAResponse {
  accessToken?: string;
  message?: string;
}

export interface GenerateQRResponse {
  qrImage: string;
  otpauth_url: string;
  message?: string;
}
