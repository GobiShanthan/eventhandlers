import styled from 'styled-components'
import {motion }from 'framer-motion'
import {lightBlack, grey} from '../../components/Colors/colors'

export const LoginContainer = styled(motion.div)`
background-color:white;
box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
color:black;
height:50vh;
width:50vw;
min-width:300px;
max-width:800px;
max-height:1200px;
min-height:400px;
display:flex;
justify-content:center;

`

export const LoginTitle = styled(motion.div)`
margin: 20px;
font-size: 40px;

`

export const LoginForm= styled(motion.form)`
font-size:20px;
display:flex;
flex-direction:column;
text-align:center;

`

export const Input = styled(motion.input)`
font-size:15px;
border:solid 1px green;
padding:10px;
border-radius:15px;
margin-top:10px;

`

export const Button = styled(motion.button)`
margin-top:20px;
font-size:20px;
background:black;
color:white;
padding:10px;

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