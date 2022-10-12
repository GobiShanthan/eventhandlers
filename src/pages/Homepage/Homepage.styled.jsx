import styled from 'styled-components'
import {motion }from 'framer-motion'


export const HomeContainer = styled(motion.div)`
min-height:100vh;
width:100vw;
background: url(${(props)=>props.background}); 
background-color: black;
background-size: contain;
background-repeat: no-repeat;
background-position: center;
text-align: center;
color: white;
background-color: black;




`

