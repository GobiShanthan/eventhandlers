import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../../redux/apiCalls/login'
import {
  LoginContainer,
  LoginTitle,
  LoginForm,
  Input,
  Button,
} from './Login.styled';

const Login = () => {
  
  const dispatch = useDispatch();
  const [signData, setSignData] = useState({
    name:'',
    email:'',
    password:'',
    error:''
  })


  const handleChange = (e) => {
    setSignData({...signData,[e.target.name]: e.target.value})
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    await loginUser({email:signData.email, password:signData.password},dispatch)
  }

  // const  handleSubmit = async(e)=>{
  //   e.preventDefault()

  //   try {
  //     //1 POST our new user to our server

  //     const options ={
  //       method:'POST',
  //       headers:{
  //         'Content-Type': 'application/json'
  //       },
  //       body:JSON.stringify({
  //         email:signData.email,
  //         password:signData.password})
  //     }
  //     const fetchResponse = await fetch('/api/users/login',options)
  //     if(!fetchResponse.ok) throw new Error('Fetch failed - Bad request')
  //     let token = await fetchResponse.json()
  //     localStorage.setItem('token',token)
  //     let user = JSON.parse(window.atob(token.split('.')[1])).user
  //     authUser(user)
  //   } catch (err) {
  //     console.log("LoginForm error", err);
  //     setSignData({...signData,error:err})
  //   }
  // }


  return (
    <LoginContainer>
      <LoginForm onSubmit={(e) => onSubmit(e)}>
      <LoginTitle>Login</LoginTitle>
        <Input placeholder='Enter email' required name ='email'   value={signData.email} onChange={handleChange}/>
        <Input placeholder='Enter password' required name='password' value={signData.password} onChange={handleChange}/>
        <Button>Submit</Button>
      </LoginForm>

    </LoginContainer>
  )
}

export default Login