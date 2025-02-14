import { useMediaQuery } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ReactElement } from 'react'

import {
  AppProvider,
  AuthProvider,
  NotificationProvider,
  ThemeProvider
} from '@/contexts'
import { UserService } from '@/services'
import { memoryRouter, mockedUser, mockedUsers } from '@/tests'

import { Explorer } from '../Explorer'
import { Settings } from '.'

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: jest.fn()
}))

const mockedUseMediaQuery = useMediaQuery as jest.Mock<boolean>

const user: {
  displayName: string
  emailVerified: boolean
  uid: string
} | null = { uid: '1', displayName: 'Baba Test', emailVerified: true }

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({
    onAuthStateChanged: jest.fn((callback) => {
      callback(user)
    })
  }))
}))

jest.mock('@/services/user')

const mockedFindAllUsers = jest.spyOn(UserService.prototype, 'findAll')
const mockedUpdateUser = jest.spyOn(UserService.prototype, 'update')

const original = console.error

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
})

const formSetup = async ({ displayName }: { displayName: string }) => {
  await userEvent.type(screen.getByLabelText('Nome do Baba'), displayName)
  await userEvent.click(screen.getByRole('button', { name: 'Salvar' }))
}

const setup = () => {
  const { Component, router } = memoryRouter(
    [
      {
        path: '/settings',
        element: <Settings />
      },
      {
        path: '/explorer',
        element: <Explorer />
      }
    ],
    {
      initialEntries: ['/settings']
    },
    (props: { children: ReactElement }) => (
      <AuthProvider>
        <AppProvider>{props.children}</AppProvider>
      </AuthProvider>
    )
  )

  return {
    router,
    Component: () => (
      <QueryClientProvider client={client}>
        <ThemeProvider>
          <NotificationProvider>
            <Component />
          </NotificationProvider>
        </ThemeProvider>
      </QueryClientProvider>
    )
  }
}

describe('<Settings />', () => {
  beforeAll(() => {
    mockedFindAllUsers.mockResolvedValue(mockedUsers)
  })

  it('should update Baba name successfully', async () => {
    mockedUseMediaQuery.mockReturnValue(true)
    mockedUpdateUser.mockResolvedValue({
      ...mockedUser,
      displayName: 'Updated Name'
    })
    const { Component, router } = setup()
    render(<Component />)
    await waitFor(() => {
      expect(
        (screen.getByLabelText('Nome do Baba') as HTMLInputElement).value
      ).toBe('Baba Test')
    })
    await formSetup({ displayName: 'Updated Name' })
    expect(
      screen.getByText('Nome do Baba atualizado com sucesso!')
    ).toBeInTheDocument()
    fireEvent.click(screen.getByText(/Explorar Babas/i))
    expect(router.state.location.pathname).toBe('/explorer')
    expect(screen.queryByText('Baba Test')).not.toBeInTheDocument()
    expect(screen.getByText('Updated Name')).toBeInTheDocument()
  })

  it('should render error message', async () => {
    console.error = jest.fn()
    mockedUpdateUser.mockRejectedValue(new Error('Error'))
    const { Component } = setup()
    render(<Component />)
    await waitFor(async () => {
      await userEvent.clear(screen.getByLabelText('Nome do Baba'))
    })
    await userEvent.click(screen.getByRole('button', { name: 'Salvar' }))
    expect(screen.getByText('Nome do Baba é obrigatório')).toBeInTheDocument()
    await formSetup({ displayName: 'Updated Name' })
    expect(
      screen.getByText('Erro ao atualizar nome do Baba')
    ).toBeInTheDocument()
  })
  console.error = original
})
