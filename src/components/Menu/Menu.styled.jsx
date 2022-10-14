import styled from "styled-components";
import { motion } from "framer-motion";

export const MenuContainer = styled(motion.div)`
  position: fixed;
  background-color: #eaeaea;
  display: flex;
  justify-content: space-around;
  align-items: center;
  top: 0px;
  width: 100vw;
  height: 5rem;
`;

export const MenuLeft = styled(motion.div)`
  justify-content: center;
  align-items: center;
`;

export const MenuMid = styled(motion.div)`
  width: 50px;
  margin: 10px;
  padding: 10px;
  font-size: 20px;
  color: black;
`;

export const MenuRight = styled(motion.div)``;

export const LogStatusTitle = styled(motion.button)`
  width: 100px;
  margin: 20px;
  padding: 20px;
  font-size: 20px;
  text-decoration: none;
`;

export const ImageLogo = styled(motion.img)`
  max-width: 70px;
  max-height: 70px;
`;
