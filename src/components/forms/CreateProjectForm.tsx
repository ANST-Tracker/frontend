import { FormEvent } from 'react'
import { useCreateProjectMutation } from '../../store/project/projectApi'

import toast from 'react-hot-toast'
import { cn } from '../../utils/cn'
import { showError } from '../../utils/showError'

interface Props {
  className?: string
  onActionEnd?: () => void
}

export const CreateProjectForm = ({ className, onActionEnd }: Props) => {
  const [createProject, { isLoading }] = useCreateProjectMutation()

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement,
      name = (form['projectName'] as HTMLInputElement).value

    if (!name.trim()) {
      toast.error('Project name cannot be empty')
      return
    }

    try {
      await createProject({ name })
      onActionEnd?.()
    } catch (error) {
      showError(error)
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn('py-6 px-4 bg-white rounded-[10px] w-[500px]', className)}
    >
      <h1 className="font-medium text-[28px] mb-8">Create project:</h1>

      <fieldset className="p-0 bg-none border-none" disabled={isLoading}>
        <div className="px-4 ">
          <label className=" rounded-[10px] px-3 w-full border-[1px] border-[#b0b0b0] block mb-14 pb-1">
            <span className="text-[#6d6d6d] capitalize block">Name</span>
            <input
              required
              type="text"
              className="border-none bg-none focus:outline-none"
              name="projectName"
            />
          </label>
        </div>

        <div className="flex items-center justify-center">
          <button
            disabled={isLoading}
            className="disabled:cursor-not-allowed bg-none py-4 px-8 flex items-center justify-center bg-[#a377a8] rounded-lg text-white font-medium"
          >
            {!isLoading ? 'Create project' : 'Loading...'}
          </button>
        </div>
      </fieldset>
    </form>
  )
}
