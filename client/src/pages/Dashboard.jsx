import React from 'react'
import { useNavigate } from 'react-router-dom'


function Dashboard() {
  const navigate = useNavigate() ;
  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center gap-2'>
        <h1 className='text-3xl'>Dashboard</h1>
        <p>Welcome to your dashboard</p>
        <button onClick={() => {
            navigate("/signin") ;
        }} className="px-3 py-1 bg-sky-600 hover:bg-sky-900 text-white rounded-md"> Signin </button>
        <button onClick={ () => {
            navigate("/signup") ;  
        }} className="px-3 py-1 bg-sky-600 hover:bg-sky-900 text-white rounded-md"> Signup </button>
    </div>
  )
}

export default Dashboard