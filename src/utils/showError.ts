import toast from 'react-hot-toast'
import { isServerError } from '../guards/errors'

export const showError = (err: unknown, cb?: () => void) => {
  if (isServerError(err)) {
    toast.error(err.data?.message || 'Something went wrong')
    cb?.()
    return
  }

  toast.error('Something went wrong')
}
