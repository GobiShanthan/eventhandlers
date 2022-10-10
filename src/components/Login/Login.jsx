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
        <button type="submit">Submit</button>
      </Form>
    </LoginContainer>
    </Formik>
    </>
  )
}

export default Login