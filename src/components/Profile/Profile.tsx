import { useAppSelector } from '../../store/store'
import { getUser } from '../../store/user/userSlice'
import { cn } from '../../utils/cn'

interface Props {
  className?: string
}

export const Profile = ({ className }: Props) => {
  const user = useAppSelector(getUser)

  if (!user) return null

  return (
    <div className={cn('', className)}>
      <div className="flex flex-col gap-y-9">
        {user.firstName && user.lastName && (
          <span className="text-[28px] font-medium">
            {user.firstName} {user.lastName}
          </span>
        )}
        <span className="text-xl">ID Telegram: {user.telegramId}</span>
      </div>
    </div>
  )
}
