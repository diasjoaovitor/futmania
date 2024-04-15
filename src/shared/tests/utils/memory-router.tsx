import {
  RouteObject,
  RouteProps,
  RouterProvider,
  createMemoryRouter
} from 'react-router-dom'

export const memoryRouter = (
  routes: RouteObject[],
  opt?: { initialEntries: string[] } & RouteProps
) => {
  const router = createMemoryRouter(routes, opt)
  return {
    router,
    Component: () => <RouterProvider router={router} />
  }
}
