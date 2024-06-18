import { useLayoutEffect } from 'react'
import toast from 'react-hot-toast'
import { Outlet, useNavigate } from 'react-router-dom'
import { PageLoader } from '../components/PageLoader/PageLoader'
import { Sidebar } from '../components/Sidebar/Sidebar'
import { useAppDispatch, useAppSelector } from '../store/store'
import { useLazyGetUserQuery } from '../store/user/userApi'
import { addUser, getUser } from '../store/user/userSlice'
import { showError } from '../utils/showError'
import { cn } from '../utils/cn'

interface Props {
  className?: string
}

export const Dashboard = ({ className }: Props) => {
  const [getCurrentUser, { isLoading, data }] = useLazyGetUserQuery()
  const user = useAppSelector(getUser)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useLayoutEffect(() => {
    if (user) return
    ;(async () => {
      try {
        const { data } = await getCurrentUser(null)
        if (!data) {
          toast.error('Something went wrong')
          return navigate('/')
        }

        dispatch(addUser(data))
      } catch (error) {
        showError(error)
      }
    })()
  }, [user])

  if (!user && (!data || isLoading)) return <PageLoader />

  return (
    <div className={cn("w-full min-h-[100svh] bg-auth  py-10 px-5", className)}>
      <div className="flex gap-x-5 min-h-[100svh]">
        <Sidebar className="h-[780px] min-w-[250px]" />
        <main className="grow">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
