import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../redux/apiCalls/signup";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { SignupTitle, Card } from "./SignUpForm.styled";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { lightGold, darkGold, grey } from "../../components/Colors/colors";

const lowercaseRegEx = /(?=.*[a-z])/;
const uppercaseRegEx = /(?=.*[A-Z])/;
const numericRegEx = /(?=.*[0-9])/;
const lengthRegEx = /(?=.{6,})/;

const validationSchema = Yup.object({
  name: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .matches(
      lowercaseRegEx,
      "Must contain one lowercase alphabetical character!"
    )
    .matches(
      uppercaseRegEx,
      "Must contain one uppercase alphabetical character!"
    )
    .matches(numericRegEx, "Must contain one numeric character!")
    .matches(lengthRegEx, "Must contain 6 characters!")
    .required("Required!"),
});

const SignupForm = () => {
  const dispatch = useDispatch();

  const signup = useSelector((state) => state.signup);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      console.log(values);
      await signupUser(
        {
          name: values.name,
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
              fieldset: {
                borderColor: `${darkGold}`,
              },
              "&.Mui-focused fieldset": {
                borderColor: `${grey}`,
              },
            },
          }}
        >
          <Card>
            <SignupTitle>Sign up!</SignupTitle>

            <TextField
              id="name"
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              margin="dense"
              inputProps={{ style: { color: `${grey}` } }}
            />

            <TextField
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              margin="dense"
              inputProps={{ style: { color: `${grey}` } }}
            />

            <TextField
              id="password"
              type='password'
              name="password"
              label="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              margin="dense"
              inputProps={{ style: { color: `${grey}` } }}
            />

            <Button
              type="submit"
              style={{
                justifySelf: "center",
                margin: "20px",
                backgroundColor: `${lightGold}`,
                alignItems: "center",
              }}
              variant="contained"
            >
              Submit
            </Button>
            <Stack sx={{ maxWidth: "300px" }} spacing={2}>
              {signup && signup.error ? (
                <Alert severity="error">{signup.error}</Alert>
              ) : null}
            </Stack>
          </Card>
        </Box>
      </form>
    </>
  );
};

export default SignupForm;
