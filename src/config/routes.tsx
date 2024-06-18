import { createBrowserRouter } from 'react-router-dom'
import { SignInForm } from '../components/forms/SignInForm'
import { SignUpForm } from '../components/forms/SignUpForm'
import { TwoFactorAuthForm } from '../components/forms/TwoFactorAuthForm'
import { AuthLayout } from '../layouts/AuthLayout'
import { Dashboard } from '../layouts/Dashboard'
import { AccountSettings } from '../pages/AccountSettingsPage/AccountSettingsPage'
import { ProjectsPage } from '../pages/ProjectsPage/ProjectsPage'
import { ProtectedPage } from '../pages/ProtectedPage/ProtectedPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: 'sign-up',
        element: <SignUpForm />,
      },
      {
        path: 'sign-in',
        element: <SignInForm />,
      },
      {
        element: <TwoFactorAuthForm className="w-[600px]" />,
        index: true,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    children: [
      {
        element: <ProtectedPage />,
        children: [
          {
            path: 'projects',
            element: <ProjectsPage />,
          },
          {
            path: 'settings',
            element: <AccountSettings />,
          },
        ],
      },
    ],
  },
])
