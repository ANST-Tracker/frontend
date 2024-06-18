import { User } from '../user/types'

export interface SignUpRequest {
  username: string
  telegramId: string
  password: string
  passwordConfirm: string
  deviceToken: string
  firstName?: string
  lastName?: string
}

export interface SignUpResponse extends User {}

export interface SignInRequest {
  username: string
  password: string
  deviceToken: string
}

export interface SignInResponse {
  accessToken: string
  refreshToken: string
}

export interface VerifyAccountResponse {
  accessToken: string
}

export interface VerifyAccountRequest {
  telegramId: string
  code: string
}

export interface GenerateVerifyCodeRequest {
  telegramId: string
}
