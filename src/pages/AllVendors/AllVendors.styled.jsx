import styled from 'styled-components'
import {motion }from 'framer-motion'
import {
    lightBlack
} from '../../components/Colors/colors'

export const AllVendContainer = styled(motion.div)`
padding-top:6vh;
    display:flex;
    flex-direction:row;
    background-color: ${lightBlack};
    height:100%;
    justify-content: center;
    align-items: center;
`

export const IconImage= styled(motion.img)`
width:75px
`