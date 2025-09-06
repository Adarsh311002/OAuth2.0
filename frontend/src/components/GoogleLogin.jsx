import React from 'react'
import {useGoogleLogin} from '@react-oauth/google'
import { googleAuth } from './api'
import { useNavigate } from 'react-router-dom'

const GoogleLogin = () => {


    const navigate = useNavigate();

  const responseGoogle = async (authResult) => {
    try {
      if(authResult['code']){
         const result = await googleAuth(authResult['code'])

         const {email,name,image} = result.data.user;
         const token = result.data.token;
         const obj = {email,name,image,token};
         localStorage.setItem('user-info',JSON.stringify(obj));
         
         console.log('user : ', result.data.user)
         console.log(token);

         navigate('/dashboard');
      }
     
    } catch (err) {
      console.error('Something went wrong : ' , err);
    }
  }

  const googlelogin = useGoogleLogin({
    onSuccess : responseGoogle,
    onError : responseGoogle,
    flow : 'auth-code'
    
  })
  return (
    <button onClick={googlelogin}>
        google login
    </button>
      
  )
}

export default GoogleLogin
