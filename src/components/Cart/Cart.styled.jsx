import styled from "styled-components";
import { motion } from "framer-motion";

export const BorderContainer = styled(motion.div)`
  border: solid 3px #8e793e;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin: 20px;
  width: 80vw;
`;

export const CartWrapper = styled(motion.div)`
  border: solid 3px #8e793e;
  display: grid;
  grid-template-columns: 1fr 2fr 0.7fr 0.5fr;
  width: 100%;
  padding: 10px;
  margin: 5px;
`;
export const TextDiv = styled(motion.div)`
  text-align: center;
  display: flex;
  align-items: center;
`;
