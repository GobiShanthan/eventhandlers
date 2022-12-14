import styled from 'styled-components'
import {motion }from 'framer-motion'

export const FlexContainer = styled(motion.div)`
    margin-top:20vh;
    display:flex;
    justify-content:center;
    flex-direction:row;
    
`


export const Card = styled(motion.div)`
display:flex;
flex-direction:column;
box-shadow: 
rgba(0, 0, 0, 0.09) 0px 2px 1px, 
rgba(0, 0, 0, 0.09) 0px 4px 2px,
rgba(0, 0, 0, 0.09) 0px 8px 4px, 
rgba(0, 0, 0, 0.09) 0px 16px 8px, 
rgba(0, 0, 0, 0.09) 0px 32px 16px;

background-color: lightgrey;

`
