import styled from 'styled-components'
import {motion} from 'framer-motion'

export const MenuContainer = styled(motion.div)`
height:5vh;
width:100vw;
position:absolute;
top:0px;
display:grid;
grid-template-columns: 1fr 5fr 1fr;
align-items:center;

`

export const MenuLeft = styled(motion.div)`
justify-self:center;
`

export const MenuMid = styled(motion.div)`
justify-self:center;
`

export const MenuRight = styled(motion.div)`
justify-self:center;
display:flex;
margin-right:2vw;
`

export const LogStatusTitle = styled(motion.button)`
justify-self:center;
color:black;
padding:10px;
color:white;
background-color:#ad974f;

`

