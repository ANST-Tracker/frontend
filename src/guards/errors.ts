export interface ServerError extends Error {
  status: number
  data: {
    timestamp: number
    message: string
    type: string
  } | null
}

export const isServerError = (err: unknown): err is ServerError =>
  (err as ServerError).data !== undefined
