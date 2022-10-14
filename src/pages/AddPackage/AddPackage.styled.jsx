import styled from "styled-components";
import { motion } from "framer-motion";

import { lightBlack } from "../../components/Colors/colors";

export const FlexContainer = styled(motion.div)`
  height: 100%;
  width: 100vw;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${lightBlack};
`;
export const AddPackageContainer = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${lightBlack};
`;

export const Card = styled(motion.div)`
  width: 70vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 10vh;
`;

export const AddPackageTitle = styled(motion.div)`
  margin: 20px;
  font-size: 40px;
`;

export const Form = styled(motion.form)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 20px;
`;
export const FormText = styled(motion.div)`
  display: flex;
  flex-direction: column;
  // padding:20px;
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
