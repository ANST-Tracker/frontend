import { NavLink, useNavigate } from 'react-router-dom'
import plusIcon from '../../assets/icons/plus.svg'
import logoutIcon from '../../assets/icons/projects/logout.svg'
import projectsIcon from '../../assets/icons/projects/projects.svg'
import settingsIcon from '../../assets/icons/settings.svg'
import logo from '../../assets/icons/sidebar-logo.svg'
import {
  LOCAL_ACCESS_TOKEN_KEY,
  LOCAL_REFRESH_TOKEN_KEY,
} from '../../const/localStorage'
import { cn } from '../../utils/cn'
import { Modal } from '../Modal/Modal'
import { CreateProjectForm } from '../forms/CreateProjectForm'
import { ProjectList } from '../lists/ProjectList'

interface Props {
  className?: string
}

export const Sidebar = ({ className }: Props) => {
  const navigate = useNavigate()

  const onLogout = () => {
    localStorage.removeItem(LOCAL_ACCESS_TOKEN_KEY)
    localStorage.removeItem(LOCAL_REFRESH_TOKEN_KEY)
    navigate('/')
  }

  return (
    <aside
      className={cn(
        'py-5 px-4 rounded-[10px] bg-white h-full max-w-[250px] w-full max-h-[850px] ',
        className
      )}
    >
      <div className="flex flex-col gap-y-[45px] h-full">
        <img height={24} width={150} src={logo} alt="ASNT Tracker" />
        <div>
          <NavLink
            className="flex items-center gap-x-2 aria-[current=page]:bg-[#d7beea] rounded-[10px] hover:bg-[#d7beea] transition-colors duration-300 ease px-2 py-[2px] mb-2 "
            to={'projects'}
            state={{ projectId: 8, projectName: 'Bucket' }}
          >
            <img width={24} height={24} src={projectsIcon} alt="projects" />
            <span className="text-xl text-[#b78dbb] capitalize">Projects</span>
          </NavLink>
          <ProjectList className="mb-2" />
          <Modal>
            <Modal.Open
              renderTrigger={openModal => (
                <button
                  className="flex items-center gap-x-2 px-4 w-full cursor-pointer bg-none font-bold"
                  onClick={openModal}
                >
                  <img
                    src={plusIcon}
                    width={16}
                    height={16}
                    alt="Create new project"
                  />
                  <span>Create new project</span>
                </button>
              )}
            />
            <Modal.Content
              renderContent={closeModal => (
                <CreateProjectForm onActionEnd={closeModal} />
              )}
            />
          </Modal>
        </div>
        <div className="mt-auto space-y-4 ">
          <NavLink
            to="settings"
            className="flex items-center gap-x-2 bg-none text-[#888888] font-medium aria-[current=page]:text-black"
          >
            <img width={24} height={24} src={settingsIcon} alt="Logout" />
            <span className="text-xl">Settings</span>
          </NavLink>
          <button
            onClick={onLogout}
            className="flex items-center gap-x-2 bg-none text-[#888888] font-medium"
          >
            <img width={24} height={24} src={logoutIcon} alt="Logout" />
            <span className="text-xl">Log out</span>
          </button>
        </div>
      </div>
    </aside>
  )
}
