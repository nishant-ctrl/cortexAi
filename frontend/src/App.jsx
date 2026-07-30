import { signInWithPopup } from 'firebase/auth'
import React from 'react'
import { auth, googleProvider } from '../utils/firebase'

const App = () => {
  const googleLogin=async () => {
    const data=await signInWithPopup(auth,googleProvider)
    console.log(data)
  }
  return (
    <div className='bg-slate-500 text-center min-h-screen flex justify-center items-center'>
      <button 
      onClick={googleLogin}
      className='bg-amber-800 hover:cursor-pointer p-5 rounded-3xl'>Continue with Google</button>
    </div>
  )
}

export default App