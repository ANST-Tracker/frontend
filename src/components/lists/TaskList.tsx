import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useGetTasksByFilterQuery } from '../../store/task/taskApi'
import { Task as ITask, TaskStatus } from '../../store/task/types'
import { cn } from '../../utils/cn'
import { Loader } from '../Loader/Loader'
import { Task } from '../Task/Task'

interface Props {
  className?: string
  projectId: number
}

export const TaskList = ({ className, projectId }: Props) => {
  const [searchParams] = useSearchParams()
  const [page, setPage] = useState(0)

  const status = searchParams.get('status'),
    dateTo = searchParams.get('dateTo'),
    dateFrom = searchParams.get('dateFrom')

  const { data, isLoading, isFetching, isError } = useGetTasksByFilterQuery({
    projectIds: [projectId],
    ...(status && {
      status: status as TaskStatus,
    }),
    ...(dateTo &&
      dateFrom && {
        deadline: {
          dateTo,
          dateFrom,
        },
      }),
    page,
  })

  const [tasks, setTasks] = useState<ITask[]>([])
  const ulRef = useRef<HTMLUListElement | null>(null)

  useEffect(() => {
    if (!data || !data.length) return

    data.forEach(t => {
      const isExists = tasks.find(task => task.id === t.id)
      if (isExists) return

      setTasks(prev => [...prev, t])
    })
  }, [data, tasks])

  useEffect(() => {
    const ul = ulRef.current

    if (!ul) return

    const handler = (e: Event) => {
      if (isLoading || isFetching || !data?.length || data.length % 20 !== 0)
        return

      const scrollTop = (e.target as HTMLElement).scrollTop,
        scrollHeight = (e.target as HTMLElement).scrollHeight,
        clientHeight = (e.target as HTMLElement).clientHeight

      if (Math.abs(scrollHeight - scrollTop - clientHeight) <= 300) {
        setPage(page + 1)
      }
    }

    ul.addEventListener('scroll', handler)

    return () => ul.removeEventListener('scroll', handler)
  }, [data?.length, tasks.length, isLoading, isFetching, page])

  if (isError) return null
  if (isLoading || !data)
    return (
      <div className="px-4 flex items-center justify-center">
        <Loader className="[&>div]:bg-white" />
      </div>
    )

  return (
    <>
      <ul
        ref={ulRef}
        className={cn(
          'flex flex-col gap-y-4 max-h-[600px] overflow-y-auto py-[10px] mb-[5px]',
          className
        )}
      >
        {tasks.map(t => (
          <li key={t.id}>
            <Task
              onUpdateTask={data =>
                setTasks(prev =>
                  prev.map(t =>
                    t.id === data.id
                      ? {
                          ...t,
                          ...data,
                          deadline:
                            data.deadline === undefined
                              ? undefined
                              : t.deadline,
                        }
                      : t
                  )
                )
              }
              onDeleteTask={id =>
                setTasks(prev => prev.filter(t => t.id !== id))
              }
              projectId={projectId}
              {...t}
            />
          </li>
        ))}
      </ul>
    </>
  )
}
