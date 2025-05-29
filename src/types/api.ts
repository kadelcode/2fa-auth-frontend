// types/api.ts

export interface RegisterResponse {
  success: boolean;
  userId: string;
  message?: string;
}

export interface LoginResponse {
  token?: string;
  require2FA?: boolean;
  userId?: string;
  message?: string;
}

export interface Verify2FAResponse {
  token?: string;
  message?: string;
}

export interface GenerateQRResponse {
  qrCode: string;
  otpauth_url: string;
  message?: string;
}
