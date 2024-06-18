import { baseApi } from '../baseApi'
import {
  CreateProjectRequest,
  CreateProjectResponse,
  DeleteProjectResponse,
  GetProjectsResponse,
  UpdateProjectRequest,
  UpdateProjectResponse,
} from './types'

const projectApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getProjects: builder.query<GetProjectsResponse, null>({
      query: () => ({
        url: '/project/list',
      }),
      providesTags: ['project'],
    }),

    createProject: builder.mutation<
      CreateProjectResponse,
      CreateProjectRequest
    >({
      query: body => ({
        url: '/project',
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body,
      }),
      invalidatesTags: ['project'],
    }),

    updateProject: builder.mutation<
      UpdateProjectResponse,
      UpdateProjectRequest
    >({
      query: ({ id, name }) => ({
        url: `/project/${id}`,
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: { name },
      }),
      invalidatesTags: ['project'],
    }),

    deleteProject: builder.mutation<DeleteProjectResponse, number>({
      query: id => ({
        url: `/project/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['project'],
    }),
  }),
})

export const {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectApi
