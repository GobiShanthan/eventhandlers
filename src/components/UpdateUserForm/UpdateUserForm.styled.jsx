import styled from 'styled-components'
import {motion }from 'framer-motion'
import {lightBlack, grey} from '../../components/Colors/colors'

export const FlexContainer = styled(motion.div)`
    padding-top: 10vh;
    display:flex;
    justify-content:center;
    // align-items: center;
    flex-direction:column;
    height: 70vh;
    width: 50vw;
    background-color: ${lightBlack};
    color: ${grey};
    
`


export const Card = styled(motion.div)`
    width: 70vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: 15vw;
    
`

export const Heading = styled(motion.div)`
margin: 20px;
font-size: 40px;
`