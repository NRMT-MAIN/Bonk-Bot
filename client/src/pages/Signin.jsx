import React, { useRef } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';


function Signin() {
  const usernameRef = useRef() ; 
  const passwordRef = useRef() ;
  const navigate = useNavigate() ; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3000/api/v1/signin" , {
        username : usernameRef.current.value,
        password : passwordRef.current.value
    }).then( response => localStorage.setItem("token" , response.data.token)) ; 

    navigate("/transactions")
  }
  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center gap-2'>
        <h1 className='text-4xl font-bold text-gray-800'>Signin</h1>
        <input ref={usernameRef} className='bg-slate-300 rounded-md' type="text" placeholder='username' />
        <input ref={passwordRef} className='bg-slate-300 rounded-md' type="password" placeholder='password' />
        <button onClick={ handleSubmit } className="px-3 py-1 bg-sky-600 hover:bg-sky-900 text-white rounded-md"> Signin </button>
    </div>
  )
}

export default Signin ;