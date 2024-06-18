import { Select } from '@headlessui/react'
import { ChangeEvent, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import sortIcon from '../../assets/icons/sort.svg'
import { TASK_STATUS } from '../../const/task'
import { TaskStatus } from '../../store/task/types'
import { cn } from '../../utils/cn'
import { Modal } from '../Modal/Modal'

interface Props {
  className?: string
  projectId: string
  projectName: string
}

export const TaskFilters = ({ className, projectId, projectName }: Props) => {
  const [filters, setFilters] = useState<{
    dateFrom: string
    dateTo: string
    status: TaskStatus | undefined
  }>({
    dateFrom: '',
    dateTo: '',
    status: undefined,
  })
  const [_, setSearchParams] = useSearchParams()

  const onDateChange =
    (type: 'dateFrom' | 'dateTo') => (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      const iso = new Date(value).toISOString()

      const date =
        iso.slice(0, iso.indexOf('T')) +
        ' ' +
        iso.slice(iso.indexOf('T') + 1, iso.indexOf('.'))

      setFilters(prev => ({ ...prev, [type]: date }))
    }

  const onStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, status: e.target.value as TaskStatus }))
  }

  const onSubmit = () => {
    const obj = Object.fromEntries(
      Object.entries(filters).filter(([_, val]) => !!val)
    )

    setSearchParams({
      ...obj,
      projectId,
      projectName,
    })

    setFilters({
      dateFrom: '',
      dateTo: '',
      status: undefined,
    })
  }

  return (
    <div className={cn('', className)}>
      <Modal>
        <Modal.Open
          renderTrigger={openModal => (
            <button className="cursor-pointer" onClick={openModal}>
              <img src={sortIcon} width={24} height={24} alt="sort" />
            </button>
          )}
        />
        <Modal.Content
          renderContent={closeModal => {
            return (
              <div className="rounded-[12px] p-5 bg-white flex flex-col gap-y-5 max-w-[450px]">
                <div className="flex items-center justify-between  gap-x-10 w-full">
                  <span className="capitalize text-xl">Date from</span>
                  <input
                    onChange={onDateChange('dateFrom')}
                    value={filters.dateFrom}
                    required
                    className="border-[1px] py-2 px-4 rounded-[10px] focus:outline-none select-none outline-none"
                    type="datetime-local"
                  />
                </div>

                <div className="flex items-center justify-between gap-x-10 w-full">
                  <span className="capitalize text-xl">Date to</span>
                  <input
                    onChange={onDateChange('dateTo')}
                    value={filters.dateTo}
                    required
                    className="border-[1px] py-2 px-4 rounded-[10px] focus:outline-none select-none outline-none"
                    type="datetime-local"
                  />
                </div>

                <div className="flex items-center justify-between w-full">
                  <span className="capitalize text-xl">Status</span>
                  <Select
                    onChange={onStatusChange}
                    value={filters.status}
                    className="w-[200px] px-4 py-2 rounded-[10px] bg-white border-[1px]"
                    aria-label="Project status"
                    required
                  >
                    {TASK_STATUS.map(({ label, value }) => (
                      <option key={label} value={value}>
                        {label}
                      </option>
                    ))}
                  </Select>
                </div>

                <button
                  onClick={() => {
                    onSubmit()
                    closeModal()
                  }}
                  className="bg-auth p-4 rounded-[12px] text-black font-bold "
                >
                  Apply filters
                </button>
              </div>
            )
          }}
        />
      </Modal>
    </div>
  )
}
