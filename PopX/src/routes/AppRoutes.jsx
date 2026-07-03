import { createBrowserRouter } from 'react-router-dom'
import Home     from '../pages/Home'
import Login    from '../pages/Login'
import Register from '../pages/Register'
import Account  from '../pages/Account'

const route = createBrowserRouter([
  { path: '/',               element: <Home /> },
  { path: '/login',          element: <Login /> },
  { path: '/create-account', element: <Register /> },
  { path: '/account',        element: <Account /> },
])

export default route
