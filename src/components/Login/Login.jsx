import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../redux/apiCalls/login";

import {
  LoginContainer,
  LoginTitle,
  Card,
} from "./Login.styled";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Formik, Form, useFormik } from "formik";
import * as Yup from "yup";
import { MyTextInput } from "../FormFields/FormFields";

import {
  lightGold,
  darkGold,
  lightBlack,
  grey,
} from "../../components/Colors/colors";

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
      <Box
            sx={{
              "& .MuiFormLabel-root": {
                color: `${lightGold}`,
              },
              "& .MuiFormLabel-root.Mui-focused": {
                color: `${grey}`,
              },
              
              "& label.Mui-focused": {
                color: `${darkGold}`,
              },
              "& .MuiOutlinedInput-root": {
                "fieldset": {
                  borderColor: `${darkGold}`,
                },
                "&.Mui-focused fieldset": {
                  borderColor: `${grey}`,
                },
                },
            }}
            >
      <Card
              style={{
                justifyContent: "center",
                border: "solid 5px",
                borderColor: `${darkGold}`,
                color: `${grey}`
              }}
              >
        <LoginTitle>Login</LoginTitle>
        <TextField
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          margin="dense"
          inputProps={{ style: { color: `${grey}`} }}
        />

        <TextField
          id="password"
          name="password"
          label="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          margin="dense"
          inputProps={{ style: { color: `${grey}`} }}
        />

        <Button type="submit" style={{
                  justifySelf: "center",
                  margin: "20px",
                  backgroundColor: `${lightGold}`,
                  alignItems: 'center',
                }} variant="contained">
          Submit
        </Button>
        </Card>
        </Box>
      </form>
    </>
  );
};

export default Login;
