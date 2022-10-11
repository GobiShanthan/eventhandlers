import styled from 'styled-components'
import {motion }from 'framer-motion'

export const VDetailContainer = styled(motion.div)`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    margin-top:10vh;

`

export const VDetailUser = styled(motion.div)`
    width:80vw;
    display:flex;
    flex-direction:column;
    border: solid 1px black;
    padding:20px;
    margin:20px;
`

export const TopUserInfo = styled(motion.div)`
    display:flex;
    flex-direction:row;
    border: solid 1px black;
    justify-content: space-around;
`

export const BottomUserImages = styled(motion.div)`
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
    margin-top:10vh;
    border: solid 1px black;
`


export const ImageView = styled(motion.img)`
width:100px;
height:100px;
`


export const UserInfoLeft = styled(motion.div)`
display:flex;
flex-direction:column;

`

export const UserInfoMid = styled(motion.div)`
display:flex;
flex-direction:column;
`


export const UserInfoRight = styled(motion.div)`
display:flex;
flex-direction:column;
`