import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { HAS_BEEN_REGISTERED } from '../../const/localStorage'
import { isServerError } from '../../guards/errors'
import { SignUpSchema, signUpSchema } from '../../schemas/signUpSchema'
import { useSignUpMutation } from '../../store/auth/authApi'
import { useAppDispatch } from '../../store/store'
import { addUser } from '../../store/user/userSlice'
import { cn } from '../../utils/cn'
import { showError } from '../../utils/showError'
import { Collapsible } from '../Collapsible/Collapsible'

interface Props {
  className?: string
}

export const SignUpForm = ({ className }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  })
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [signUp, { isLoading }] = useSignUpMutation()

  const onSubmit: SubmitHandler<SignUpSchema> = async (data: SignUpSchema) => {
    try {
      const deviceToken = uuidv4()
      const user = await signUp({ ...data, deviceToken }).unwrap()
      reset({ username: '', password: '', passwordConfirm: '', telegramId: '' })
      dispatch(addUser(user))
      localStorage.setItem(HAS_BEEN_REGISTERED, '1')
      navigate('/dashboard/projects?projectId=8&projectName=Bucket')
    } catch (e) {
      showError(e)
      if (isServerError(e) && e.status === 403) return navigate('/')
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('py-14 px-10 bg-white rounded-[10px]', className)}
    >
      <fieldset disabled={isLoading} className="border-none p-0">
        <h1 className="text-5xl font-medium mb-3">Create an account</h1>
        <span className="text-[#8d8d8d] text-xl block mb-[76px]">
          Manage your tasks with us
        </span>

        <div className="space-y-[30px] mb-16">
          <div>
            <span className="block mb-1 text-medium">Username</span>
            <input
              required
              {...register('username')}
              type="text"
              className="text-xl bg-none pb-[2px] w-full border-b-[1px] border-b-black focus:outline-none"
            />
            <Collapsible className="mt-1" collapsed={!!errors?.username}>
              <span className="text-red-500"> {errors.username?.message}</span>
            </Collapsible>
          </div>

          <div>
            <span className="block mb-1 text-medium">Telegram ID</span>
            <input
              required
              {...register('telegramId')}
              type="text"
              className="text-xl bg-none pb-[2px] w-full border-b-[1px] border-b-black focus:outline-none"
            />
            <Collapsible className="mt-1" collapsed={!!errors?.telegramId}>
              <span className="text-red-500">{errors.telegramId?.message}</span>
            </Collapsible>
          </div>

          <div>
            <span className="block mb-1 text-medium">Password</span>
            <input
              required
              {...register('password')}
              type="password"
              className="text-xl bg-none pb-[2px] w-full border-b-[1px] border-b-black focus:outline-none"
            />
            <Collapsible className="mt-1" collapsed={!!errors?.password}>
              <span className="text-red-500"> {errors.password?.message}</span>
            </Collapsible>
          </div>

          <div>
            <span className="block mb-1 text-medium">Confirm password</span>
            <input
              {...register('passwordConfirm')}
              type="password"
              required
              className="text-xl bg-none  pb-[2px] w-full border-b-[1px] border-b-black focus:outline-none"
            />
            <Collapsible className="mt-1" collapsed={!!errors?.passwordConfirm}>
              <span className="text-red-500">
                {errors.passwordConfirm?.message}
              </span>
            </Collapsible>
          </div>
        </div>

        <button
          disabled={isLoading}
          className="rounded-[20px] w-full bg-black text-white text-xl p-5 flex items-center justify-center mb-[30px] disabled:cursor-not-allowed"
        >
          {isLoading ? 'Loading...' : 'Create Account'}
        </button>

        <span className="flex items-center gap-x-3">
          Already have an account?
          <NavLink to="/sign-in" className="font-medium text-xl text-[#5e9357]">
            Sign in
          </NavLink>
        </span>
      </fieldset>
    </form>
  )
}
