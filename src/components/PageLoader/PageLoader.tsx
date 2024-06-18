import { cn } from '../../utils/cn'

interface Props {
  className?: string
}

export const PageLoader = ({ className }: Props) => {
  return (
    <div
      className={cn(
        'min-h-[100svh] flex items-center justify-center',
        className
      )}
    >
      <div className="flex flex-row gap-2">
        <div className="w-4 h-4 rounded-full bg-[#ead6f3] animate-bounce" />
        <div className="w-4 h-4 rounded-full bg-[#ead6f3] animate-bounce [animation-delay:-.3s]" />
        <div className="w-4 h-4 rounded-full bg-[#ead6f3] animate-bounce [animation-delay:-.5s]" />
      </div>
    </div>
  )
}
