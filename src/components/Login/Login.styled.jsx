import styled from "styled-components";
import { motion } from "framer-motion";

export const LoginContainer = styled(motion.div)`
  margin-top: -10vh;
`;

export const LoginTitle = styled(motion.div)`
  margin: 20px;
  font-size: 40px;
`;

export const LoginForm = styled(motion.form)`
  margin-top: -10px;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

export const Input = styled(motion.input)`
  font-size: 15px;
  border: solid 1px green;
  padding: 10px;
  border-radius: 15px;
  margin-top: 10px;
`;

export const Button = styled(motion.button)`
  margin-top: 20px;
  font-size: 20px;
  background: black;
  color: white;
  padding: 10px;
`;

export const Card = styled(motion.div)`
  width: 70vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 15vw;
`;
