import React from 'react'
import ReactDOM from 'react-dom/client'
import { createRouter, RouterProvider, createRootRoute, createRoute, Outlet } from '@tanstack/react-router'

import { Landing } from './components/ml/Landing'
import { Dashboard } from './components/ml/Dashboard'
import { Register } from './components/ml/Register'
import { registerServiceWorker } from './pwa/register-sw'
import { Analytics } from '@vercel/analytics/react'

const rootRoute = createRootRoute({
  component: () => <Outlet />
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Landing,
})

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: Dashboard,
})

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: Register,
})

const routeTree = rootRoute.addChildren([indexRoute, dashboardRoute, registerRoute])

const router = createRouter({ routeTree })

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Analytics />
  </React.StrictMode>
)

// Start your seasonal PWA
registerServiceWorker()
