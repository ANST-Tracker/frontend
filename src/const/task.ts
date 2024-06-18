import { TaskStatus, TimeType } from '../store/task/types'

export const TASK_STATUS: { label: string; value: TaskStatus }[] = [
  {
    label: 'backlog',
    value: TaskStatus.BACKLOG,
  },
  {
    label: 'todo',
    value: TaskStatus.TODO,
  },
  {
    label: 'in progress',
    value: TaskStatus.IN_PROGRESS,
  },
  {
    label: 'done',
    value: TaskStatus.DONE,
  },
]

export const TASK_NOTIFICATION_TIME_TYPE: { label: string; value: TimeType }[] =
  [
    {
      label: 'Minutes',
      value: TimeType.MINUTES,
    },
    {
      label: 'Hours',
      value: TimeType.HOURS,
    },
    {
      label: 'Days',
      value: TimeType.DAYS,
    },
  ]
