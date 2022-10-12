import styled from 'styled-components'
import {motion }from 'framer-motion'

import { darkGold, lightGold, lightBlack, grey } from '../../components/Colors/colors'

export const AuthContainer = styled(motion.div)`
margin-top:7vh;
height:100vh;
width:100vw;
color:white;
display:flex;
justify-content:center;
align-items:center;
background-color: ${lightBlack};
`

export const AuthFormWrapper  = styled(motion.div)`
`

export const AuthButton  = styled(motion.button)`
padding:20px;
font-size:25px;
color:white;
backGround-color:black;
border-radius:10px;


`