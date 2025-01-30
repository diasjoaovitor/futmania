import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  createMemoryRouter,
  RouteObject,
  RouteProps,
  RouterProvider
} from 'react-router-dom'

import {
  AppProvider,
  AuthProvider,
  CallbackProvider,
  DialogProvider,
  NotificationProvider,
  ThemeProvider
} from '@/contexts'

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
})

export const memoryRouter = (
  routes: RouteObject[],
  opt?: { initialEntries: string[] } & RouteProps
) => {
  const router = createMemoryRouter(
    routes.map(({ element, ...rest }) => {
      return {
        ...rest,
        element: (
          <CallbackProvider>
            <ThemeProvider>
              <QueryClientProvider client={client}>
                <NotificationProvider>
                  <DialogProvider>
                    <AuthProvider>
                      <AppProvider>{element}</AppProvider>
                    </AuthProvider>
                  </DialogProvider>
                </NotificationProvider>
              </QueryClientProvider>
            </ThemeProvider>
          </CallbackProvider>
        )
      }
    }),
    opt
  )
  return {
    router,
    Component: () => <RouterProvider router={router} />
  }
}
