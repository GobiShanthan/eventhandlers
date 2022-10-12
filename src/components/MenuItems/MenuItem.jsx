import React from 'react'
import {Link} from 'react-router-dom'
import {
    MenuItemContainer,
} from './MenuItem.styled'



const MenuItem = ({name,link}) => {
  return (
    <MenuItemContainer>
        <Link style={{ color:'black', textDecoration:'none'}} to={link}>
            {name}
        </Link>
    </MenuItemContainer>
  )
}

export default MenuItem