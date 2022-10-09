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