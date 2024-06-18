//import { NavLink } from 'react-router-dom'
import { cn } from '../../utils/cn'

import { FormEvent, useState } from 'react'
import toast from 'react-hot-toast'
import telegramImg from '../../assets/img/telegram.png'
import { useGenerateVerificationCodeMutation } from '../../store/auth/authApi'
import { showError } from '../../utils/showError'
import { Modal } from '../Modal/Modal'
import { VerifyCodeForm } from './VerifyCodeForm'

interface Props {
  className?: string
}

export const TwoFactorAuthForm = ({ className }: Props) => {
  const [generateVerificationCode, { isLoading }] =
    useGenerateVerificationCodeMutation()
  const [isIdentified, setIsIdentified] = useState(false)
  const [telegramId, setTelegramId] = useState('')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement,
      telegramId = (form['telegramId'] as HTMLInputElement).value

    if (!telegramId) {
      toast.error('Please provide telegram ID')
      return
    }

    try {
      await generateVerificationCode({ telegramId }).unwrap()
      setTelegramId(telegramId)
      setIsIdentified(true)

      form.reset()
    } catch (e) {
      showError(e)
    }
  }


  return (
    <>
      <form
        onSubmit={onSubmit}
        className={cn('py-14 px-10 bg-white rounded-[10px]', className)}
      >
        <fieldset disabled={isLoading} className="border-none p-0">
          <h1 className="text-5xl font-medium text-center mb-[115px]">
            Verify Account
          </h1>

          <div className="space-y-[30px] mb-16">
            <div>
              <span className="block mb-3 text-medium">Telegram ID</span>
              <input
                required
                type="text"
                placeholder="Renni103"
                className="text-xl bg-none pb-[2px] w-full border-b-[1px] border-b-black focus:outline-none"
                name="telegramId"
                pattern="^[A-Za-z0-9_]*$"
              />
            </div>
          </div>

          <button
            disabled={isLoading}
            className="rounded-[20px] w-full bg-white text-xl p-5 flex items-center justify-center gap-x-3 disabled:cursor-not-allowed border-[1px] border-black mb-5"
          >
            <img width={40} height={40} src={telegramImg} alt="telegram" />
            {isLoading ? 'Loading...' : 'Confirm your Telegram'}
          </button>

          <Modal>
            {isIdentified && (
              <Modal.Open
                renderTrigger={openModal => (
                  <button
                    disabled={isLoading}
                    className="mb-20"
                    onClick={openModal}
                  >
                    Open verify code menu
                  </button>
                )}
              ></Modal.Open>
            )}

            <Modal.Content
              opened={!!telegramId}
              renderContent={closeModal => (
                <VerifyCodeForm
                  onActionEnd={() => {
                    setTelegramId('')
                    closeModal()
                  }}
                  telegramId={telegramId}
                />
              )}
            />
          </Modal>
        </fieldset>
      </form>
    </>
  )
}
