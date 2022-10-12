import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../redux/apiCalls/login";

import {
  LoginContainer,
  LoginTitle,
  LoginForm,
  Input,
  // Button,
} from "./Login.styled";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Formik, Form, useFormik } from "formik";
import * as Yup from "yup";
import { MyTextInput } from "../FormFields/FormFields";


const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("No password provided"),
});

const Login = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await loginUser(
        {
          email: values.email,
          password: values.password,
        },
        dispatch
      );
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <LoginTitle>Login</LoginTitle>
        <TextField
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <TextField
          id="password"
          name="password"
          label="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

        <Button type="submit" style={{color: 'red'}} variant="contained">
          Submit
        </Button>
      </form>
    </>
  );
};

export default Login;
