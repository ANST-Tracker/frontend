import toast from 'react-hot-toast'
import { useSearchParams } from 'react-router-dom'
import plusIcon from '../../assets/icons/plus.svg'
import { Modal } from '../../components/Modal/Modal'
import { TaskFilters } from '../../components/TaskFilters/TaskFilters'
import { CreateTaskForm } from '../../components/forms/CreateTaskForm'
import { TaskList } from '../../components/lists/TaskList'
import { useUpdateProjectMutation } from '../../store/project/projectApi'
import { cn } from '../../utils/cn'
import { showError } from '../../utils/showError'

interface Props {
  className?: string
}

export const ProjectsPage = ({ className }: Props) => {
  const [updateProject, { isLoading }] = useUpdateProjectMutation()
  const [searchParams] = useSearchParams()

  const projectId = searchParams.get('projectId')
  const projectName = searchParams.get('projectName')

  if (!projectId) return null

  const onUpdateProject = async (e: React.FocusEvent<HTMLHeadElement>) => {
    if (projectName.toLowerCase() === 'bucket') {
      e.target.innerText = 'Bucket'
      return
    }

    const name = e.target.innerText
    if (name === projectName) return
    if (!name.trim()) {
      toast.error('Project name cannot be empty')
      e.target.innerText = projectName
      return
    }

    try {
      await updateProject({ id: projectId, name }).unwrap()
    } catch (error) {
      e.target.innerText = name
      showError(error)
    }
  }

  return (
    <main className={cn('', className)}>
      <div className="flex items-center justify-between gap-x-5 mb-8 w-full ">
        <h1
          suppressContentEditableWarning
          onBlur={onUpdateProject}
          contentEditable
          className="text-3xl capitalize"
        >
          {projectName}
        </h1>
        <TaskFilters projectId={projectId} projectName={projectName!} />
      </div>

      <Modal>
        <Modal.Open
          renderTrigger={openModal => (
            <button
              disabled={isLoading}
              onClick={openModal}
              className="bg-white p-4 w-full flex items-center font-bold rounded-xl cursor-pointer mb-10 gap-x-5"
            >
              <img src={plusIcon} width={16} height={16} alt="Create task" />
              <span>Create new Task</span>
            </button>
          )}
        />
        <Modal.Content
          renderContent={closeModal => (
            <CreateTaskForm
              onActionEnd={closeModal}
              projectId={Number(projectId)}
            />
          )}
        />
      </Modal>
      <TaskList key={projectId} projectId={Number(projectId)} />
    </main>
  )
}
