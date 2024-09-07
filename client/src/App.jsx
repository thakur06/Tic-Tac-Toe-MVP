

import { Signin } from './Components/Signin'

import { Login } from './Components/Login'


import { Navbar } from './Components/Navbar'
import { createBrowserRouter, Router, RouterProvider, Outlet } from 'react-router-dom'
import { Home } from './Components/Home';

const Layout = () => (
  <div>
    <Navbar />

    <div style={{ paddingTop: '4rem' }}>
      <Outlet />
    </div>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Login />
      },
      {
        path: "/signin",
        element: <Signin />
      },
      {
        path: "/home",
        element: <Home />
      },
    ]
  },



])
function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App