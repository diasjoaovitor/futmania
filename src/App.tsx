import { Router } from './Router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  AuthProvider,
  DialogProvider,
  NotificationProvider,
  ThemeProvider
} from './contexts'

const queryClient = new QueryClient()

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <NotificationProvider>
          <DialogProvider>
            <AuthProvider>
              <Router />
            </AuthProvider>
          </DialogProvider>
        </NotificationProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
