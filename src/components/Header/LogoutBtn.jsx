import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button
    className='inline-bock px-4 duration-500 sm:text-xl md:text-2xl text-left items-start rounded-full'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn