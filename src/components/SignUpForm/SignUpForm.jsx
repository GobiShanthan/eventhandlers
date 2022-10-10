import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from "react-redux";
import { signupUser } from "../../redux/apiCalls/signup";
import { MyTextInput } from "../FormFields/FormFields"


const lowercaseRegEx = /(?=.*[a-z])/
const uppercaseRegEx = /(?=.*[A-Z])/
const numericRegEx = /(?=.*[0-9])/
const lengthRegEx = /(?=.{6,})/


const SignupForm = () => {
    const dispatch = useDispatch();
  return (
    <>
<h1>Sign up!</h1>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
        //   isVendor: false, 
        //   vendorType: '', 
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          password: Yup.string()
            .matches(lowercaseRegEx, "Must contain one lowercase alphabetical character!")
            .matches(uppercaseRegEx, "Must contain one uppercase alphabetical character!")
            .matches(numericRegEx, "Must contain one numeric character!")
            .matches(lengthRegEx, "Must contain 6 characters!")
            .required("Required!"),
        //   isVendor: Yup.boolean(),
        //   vendorType: Yup.string()
        //     .oneOf(
        //       ['venue', 'caterer', 'photographer', 'decor'],
        //       'Invalid Vendor Type'
        //     ),
        })}
        onSubmit={ async (values, { setSubmitting }) => {
        //   setTimeout(() => {
        //     alert(JSON.stringify(values, null, 2));
        //     setSubmitting(false);
        //   }, 400);
            console.log(values);
            await signupUser(
              {
                name: values.name,
                email: values.email,
                password: values.password,
              },
              dispatch
            );
        }}
      >
        <Form>  
          <MyTextInput
            label="Name"
            name="name"
            type="text"
            placeholder="Jane"
          />

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

          {/* <MyCheckbox name="isVendor">Are you a vendor?</MyCheckbox> */}

          {/* <MySelect label="Vendor Type" name="vendorType">
            <option value="">Select a vendor type</option>
            <option value="venue">Venue</option>
            <option value="caterer">Caterer</option>
            <option value="photographer">Photographer</option>
            <option value="decor">Decor</option>
          </MySelect> */}
          <button type="submit">Submit</button>
        </Form>
      </Formik>

    </>
  );
};

export default SignupForm