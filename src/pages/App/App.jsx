
import './App.css'
import {useEffect} from 'react'
import {useSelector} from 'react-redux'

import {
  AppContainer
} from './App.styled'
import { Route, Routes, Navigate } from 'react-router-dom';
import Menu from '../../components/Menu/Menu'
import AuthPage from '../Auth/AuthPage'
import Home from '../Homepage/Homepage'
import AllVendors from '../AllVendors/AllVendors'
import VendorDetail from '../VendorDetail/VendorDetail'
import Cart from '../Cart/Cart'
import AddPackage from '../AddPackage/AddPackage'
import ViewPackage from '../ViewPackage/ViewPackage'
import Checkout from '../Checkout/Checkout'
import Packages from '../Packages/Packages'



const App = () => {


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
      <Route path='/vendors' element={<AllVendors />} />
      <Route path='/vendors/:id' element={<VendorDetail />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/packages' element={<Packages />} />
      <Route path='/package/add' element={<AddPackage />} />
      <Route path='/package/:id' element={<Packages />} />
      <Route path='/checkout' element={<Checkout />} />




      <Route path='/auth' element={<AuthPage /> }/>
      <Route path="*" element={<Navigate to="/" replace />} />
      
      </Routes>
    </AppContainer>
  )
}

export default App