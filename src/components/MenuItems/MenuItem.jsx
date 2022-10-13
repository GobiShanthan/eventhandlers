import React from 'react'
import {Link} from 'react-router-dom'
import {
    MenuItemContainer,
} from './MenuItem.styled'
import {
  lightGold
} from '../Colors/colors'


const MenuItem = ({name,link}) => {
  return (
    <Link style={{ color:'black', textDecoration:'none'}} to={link}>
    <MenuItemContainer whileHover={{scale:1.1,backgroundColor:lightGold,color:'white'}} whileTap={{scale:.9}}>
      <div style={{textAlign:'center'}}>{name}</div>
    </MenuItemContainer>
    </Link>
  )
}

export default MenuItem