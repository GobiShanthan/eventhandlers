import styled from "styled-components";
import { motion } from "framer-motion";
import { lightBlack } from "../../components/Colors/colors";

export const CheckoutContainer = styled(motion.div)`
  padding: 10vh;
  color: #eaeaea;
  background-color: ${lightBlack};
  height: 100%;
`;

export const BoxContainer = styled(motion.div)`
  color: #eaeaea;
  box-sizing: content-box;
  border: 3px solid #ad974f;
  padding: 3rem;
  height: 50vh;
  position: relative;
`;
