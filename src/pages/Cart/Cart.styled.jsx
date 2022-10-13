import styled from "styled-components";
import { motion } from "framer-motion";
import {lightGold} from '../../components/Colors/colors'


export const CartContainer = styled(motion.div)`
  padding-top:20vh;
  border: solid 1px #8e793e;
  color: #eaeaea;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #231F20;
  width: 100%;
  height:100%;
`;

export const BorderContainer = styled(motion.div)`
  border: solid 3px #8e793e;
  color: #eaeaea;
`;

export const CartBoxDiv = styled(motion.div)`
    border:solid 2px ${lightGold};
    display:flex;
    justify-content:center;
    flex-direction:column;
    margin:50px;
    align-items: center;
    width:60vw;
    max-width:600px;
    height:130px;

`
export const TextSize= styled(motion.div)`
font-weight:700;
text-align:left;

`


export const CartBoxItemDiv = styled(motion.div)`

margin:5px;
display:flex;

`

export const CartBoxItemTitle = styled(motion.h1)`
margin-top: -50px;
margin-bottom:20px;
display:flex;

`

