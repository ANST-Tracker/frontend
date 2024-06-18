import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'

import { Mutex } from 'async-mutex'
import {
  LOCAL_ACCESS_TOKEN_KEY,
  LOCAL_REFRESH_TOKEN_KEY,
} from '../const/localStorage'
import { deleteUser } from './user/userSlice'

const mutex = new Mutex()

export const baseQuery = fetchBaseQuery({
  baseUrl: 'http://api.anst-dev.ru',
  //credentials: 'same-origin',

  prepareHeaders: headers => {
    const token = localStorage.getItem(LOCAL_ACCESS_TOKEN_KEY)

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    return headers
  },
})

const customBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)

  if (
    result.meta?.request.url.includes('signup') ||
    result.meta?.request.url.includes('signin') ||
    result.meta?.request.url.includes('code/verify') ||
    result.meta?.request.url.includes('code/send')
  )
    return result

  if (result.error?.status === 403) {
    localStorage.removeItem(LOCAL_ACCESS_TOKEN_KEY)
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()

      try {
        const refreshResult = await baseQuery(
          {
            url: '/auth/refresh',
            method: 'POST',
            body: {
              refreshToken: localStorage.getItem(LOCAL_REFRESH_TOKEN_KEY),
            },
            headers: {
              //  Authorization: `Bearer ${localStorage.getItem(
              //    LOCAL_REFRESH_TOKEN_KEY
              //  )}`,
              'Content-Type': 'application/json',
            },
          },
          api,
          extraOptions
        )

        if (refreshResult.error?.status === 403) {
          api.dispatch(deleteUser())
          //  window.location.href = '/'
        }

        if (
          refreshResult.data &&
          typeof refreshResult.data === 'object' &&
          'refreshToken' in refreshResult.data &&
          'accessToken' in refreshResult.data
        ) {
          localStorage.setItem(
            LOCAL_ACCESS_TOKEN_KEY,
            refreshResult.data.accessToken as string
          )

          localStorage.setItem(
            LOCAL_REFRESH_TOKEN_KEY,
            refreshResult.data.refreshToken as string
          )
          result = await baseQuery(args, api, extraOptions)
        } else {
          api.dispatch(deleteUser())
          //  window.location.href = '/'
        }
      } finally {
        release()
      }
    } else {
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }

  return result
}

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: customBaseQuery,
  endpoints: () => ({}),
  tagTypes: ['project', 'task'],
})
