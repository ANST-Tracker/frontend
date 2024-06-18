import { Profile } from '../../components/Profile/Profile'
import { cn } from '../../utils/cn'

interface Props {
  className?: string
}

export const AccountSettings = ({ className }: Props) => {
  return (
    <main className={cn('', className)}>
      <h1 className="text-[28px] font-medium mb-10">Account settings</h1>
      <Profile />
    </main>
  )
}
