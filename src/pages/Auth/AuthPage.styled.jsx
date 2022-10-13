import styled from 'styled-components'
import {motion }from 'framer-motion'

import { darkGold, lightGold, lightBlack, grey } from '../../components/Colors/colors'

export const AuthContainer = styled(motion.div)`
height:100vh;
width:100vw;
color:white;
display:flex;
justify-content:center;
align-items:center;
background-color: ${lightBlack};
`

export const AuthFormWrapper  = styled(motion.div)`
display:flex;
justify-content:center;
align-items:center;
border: solid 5px;
border-color: ${darkGold};
color: ${grey};
max-width:500px;
width:80vw;
height:60%;
position: relative;
`

export const AuthButton  = styled(motion.button)`
padding:10px;
font-size:25px;
background-color:${grey};
color:${lightGold};
position:absolute;
bottom:0px;
left: 50%; 
transform: translate(-50%, -50%);
`