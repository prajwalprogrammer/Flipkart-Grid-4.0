import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {TransactionContext} from '../context/TransactionContext'

export  const HandleLogout = () => {
    const{ setIsAdmin}=useContext(TransactionContext)
    let navigate = useNavigate();
    sessionStorage.removeItem('Auth Token');
    setIsAdmin(false)
    navigate('/')
    return( <></>)
}
export default HandleLogout