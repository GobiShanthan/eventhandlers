import styled from "styled-components";
import { motion } from "framer-motion";

export const VDetailContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 10vh;
  background-color: black;
  color: #eaeaea;

`;

export const VDetailUser = styled(motion.div)`
  width: 60vw;
  display: flex;
  flex-direction: column;
  border: solid 4px #8e793e;
  padding: 20px;
  margin: 20px;
`;
export const TextDiv = styled(motion.div)`
  display: flex;
`;
export const TopUserInfo = styled(motion.div)`
  display: flex;
  flex-direction: row;
  border: solid 1px #8e793e;
  justify-content: space-evenly;
`;

export const BottomUserImages = styled(motion.div)`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 1vh;

`;

export const ImageView = styled(motion.img)`
  width: 30vw;

`;

export const UserInfoLeft = styled(motion.div)`
  display: flex;
  flex-direction: column;
  padding: 1rem 1rem;
  flex:1;
`;

export const UserInfoMid = styled(motion.div)`
  display: flex;
  flex-direction: column;
  padding: 1rem 1rem;
  flex:1;
  text-align: left
`;

export const UserInfoRight = styled(motion.div)`
  display:block;
  cursor: pointer;
`;
