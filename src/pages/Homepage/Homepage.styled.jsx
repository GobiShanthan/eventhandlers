import styled from "styled-components";
import { motion } from "framer-motion";

export const HomeContainer = styled(motion.div)`
  height: 100%;
  width: 100vw;
  background: black;
  color: white;
  background-color: #231f20;
  display: grid;
`;
export const LogoWrapper = styled(motion.div)`
  margin-top: 14vh;
  max-height: 500px;
  position: relative;
  height: 800px;
  position: relative;
`;

export const GoldPaint = styled(motion.img)`
  height: 500px;
  width: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const GoldBorder = styled(motion.img)`
  height: 500px;
  width: 500px;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
export const EH = styled(motion.img)`
  width: 280px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Handlers = styled(motion.img)`
  width: 270px;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
export const Event = styled(motion.img)`
  width: 370px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
