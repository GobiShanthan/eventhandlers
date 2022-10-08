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
        <MenuItem/>
        <MenuItem/>
        <MenuItem/>
        <MenuItem/>
        {user && user.user ? <LogStatusTitle onClick={()=>logout()}>Logout</LogStatusTitle>:<Link to='/auth'><LogStatusTitle>Login</LogStatusTitle></Link>}
        </MenuRight>
    </MenuContainer>
  )
}

export default Menu