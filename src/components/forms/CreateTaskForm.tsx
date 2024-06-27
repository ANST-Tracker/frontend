import { zodResolver } from '@hookform/resolvers/zod'

import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  CreateTaskSchema,
  createTaskSchema,
} from '../../schemas/createTaskSchema'
import { useCreateTaskMutation } from '../../store/task/taskApi'
import { PendingNotification } from '../../store/task/types'
import { cn } from '../../utils/cn'
import { showError } from '../../utils/showError'
import { AddNotification } from '../AddNotification/AddNotification'

interface Props {
  className?: string
  projectId: number
  onActionEnd?: () => void
}

export const CreateTaskForm = ({
  className,
  projectId,
  onActionEnd,
}: Props) => {
  const [createTask, { isLoading }] = useCreateTaskMutation()
  const [notifications, setNotifications] = useState<PendingNotification[]>([])
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTaskSchema>({
    resolver: zodResolver(createTaskSchema),
  })

  if (errors) {
    console.log(errors)
  }

  console.log(notifications)

  const onSubmit: SubmitHandler<CreateTaskSchema> = async ({
    deadline,
    description,
    data,
  }) => {
    let date: string

    if (deadline) {
      const iso = deadline.toISOString()

      date =
        iso.slice(0, iso.indexOf('T')) +
        ' ' +
        iso.slice(iso.indexOf('T') + 1, iso.indexOf('.'))
    }

    try {
      await createTask({
        projectId,
        description,
        data,
        ...(deadline && { deadline: date! }),
        ...(notifications.length && {
          pendingNotifications: notifications,
        }),
      }).unwrap()
      onActionEnd?.()
    } catch (error) {
      showError(error)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('py-6 px-4 bg-white rounded-[10px] w-[500px]', className)}
    >
      <h1 className="font-medium text-[28px] mb-8">Task:</h1>

      <fieldset className="p-0 bg-none border-none" disabled={isLoading}>
        <div className="px-4 ">
          <label className=" rounded-[10px] px-3 w-full border-[1px] border-[#b0b0b0] block mb-14 pb-1">
            <span className="text-[#6d6d6d] capitalize block">Name</span>
            <input
              required
              {...register('data')}
              type="text"
              className="border-none bg-none focus:outline-none"
            />
          </label>

          <span className="text-xl block mb-4 capitalize">Description</span>
          <textarea
            {...register('description')}
            className="rounded-[10px] px-2 py-4 bg-[#eff6ed] mb-14 focus:outline-none block w-full resize-none "
            placeholder="optional"
          />

          <div className="flex flex-col gap-y-9 w-[350px] mb-14">
            <div className="flex items-center justify-between w-full">
              <span className="capitalize text-xl">Deadline</span>
              <input
                className="border-[1px] py-2 px-4 rounded-[10px] focus:outline-none select-none outline-none"
                {...register('deadline')}
                type="datetime-local"
              />
            </div>
          </div>

          <AddNotification
            className="flex flex-col gap-y-9 w-[350px] mb-14"
            onSetNotification={notification => {
              setNotifications(prev => [...prev, notification])
            }}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            disabled={isLoading}
            className="disabled:cursor-not-allowed bg-none py-4 px-8 flex items-center justify-center bg-[#a377a8] rounded-lg text-white font-medium"
          >
            {!isLoading ? 'Create task' : 'Loading...'}
          </button>
        </div>
      </fieldset>
    </form>
  )
}
