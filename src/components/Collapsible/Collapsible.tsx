import { Dispatch, ReactElement, ReactNode, useState } from 'react'
import { cn } from '../../utils/cn'

interface Props {
  className?: string
  collapsed?: boolean
  renderTrigger?: (
    fn: Dispatch<React.SetStateAction<boolean>>,
    isCollapsed: boolean
  ) => ReactElement
  children: ReactNode
}

export const Collapsible = ({
  className,
  collapsed,
  renderTrigger,
  children,
}: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <>
      {renderTrigger?.(setIsCollapsed, isCollapsed)}
      <div
        className={cn(
          'grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease [&>*]:min-h-0',
          {
            'grid-rows-[1fr]': collapsed ?? isCollapsed,
          },
          className
        )}
      >
        {children}
      </div>
    </>
  )
}
