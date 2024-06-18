import { useEffect, useState } from 'react'
import OTPInput from 'react-otp-input'
import { useNavigate } from 'react-router-dom'
import { HAS_BEEN_REGISTERED } from '../../const/localStorage'
import { useVerifyAccountMutation } from '../../store/auth/authApi'
import { cn } from '../../utils/cn'
import { showError } from '../../utils/showError'

interface Props {
  className?: string
  telegramId: string
  codeLength?: number
  onActionEnd?: () => void
}

export const VerifyCodeForm = ({
  className,
  codeLength = 5,
  telegramId,
  onActionEnd,
}: Props) => {
  const [otp, setOtp] = useState('')
  const [verifyAccount, { isLoading }] = useVerifyAccountMutation()
  const navigate = useNavigate()

  useEffect(() => {
    if (otp.length < codeLength) return
    ;(async () => {
      try {
        await verifyAccount({ code: otp, telegramId }).unwrap()
        const hasBeenRegistered = localStorage.getItem(HAS_BEEN_REGISTERED)

        navigate(hasBeenRegistered ? '/sign-in' : '/sign-up')
      } catch (e) {
        showError(e)
      } finally {
        onActionEnd?.()
      }
    })()
  }, [otp, codeLength])

  return (
    <form className={cn('py-14 px-5 bg-white rounded-[10px]', className)}>
      <fieldset className="p-0 m-0 border-none" disabled={isLoading}>
        <span className="flex mb-5 items-center font-bold justify-center empty:hidden">
          {telegramId}
        </span>
        <OTPInput
          shouldAutoFocus
          value={otp}
          onChange={setOtp}
          numInputs={5}
          containerStyle={{
            width: '300px',
            height: '50px',
            columnGap: '10px',
            display: 'grid',
            gridTemplateColumns: 'repeat(5,1fr)',
          }}
          inputStyle={{
            width: '100%',
            height: '100%',
            border: '1px solid black',
          }}
          //renderSeparator={<span>-</span>}
          renderInput={props => <input {...props} />}
        />
      </fieldset>
    </form>
  )
}
