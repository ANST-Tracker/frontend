import { useEffect } from 'react'
import { useGetProjectsQuery } from '../../store/project/projectApi'
import { cn } from '../../utils/cn'
import { showError } from '../../utils/showError'
import { Loader } from '../Loader/Loader'
import { Project } from '../Project/Project'

interface Props {
  className?: string
}

export const ProjectList = ({ className }: Props) => {
  const { data, isLoading, isError, error } = useGetProjectsQuery(null)

  useEffect(() => {
    if (isError) {
      showError(error)
    }
  }, [isError])

  if (isLoading || !data)
    return (
      <div className="flex items-center justify-center">
        <Loader className="[&>div]:bg-white" />
      </div>
    )

  if (isError) return null

  return (
    <div
      className={cn(
        'flex flex-col gap-y-2 max-h-[300px] overflow-y-auto',
        className
      )}
    >
      {data.map(p => (
        <Project key={p.id} {...p} />
      ))}
    </div>
  )
}
