import { ErrorBoundary } from 'react-error-boundary'
import { RouterProvider } from 'react-router-dom'
import { router } from './config/routes'

function App() {
  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <div className="min-h-[100svh] font-3xl font-medium flex flex-col items-center justify-center">
          <div className="flex gap-x-2 items-center">
            <span>Something went wrong</span>
            <span className="text-red-500">{error.message}</span>
          </div>
          <button className="bg-none border-none " onClick={resetErrorBoundary}>
            Try again
          </button>
        </div>
      )}
    >
      <RouterProvider router={router} />
    </ErrorBoundary>
  )
}

export default App
