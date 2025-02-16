import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router'

import {
  AppProvider,
  AuthProvider,
  CallbackProvider,
  DialogProvider,
  NotificationProvider,
  ThemeProvider
} from './contexts'
import { Router } from './Router'

const queryClient = new QueryClient()

const App = () => {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <CallbackProvider>
          <NotificationProvider>
            <DialogProvider>
              <BrowserRouter>
                <AuthProvider>
                  <AppProvider>
                    <Router />
                  </AppProvider>
                </AuthProvider>
              </BrowserRouter>
            </DialogProvider>
          </NotificationProvider>
        </CallbackProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
