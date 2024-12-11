import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainNav from '../layouts/MainNav'
import Home from '../pages/Home'
import Login from '../pages/auth/login'
import Register from '../pages/auth/register'
import Dashboard from '../pages/user/dashboard'
import Navuser from '../layouts/user/Navuser'
import ProtectRouteUser from './ProtectRouteUser'
import Main from '../pages/user/Main'

const router = createBrowserRouter([
    {
        path: '/', 
        element: <MainNav />,
        children: [
            { index: true, element: <Home /> },
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
        ]
    },
    {
      path: '/user',
      element: <ProtectRouteUser element={<Navuser />} />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: 'main', element: <Main /> },
      ]
    }
])

const Approutes = () => {
  return (
    <div>
        <RouterProvider router={router} />
    </div>
  )
}

export default Approutes