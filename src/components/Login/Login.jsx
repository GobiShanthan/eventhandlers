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
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { MyTextInput } from "../FormFields/FormFields"

const Login = () => {
  const dispatch = useDispatch();
  // const [signData, setSignData] = useState({
  //   name:'',
  //   email:'',
  //   password:'',
  //   error:''
  // })

  


  // const handleChange = (e) => {
  //   setSignData({...signData,[e.target.name]: e.target.value})
  // }

  // const onSubmit = async (e) => {
  //   e.preventDefault()
  //   await loginUser({email:signData.email, password:signData.password},dispatch)
  // }



  return (
    <>
    <Formik
    initialValues={{
      email: '',
      password: ''
    }}
    validationSchema={Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required("Required"),
      password: Yup.string()
      .required("No password provided")
    })}
    onSubmit={ async (values) => {
      await loginUser(
        {
          email: values.email,
          password: values.password
        },
        dispatch
      )
    }}
    >

    <LoginContainer>
      <Form>
      <LoginTitle>Login</LoginTitle>
      <MyTextInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="jane@formik.com"
          />
          <MyTextInput
            label="Password"
            name="password"
            type="text"
            placeholder="Password"
          />
        {/* <MyTextInput placeholder='Enter email' required name ='email'   value={signData.email} onChange={handleChange}/> */}
        {/* <MyTextInput placeholder='Enter password' required name='password' value={signData.password} onChange={handleChange}/> */}
        <button type="submit">Submit</button>
      </Form>
    </LoginContainer>
    </Formik>
    </>
  )
}

export default Login