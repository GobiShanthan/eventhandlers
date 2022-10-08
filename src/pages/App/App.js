import './App.css'
import {useState,useEffect} from 'react'
import { useSelector} from 'react-redux'

import {
  AppContainer
} from './App.styled'
import { Route, Routes, Navigate } from 'react-router-dom';
import Menu from '../../components/Menu/Menu'
import AuthPage from '../Auth/AuthPage'
import Home from '../Homepage/Homepage'



const App = () => {

// const {name} = userInfo

//GET LOCALDATA AND SET USER 
const updateUserState =()=>{
  let token = localStorage.getItem('token')
  if(token){
    const payload = JSON.parse(window.atob(token.split('.')[1]))
    if(payload.exp < Date.now() /1000){
      localStorage.removeItem('token')
      token = null
    }else{
      let userData = payload.user
      
  }
}else{
  return
}
}


// USE EFFECT TO FETCH FROM LOCAL STATE
useEffect(()=>{
updateUserState()
},[])


  return (
    <AppContainer>
      <Menu user='louis'/>
      <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/auth' element={<AuthPage /> }/>
      <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppContainer>
  )
}

export default App