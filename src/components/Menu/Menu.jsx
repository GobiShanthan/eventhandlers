import {Link} from 'react-router-dom'
import MenuItem from '../MenuItems/MenuItem'
import {
    MenuContainer,
    MenuLeft,
    MenuMid,
    MenuRight,
    LogStatusTitle
} from './Menu.styled'

const Menu = ({user,logout}) => {
  return (
    <MenuContainer>
        <MenuLeft><Link to='/'>EVENT HANDLERS</Link></MenuLeft>
        <MenuMid></MenuMid>
        <MenuRight>
          { user && user.user&&
        <>
        <MenuItem name='packages' link='packages'/>
        <MenuItem name='Vendors' link=''/>
        <MenuItem name='Cart' link=''/>
        <MenuItem name='About' link=''/>
        </> }
        {user && user.user ? <LogStatusTitle onClick={()=>logout()}>Logout</LogStatusTitle>:<Link to='/auth'><LogStatusTitle>Login</LogStatusTitle></Link>}
        </MenuRight>
    </MenuContainer>
  )
}

export default Menu