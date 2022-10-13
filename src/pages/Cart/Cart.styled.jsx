import styled from "styled-components";
import { motion } from "framer-motion";

export const CartContainer = styled(motion.div)`
  border: solid 1px #8e793e;
  color: #eaeaea;
  display: flex;
  flex-direction: column;
  padding: 5rem;
  margin: 4rem;
  background-color: #231F20;
`;

export const BorderContainer = styled(motion.div)`
  border: solid 3px #8e793e;
  color: #eaeaea;
`;

export const CartBoxDiv = styled(motion.div)`
    border:solid 2px gold;
    display:flex;
    justify-content:center;
    flex-direction:column;
    max-width:50vw;
`