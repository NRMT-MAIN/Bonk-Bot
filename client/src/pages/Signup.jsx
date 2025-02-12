import axios from 'axios';
import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';

function Signup() {
  const usernameRef = useRef() ; 
  const passwordRef = useRef() ;
  const navigate = useNavigate() ; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Username:', usernameRef.current.value);
    console.log('Password:', passwordRef.current.value);

    await axios.post("http://localhost:3000/api/v1/signup" , {
        username : usernameRef.current.value ,
        password : passwordRef.current.value
    })

    navigate('/signin') ; 
  }
  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center gap-2'>
        <h1 className='text-6xl font-bold text-gray-800'>Signup</h1>
        <input ref={usernameRef} className='bg-slate-300 rounded-md' type="text" placeholder='username' />
        <input ref={passwordRef} className='bg-slate-300 rounded-md' type="password" placeholder='password' />
        <button onClick={handleSubmit} className="px-3 py-1 bg-sky-600 hover:bg-sky-900 text-white rounded-md"> Signup </button>
    </div>
  )
}

export default Signup ;