import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../../store/store'
import { getUser } from '../../store/user/userSlice'

export const ProtectedPage = () => {
  const user = useAppSelector(getUser)

  return user ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to="/" />
  )
}
