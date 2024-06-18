import { cn } from '../../utils/cn'

interface Props {
  className?: string
}

export const Loader = ({ className }: Props) => {
  return (
    <div className={cn('flex flex-row gap-2', className)}>
      <div className="w-4 h-4 rounded-full bg-[#ead6f3] animate-bounce" />
      <div className="w-4 h-4 rounded-full bg-[#ead6f3] animate-bounce [animation-delay:-.3s]" />
      <div className="w-4 h-4 rounded-full bg-[#ead6f3] animate-bounce [animation-delay:-.5s]" />
    </div>
  )
}
