import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { SESSION_ACCESS_TOKEN_KEY } from '../../const/sessionStorage'
import {
  GenerateVerifyCodeRequest,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
  VerifyAccountRequest,
  VerifyAccountResponse,
} from './types'

export const authApi = createApi({
  reducerPath: '/auth',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://api.anst-dev.ru' }),
  endpoints: builder => ({
    signUp: builder.mutation<SignUpResponse, SignUpRequest>({
      query: body => ({
        url: '/auth/signup',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization-Telegram': `Bearer ${sessionStorage.getItem(
            SESSION_ACCESS_TOKEN_KEY
          )}`,
        },
        body,
      }),
    }),

    signIn: builder.mutation<SignInResponse, SignInRequest>({
      query: body => ({
        url: '/auth/signin',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization-Telegram': `Bearer ${sessionStorage.getItem(
            SESSION_ACCESS_TOKEN_KEY
          )}`,
        },
        body,
      }),
    }),

    generateVerificationCode: builder.mutation<
      string,
      GenerateVerifyCodeRequest
    >({
      query: body => ({
        url: '/auth/code/send',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      }),
    }),

    verifyAccount: builder.mutation<
      VerifyAccountResponse,
      VerifyAccountRequest
    >({
      query: body => ({
        url: '/auth/code/verify',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        const { data } = await queryFulfilled

        sessionStorage.setItem(SESSION_ACCESS_TOKEN_KEY, data.accessToken)
      },
    }),
  }),
})

export const {
  useSignInMutation,
  useSignUpMutation,
  useVerifyAccountMutation,
  useGenerateVerificationCodeMutation,
} = authApi
