import React from 'react'
import Login from '../pages/Login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Browse from '../pages/browse'

export default function Body() {
    const appRouter = createBrowserRouter([
        {
            path:"/",
            element:<Login/>
        },
        {
            path:"/browse",
            element:<Browse/>
        }
    ])
  return (
   <RouterProvider router = {appRouter}/>
  )
}
