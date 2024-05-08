/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as VolcanosImport } from './routes/volcanos'
import { Route as VolcanoImport } from './routes/volcano'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const VolcanosRoute = VolcanosImport.update({
  path: '/volcanos',
  getParentRoute: () => rootRoute,
} as any)

const VolcanoRoute = VolcanoImport.update({
  path: '/volcano',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/volcano': {
      preLoaderRoute: typeof VolcanoImport
      parentRoute: typeof rootRoute
    }
    '/volcanos': {
      preLoaderRoute: typeof VolcanosImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  VolcanoRoute,
  VolcanosRoute,
])

/* prettier-ignore-end */