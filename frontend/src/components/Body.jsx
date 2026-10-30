import React from 'react'
import Login from '../pages/Login'
import Products from '../pages/Products'
import Orders from '../pages/Orders'
import Cart from '../pages/Cart'
import Account from '../pages/Account'
import Like from '../pages/Like'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Browse from '../pages/Browse'
import MainLayout from './MainLayout'

import ProtectedRoute from "../components/ProtectedRoute"
import like from '../pages/Like'

export default function Body() {
    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Login />
        },
       {
        element: <MainLayout/>,
        children: [
            { path: "/products", element: <Products/>},
             { path: "/cart", element: <Cart/>},
             { path: "/account", element: <Account/>},
             { path: "/orders", element: <Orders/>},
             {path:"/like",element:<Like/>}


        ]
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
