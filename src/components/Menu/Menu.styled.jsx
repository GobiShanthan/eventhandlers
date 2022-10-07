import styled from 'styled-components'
import {motion} from 'framer-motion'

export const MenuContainer = styled(motion.div)`
height:5vh;
width:100vw;
background-color:blue;
position:absolute;
top:0px;
display:grid;
grid-template-columns: 1fr 5fr 1fr;
align-items:center;

`

export const MenuLeft = styled(motion.div)`
background-color:green;
justify-self:center;
`

export const MenuMid = styled(motion.div)`

background-color:purple;
justify-self:center;
`

export const MenuRight = styled(motion.div)`

background-color:yellow;
justify-self:center;
`

