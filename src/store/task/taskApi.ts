import { baseApi } from '../baseApi'
import {
  CreateTaskRequest,
  CreateTaskResponse,
  DeleteTaskResponse,
  GetTasksByFilterRequest,
  GetTasksByFilterResponse,
  GetTasksRequest,
  GetTasksResponse,
  Task,
  UpdateTaskRequest,
  UpdateTaskResponse,
} from './types'

const taskApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getTasks: builder.query<GetTasksResponse, GetTasksRequest>({
      query: params => ({
        url: '/task/list',
        params: params,
      }),
      providesTags: ['task'],
    }),

    getTasksByFilter: builder.query<
      GetTasksByFilterResponse,
      GetTasksByFilterRequest
    >({
      query: filters => ({
        url: '/task/find-by-filter',
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: filters,
      }),
      providesTags: ['task'],
    }),

    getTask: builder.query<Task, number>({
      query: id => ({
        url: `/task/${id}`,
      }),
      providesTags: ['task'],
    }),

    createTask: builder.mutation<CreateTaskResponse, CreateTaskRequest>({
      query: ({
        projectId,
        data,
        deadline,
        description,
        pendingNotifications,
      }) => {
        return {
          url: `/task/${projectId}`,
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: { data, deadline, description, pendingNotifications },
        }
      },
      invalidatesTags: ['task'],
    }),

    updateTask: builder.mutation<UpdateTaskResponse, UpdateTaskRequest>({
      query: ({
        id,
        updatedProjectId,
        data,
        deadline,
        description,
        status,
        pendingNotifications,
      }) => ({
        url: `/task/${id}`,
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: {
          data,
          deadline,
          description,
          status,
          updatedProjectId,
          pendingNotifications,
        },
      }),
      invalidatesTags: ['task'],
    }),

    deleteTask: builder.mutation<DeleteTaskResponse, number>({
      query: id => ({
        url: `/task/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['task'],
    }),
  }),
})

export const {
  useGetTasksQuery,
  useGetTasksByFilterQuery,
  useLazyGetTasksByFilterQuery,
  useGetTaskQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApi
