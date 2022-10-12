import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { MyTextInput } from "../FormFields/FormFields"

import { FlexContainer, Card } from "./UpdateUserForm.styled";

const UpdateUserForm = ( userInfo) => {
  return (
    <>
      <Formik
        initialValues={''}
        validationSchema={Yup.object({
          name: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
        })}
        onSubmit={(values) => console.log(values)}
      >
        <Form>
          <FlexContainer>
            <Card style={{display:'flex', flexDirection:'column'}}>
              <MyTextInput
                label="Name"
                name="name"
                type="text"
                placeholder={userInfo.name}
                style={{backgroundColor:'white'}}
              />

              <MyTextInput
                label="Email Address"
                name="email"
                type="email"
                style={{backgroundColor:'white'}}
                placeholder={userInfo.email}
              />
              <MyTextInput
                label="Image"
                name="image"
                type="file"
                style={{backgroundColor:'white'}}
                placeholder={'YOUR IMAGE HERE'}
              />
            </Card>
          </FlexContainer>
          <button type='submit' style={{marginTop:'20px'}}>UPDATE USER</button>
        </Form>
      </Formik>
    </>
  );
};

export default UpdateUserForm;
