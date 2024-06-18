import { Select } from '@headlessui/react'
import { useState } from 'react'
import { TASK_NOTIFICATION_TIME_TYPE } from '../../const/task'
import { PendingNotification, TimeType } from '../../store/task/types'
import { cn } from '../../utils/cn'

interface Props {
  className?: string
  onSetNotification: (notifications: PendingNotification) => void
}

export const AddNotification = ({ className, onSetNotification }: Props) => {
  const [notification, setNotification] = useState<PendingNotification>({
    amount: 0,
    timeType: TimeType.NANOSECONDS,
  })

  const onAddNotification = () => {
    if (notification.amount <= 0) return

    onSetNotification(notification)
    setNotification({ amount: 0, timeType: TimeType.NANOSECONDS })
  }

  return (
    <div className={cn('', className)}>
      <div className="flex gap-x-5  justify-between w-full">
        <span className="capitalize text-xl">Notification</span>
        <div className="flex flex-col gap-y-5">
          <input
            value={notification.amount}
            className="border-[1px] py-2 px-4 rounded-[10px] focus:outline-none select-none outline-none"
            placeholder="Amount"
            type="number"
            onChange={e =>
              setNotification(prev => ({
                ...prev,
                amount: parseInt(e.target.value),
              }))
            }
          />

          <Select
            className="w-[200px] px-4 py-2 rounded-[10px] bg-white border-[1px]"
            value={notification.timeType}
            aria-label="Project status"
            onChange={e =>
              setNotification(prev => ({
                ...prev,
                timeType: e.target.value as TimeType,
              }))
            }
          >
            {TASK_NOTIFICATION_TIME_TYPE.map(({ label, value }) => (
              <option key={label} value={value}>
                {label}
              </option>
            ))}
          </Select>
          <button
            disabled={notification.amount <= 0}
            onClick={onAddNotification}
            className="cursor-pointer rounded-[12px] bg-black text-white p-2 disabled:bg-black/40"
          >
            Add notification
          </button>
        </div>
      </div>
    </div>
  )
}
