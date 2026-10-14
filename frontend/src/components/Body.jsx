import React from 'react'
import Login from '../pages/Login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Browse from '../pages/Browse'
import MainLayout from './MainLayout'

import ProtectedRoute from "../components/ProtectedRoute"

export default function Body() {
    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Login />
        },
        {
            
            element: <MainLayout />,
            children: [
                {
                    path: "/browse",
                    element: (
                        <ProtectedRoute>
                            <Browse />
                        </ProtectedRoute>
                    )
                }
            ]
        }
    ])
    return (
        <RouterProvider router={appRouter} />
    )
}
