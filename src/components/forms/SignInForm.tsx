import { FormEvent } from 'react'
import toast from 'react-hot-toast'
import { NavLink, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import {
  LOCAL_ACCESS_TOKEN_KEY,
  LOCAL_REFRESH_TOKEN_KEY,
} from '../../const/localStorage'
import { isServerError } from '../../guards/errors'
import { useSignInMutation } from '../../store/auth/authApi'
import { cn } from '../../utils/cn'
import { showError } from '../../utils/showError'

interface Props {
  className?: string
}

export const SignInForm = ({ className }: Props) => {
  const [signIn, { isLoading }] = useSignInMutation()
  const navigate = useNavigate()

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement,
      username = (form['username'] as HTMLInputElement).value,
      password = (form['password'] as HTMLInputElement).value

    if (!username || !password) {
      toast.error('Please provide username and password')
      return
    }

    const deviceToken = uuidv4()
    try {
      const { accessToken, refreshToken } = await signIn({
        deviceToken,
        password,
        username,
      }).unwrap()

      localStorage.setItem(LOCAL_ACCESS_TOKEN_KEY, accessToken)
      localStorage.setItem(LOCAL_REFRESH_TOKEN_KEY, refreshToken)
      navigate('/dashboard/projects?projectId=8&projectName=Bucket')
    } catch (e) {
      if (isServerError(e) && e.status === 403) return navigate('/')
      if (
        isServerError(e) &&
        e.data?.message
          .toLocaleLowerCase()
          .includes('trying to login user with tgid')
      )
        return navigate('/')
      showError(e)
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn('py-14 px-10 bg-white rounded-[10px]', className)}
    >
      <fieldset disabled={isLoading} className="border-none p-0">
        <h1 className="text-5xl font-medium mb-3 text-center">Sign In</h1>

        <div className="space-y-[30px] mb-16">
          <div>
            <span className="block mb-1 text-medium">Username</span>
            <input
              required
              type="text"
              name="username"
              className="text-xl bg-none pb-[2px] w-full border-b-[1px] border-b-black focus:outline-none"
            />
          </div>

          <div>
            <span className="block mb-1 text-medium">Password</span>
            <input
              required
              type="password"
              name="password"
              className="text-xl bg-none pb-[2px] w-full border-b-[1px] border-b-black focus:outline-none"
            />
          </div>
        </div>

        <button
          disabled={isLoading}
          className="rounded-[20px] w-full bg-black text-white text-xl p-5 flex items-center justify-center mb-[30px] disabled:cursor-not-allowed"
        >
          {isLoading ? 'Loading...' : 'Sign in'}
        </button>

        <span className="flex items-center gap-x-3">
          Don't have an account?
          <NavLink to="/sign-up" className="font-medium text-xl text-[#5e9357]">
            Register
          </NavLink>
        </span>
      </fieldset>
    </form>
  )
}
