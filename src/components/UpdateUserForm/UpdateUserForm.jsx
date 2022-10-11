import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { MyTextInput } from "../UpdateUserForm/UpdateUserForm.styled";

import { FlexContainer, Card } from "./OrderForm.styled";

const UpdateUserForm = () => {
  return (
    <>
      <Formik
        initialValues={dataFromAPI}
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
            <Card>
              <MyTextInput
                label="Name"
                name="name"
                type="text"
                placeholder={initialValues.name}
              />

              <MyTextInput
                label="Email Address"
                name="email"
                type="email"
                placeholder={initialValues.email}
              />
            </Card>
          </FlexContainer>
        </Form>
      </Formik>
    </>
  );
};

export default UpdateUserForm;
