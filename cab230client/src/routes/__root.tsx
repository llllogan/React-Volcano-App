import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { createRouter } from '@tanstack/react-router'


// Import the generated route tree
import { routeTree } from '../routeTree.gen'

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export const Route = createRootRoute({
    component: RootComponent,
})

function RootComponent() {
    return (
        <div>
        hello
        <Outlet />
        <TanStackRouterDevtools />
        </div>
    )
}

