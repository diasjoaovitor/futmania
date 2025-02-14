import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router'

import {
  AppProvider,
  AuthProvider,
  NotificationProvider,
  ThemeProvider
} from './contexts'
import { Router } from './Router'

const queryClient = new QueryClient()

const App = () => {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <NotificationProvider>
          <BrowserRouter>
            <AuthProvider>
              <AppProvider>
                <Router />
              </AppProvider>
            </AuthProvider>
          </BrowserRouter>
        </NotificationProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
