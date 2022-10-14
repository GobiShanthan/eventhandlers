import React from "react";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { MyTextInput } from "../FormFields/FormFields";
import { FlexContainer, Card } from "./OrderForm.styled";
import { addAddress } from "../../redux/reducers/orderSlice";

const OrderForm = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Formik
        initialValues={{
          address: "",
          city: "",
          postalCode: "",
          country: "",
        }}
        validationSchema={Yup.object({
          address: Yup.string().required("Required"),
          city: Yup.string().required("Required"),
          postalCode: Yup.string().required("Required"),
          country: Yup.string().required("Required"),
        })}
        onSubmit={(values) => {
          dispatch(addAddress(values));
        }}
      >
        <Form>
          <FlexContainer>
            <h1>Shipping Details</h1>
            <Card>
              <MyTextInput name="address" type="text" placeholder="Address" />

              <MyTextInput name="city" type="text" placeholder="City" />

              <MyTextInput
                name="postalCode"
                type="text"
                placeholder="Postal/Zip Code"
              />

              <MyTextInput name="country" type="text" placeholder="Country" />

              <button type="submit">Confirm Order</button>
            </Card>
          </FlexContainer>
        </Form>
      </Formik>
    </>
  );
};

export default OrderForm;
