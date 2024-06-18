import { Project as IProject } from '../../store/project/types'
import { cn } from '../../utils/cn'

import { NavLink } from 'react-router-dom'
import plusIcon from '../../assets/icons/plus.svg'
import { useDeleteProjectMutation } from '../../store/project/projectApi'
import { showError } from '../../utils/showError'

interface Props extends IProject {
  className?: string
}

export const Project = ({ className, id, name }: Props) => {
  const [deleteProject, { isLoading }] = useDeleteProjectMutation()

  const onDeleteProject = async () => {
    try {
      await deleteProject(id).unwrap()
    } catch (error) {
      showError(error)
    }
  }

  return (
    <div
      className={cn(
        'pl-4 flex items-center justify-between relative',
        className
      )}
    >
      <NavLink
        to={`/dashboard/projects?projectId=${id}&projectName=${name}`}
        state={{ projectId: id, projectName: name }}
        className="absolute left-0 top-0 w-full h-full cursor-pointer"
      ></NavLink>
      <span className="font-bold text-[#4a304d] focus:outline-none block  text-center">
        {name}
      </span>
      {name.toLowerCase() !== 'bucket' && (
        <button
          disabled={isLoading}
          onClick={onDeleteProject}
          className="bg-none w-4 h-4 block ml-auto cursor-pointer mr-4"
        >
          <img
            src={plusIcon}
            alt="Delete project"
            className="w-full h-full rotate-45"
          />
        </button>
      )}
    </div>
  )
}
