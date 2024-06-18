import { baseApi } from '../baseApi'
import { User } from './types'

const userApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getUser: builder.query<User, null>({
      query: () => '/user/current',
    }),

    deleteUser: builder.mutation<User, null>({
      query: () => ({
        url: '/user/current',
        method: 'DELETE',
      }),
    }),
  }),
})

export const { useLazyGetUserQuery, useDeleteUserMutation } = userApi
