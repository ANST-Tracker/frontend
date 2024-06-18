import clockIcon from '../../assets/icons/clock.svg'
import deleteIcon from '../../assets/icons/delete.svg'

import {
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from '../../store/task/taskApi'
import { Task as ITask, TaskStatus } from '../../store/task/types'
import { cn } from '../../utils/cn'
import { showError } from '../../utils/showError'
import { Modal } from '../Modal/Modal'
import { UpdateTaskForm } from '../forms/UpdateTaskForm'

interface Props extends ITask {
  className?: string
  projectId: number
  onDeleteTask: (taskId: ITask['id']) => void
  onUpdateTask: (
    data: { id: ITask['id'] } & Partial<
      Pick<ITask, 'deadline' | 'status' | 'data'>
    >
  ) => void
}

export const Task = ({
  className,
  data,
  id,
  projectId,
  deadline,
  status,
  onDeleteTask,
  onUpdateTask,
}: Props) => {
  const [deleteTask, { isLoading }] = useDeleteTaskMutation()
  const [updateTaskStatus, { isLoading: updateLoading }] =
    useUpdateTaskMutation()

  const onTaskDelete = async () => {
    try {
      await deleteTask(id).unwrap()
      onDeleteTask(id)
    } catch (error) {
      showError(error)
    }
  }

  const onTaskUpdate = async () => {
    try {
      const newStatus = TaskStatus.BACKLOG
        ? TaskStatus.DONE
        : TaskStatus.BACKLOG
      await updateTaskStatus({
        id,
        data,
        status:
          status === TaskStatus.BACKLOG ? TaskStatus.DONE : TaskStatus.BACKLOG,
        ...(status === TaskStatus.DONE && { deadline: undefined }),
      })
      onUpdateTask({ id, status: newStatus })
    } catch (error) {
      showError(error)
    }
  }

  return (
    <Modal>
      <div
        className={cn(
          'rounded-lg flex items-center justify-start gap-x-4 py-1 px-4 cursor-pointer relative bg-white',
          className
        )}
      >
        {/*<label className='block w-[18px] h-[18px]'>*/}
        <Modal.Open
          renderTrigger={openModal => {
            return (
              <button
                onClick={openModal}
                className="border-none  absolute top-0 left-[52%] w-[95%] translate-x-[-52%] h-full"
              ></button>
            )
          }}
        />
        <input
          disabled={isLoading || updateLoading}
          type="checkbox"
          className="#efddf6 w-[18px] h-[18px] left-5 "
          checked={status === TaskStatus.DONE}
          onChange={onTaskUpdate}
        />

        <div className="flex flex-col gap-y-1">
          <span className="text-xl">{data}</span>
          <span className="flex items-center gap-x-1">
            {deadline && <img src={clockIcon} alt="deadline" />}
            <span>
              {deadline && (
                <>
                  {new Date(deadline).getDate().toString().padStart(2, '0')} /{' '}
                  {new Date(deadline).getMonth() + 1},
                </>
              )}
              {status}
            </span>
          </span>
        </div>
        <button
          disabled={isLoading}
          onClick={onTaskDelete}
          className="w-4 h-4 ml-auto cursor-pointer bg-none disabled:cursor-not-allowed z-10"
        >
          <img className="w-full h-full" src={deleteIcon} alt="Delete Task" />
        </button>
      </div>

      <Modal.Content
        renderContent={closeModal => (
          <UpdateTaskForm
            projectId={projectId}
            taskId={id}
            onActionEnd={data => {
              closeModal()
              if (!data) return
              onUpdateTask({
                id,
                ...data,
              })
            }}
          />
        )}
      />
    </Modal>
  )
}
