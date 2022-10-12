import styled from 'styled-components'
import {motion }from 'framer-motion'


export const CartContainer = styled(motion.div)`
 margin-top:10vh;
 display:flex;
 flex-direction:column;

`


export const BorderContainer = styled(motion.div)`
border:solid 1px black;
`

export const CartBoxDiv = styled(motion.div)`
    border:solid 2px gold;
    display:flex;
    justify-content:center;
    flex-direction:column;
    max-width:50vw;
`