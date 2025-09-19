import React from 'react'
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import GoogleLogin from '../components/GoogleLogin'
import Dashboard from './Dashboard'
import NotFound from './NotFound'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { useState } from 'react'
import RefreshHandler from '../components/RefreshHandler'

const AppRouting = () => {

  const [isAuthenticated,setIsAuthenticated] = useState(false);

  const clientId = process.env.CLIENTID;


  const GoogleAuthWrapper = () => {
    return (
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin></GoogleLogin>
      </GoogleOAuthProvider>
    )
  } 

  const PrivateRoute = ({element}) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }

  return (
    <BrowserRouter>
    <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
    <Routes>
        <Route path='/login' element={<GoogleAuthWrapper/>} />
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/dashboard' element={<PrivateRoute element={<Dashboard />}/>}/>
        <Route path='*' element={<NotFound />}/>
    </Routes>
    </BrowserRouter>

  )
}

export default AppRouting
