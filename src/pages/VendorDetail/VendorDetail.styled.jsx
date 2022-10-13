import styled from "styled-components";
import { motion } from "framer-motion";

export const VDetailContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 3vh;
  background-color: black;
  color: #eaeaea;
`;

export const VDetailUser = styled(motion.div)`
  width: 80vw;
  display: flex;
  flex-direction: column;
  border: solid 4px #8e793e;
  padding: 20px;
  margin: 20px;
`;

export const TopUserInfo = styled(motion.div)`
  display: flex;
  flex-direction: row;
  border: solid 1px #8e793e;
  justify-content: space-around;
`;

export const BottomUserImages = styled(motion.div)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 10vh;
  border: solid 1px #8e793e;
`;

export const ImageView = styled(motion.img)`
  width: 100px;
  height: 100px;
`;

export const UserInfoLeft = styled(motion.div)`
  display: flex;
  flex-direction: column;
  padding: 1rem 1rem;
`;

export const UserInfoMid = styled(motion.div)`
  display: flex;
  flex-direction: column;
  padding: 1rem 1rem;
`;

export const UserInfoRight = styled(motion.div)`
  display: inline-block;
  flex-direction: column;
  background-color: #8e793e;
  text-align: center;
  padding: 15px 20px;
  font-size: 16px;
  margin: 20px;
  border-radius: 10px;
  box-shadow: 0 2px #999;
  cursor: pointer;
`;
