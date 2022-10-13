import styled from "styled-components";
import { motion } from "framer-motion";

export const FlexContainer = styled(motion.div)`
  margin-top: 20vh;
  display: flex;
  justify-content: center;
  flex-direction: row;
  background-color: #231f20;
`;

export const Card = styled(motion.div)`
  box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px,
    rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px,
    rgba(0, 0, 0, 0.09) 0px 32px 16px;

  background-color: lightgrey;
`;

export const Form = styled(motion.form)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 20px;
`;
export const FormText = styled(motion.div)`
  display: flex;
  flex-direction: column;
  padding: 20px;
  flex: 1;
`;
export const FormImage = styled(motion.div)`
  display: grid;
  grid-template-rows: 1fr 1fr;

  padding: 20px;
  flex: 1;
`;

export const Input = styled(motion.input)`
  margin: 10px;
  padding: 10px;
  background-color: white;
`;

export const TextArea = styled(motion.textarea)`
  margin: 10px;
  background-color: white;
`;

export const SButton = styled(motion.button)`
  margin: 10px;
  background-color: white;
  padding: 20px;
  background-color: grey;
  justify-self: center;
`;

export const Image = styled(motion.img)`
  width: 100px;
  height: 100px;
  justify-self: center;
`;
