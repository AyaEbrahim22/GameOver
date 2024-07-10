import React from 'react'
import Register from './Components/Register/Register'
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Login from './Components/Login/Login'
import Home from './Components/Home/Home'
import Guard from './Components/Guard/Guard'
import Categories from './Components/Categories/Categories'
import GameDetails from './Components/GameDetails/GameDetails'
import Search from './Components/Search/Search'
import Notfound from './Components/Notfound/Notfound'

export default function App() {
  
  let routes = createHashRouter([
    {path: '', element: <Layout/>, children: [
      {index: true , element: <Guard><Home/></Guard>},
      {path: 'categories/:category' , element: <Guard><Categories/></Guard>},
      {path: 'details/:id' , element: <Guard><GameDetails/></Guard>},
      {path: 'search' , element: <Guard><Search/></Guard>},
      {path: 'login' , element: <Login/>},
      {path: 'register', element: <Register/>},
      {path: '*', element: <Notfound/>}
   
    ]}
  ])
  
  return <>
  
  <RouterProvider router={routes}></RouterProvider>

  </>
}
