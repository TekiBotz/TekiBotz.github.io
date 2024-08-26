/**
 * Project: AnimalShelter
 * File: App.jsx
 * Author: Jarrale Butts
 * Created: 2024-08-20
 * Purpose: Main application setup.
 */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthContextProvider } from './contexts/AuthContext.jsx'
import { Shelter } from './screens/Shelter.jsx'
import { Signup } from './screens/Signup.jsx'
import { Login } from './screens/Login.jsx'
import { AnimalDetailScreen } from './screens/AnimalDetailScreen.jsx'
import { AnimalListScreen } from './screens/admin/AnimalListScreen.jsx'
import { SearchResults } from './components/SearchResults.jsx'
import { AdminRoute } from './components/AdminRoute.jsx'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <Shelter />,
  },
  {
    path: '/animal/:id',
    element: <AnimalDetailScreen />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/search',
    element: <SearchResults />,
  },
  {
    path: '/admin',
    element: (
      <AdminRoute>
        <AnimalListScreen />
      </AdminRoute>
    ),
  },
])

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </QueryClientProvider>
  )
}
