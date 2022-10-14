import styled from "styled-components";
import { motion } from "framer-motion";

export const Card = styled(motion.div)`
  width: 70vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 15vw;
`;

export const SignupTitle = styled(motion.div)`
  margin: 20px;
  font-size: 40px;
`;
