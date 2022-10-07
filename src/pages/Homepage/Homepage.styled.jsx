import styled from 'styled-components'
import {motion }from 'framer-motion'


export const HomeContainer = styled(motion.div)`
margin-top:5vh;
height:95vh;
width:100vw;

background: url(${(props)=>props.background});  
background-size: cover;
background-repeat: no-repeat;
background-position: center;
display:flex;
justify-content:center;
align-items:center;
`

export const HomeButton  = styled(motion.button)`
padding:20px;
font-size:25px;
color:white;
backGround-color:black;
border-radius:10px;
`