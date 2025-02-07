import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'

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
        <NotificationProvider>
          <DialogProvider>
            <BrowserRouter>
              <AuthProvider>
                <CallbackProvider>
                  <AppProvider>
                    <Router />
                  </AppProvider>
                </CallbackProvider>
              </AuthProvider>
            </BrowserRouter>
          </DialogProvider>
        </NotificationProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
