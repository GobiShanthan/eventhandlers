import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signupUser } from "../../redux/apiCalls/signup";
import {
  SignUpContainer,
  SignUpTitle,
  SignUpForm,
  Input,
  Button,
} from "./Signup.styled";

const SignUp = ({ authUser }) => {
  const dispatch = useDispatch();
  const [signData, setSignData] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
  });

  const handleChange = (e) => {
    setSignData({ ...signData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(signData);
    await signupUser(
      {
        name: signData.name,
        email: signData.email,
        password: signData.password,
      },
      dispatch
    );
  };

  return (
    <SignUpContainer>
      <SignUpForm onSubmit={(e) => onSubmit(e)}>
        <SignUpTitle>Sign Up</SignUpTitle>
        <Input
          placeholder="Enter name"
          required
          name="name"
          value={signData.name}
          onChange={handleChange}
        />
        <Input
          placeholder="Enter email"
          required
          name="email"
          value={signData.email}
          onChange={handleChange}
        />
        <Input
          placeholder="Enter password"
          required
          name="password"
          value={signData.password}
          onChange={handleChange}
        />
        <Button>Submit</Button>
      </SignUpForm>
    </SignUpContainer>
  );
};

export default SignUp;
