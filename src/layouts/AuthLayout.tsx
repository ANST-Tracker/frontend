import { Outlet, useLocation } from 'react-router-dom'
import twoFactorBg from '../assets/icons/auth/2-factor.svg'
import signInBg from '../assets/icons/auth/sign-in.svg'
import signUpBg from '../assets/icons/auth/sign-up.svg'
import logo from '../assets/img/logo.png'
import { cn } from '../utils/cn'

interface Props {
  className?: string
}

export const AuthLayout = ({ className }: Props) => {
  const location = useLocation()
  const path = location.pathname

  const img = path.includes('sign-in')
    ? signInBg
    : path.includes('sign-up')
    ? signUpBg
    : twoFactorBg

  return (
    <div
      className={cn('py-10 px-20 bg-auth w-full min-h-[100svh] ', className)}
    >
      <img className={'block mb-2'} src={logo} width={480} height={80} alt="" />
      <div
        className={cn('flex gap-x-40 ', {
          'flex-row-reverse justify-between': path.includes('sign-in'),
          'mt-20': !path.includes('sign-up'),
        })}
      >
        <div
          className={cn('relative max-w-[700px] w-full', {
            'translate-y-20': path.includes('sign-in'),
          })}
        >
          <img src={img} alt="img" className="absolute inset-0" />
        </div>

        <div className="w-[560px]">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
