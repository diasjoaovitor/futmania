import { ReactElement } from 'react'
import { createMemoryRouter, RouteObject, RouterProvider } from 'react-router'

export const memoryRouter = (
  routes: RouteObject[],
  opt?: { initialEntries: string[] },
  Wrapper?: (props: { children: ReactElement }) => ReactElement
) => {
  const router = createMemoryRouter(
    routes.map(({ element, ...rest }) => ({
      ...rest,
      element: Wrapper ? <Wrapper>{element as ReactElement}</Wrapper> : element
    })),
    opt
  )

  return {
    router,
    Component: () => <RouterProvider router={router} />
  }
}
