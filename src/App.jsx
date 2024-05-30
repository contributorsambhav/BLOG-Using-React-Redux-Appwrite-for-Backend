import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import './index.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'


function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])
  
  return !loading ? (
    <div className='min-h-screen flex flex-col bg-gray-400'>
      <Header />
      <main className="flex-grow bg-gray-200 dark:bg-gray-700">
        <Outlet />
      </main>
      <Footer className="fixed bottom-0 w-full" />
    </div>
  ) : null
}

export default App
