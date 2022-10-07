import {Link} from 'react-router-dom'
import {
    MenuContainer,
    MenuLeft,
    MenuMid,
    MenuRight
} from './Menu.styled'

const Menu = ({user,logout}) => {
  return (
    <MenuContainer>
        <MenuLeft><Link to='/'>EVENT HANDLERS</Link></MenuLeft>
        <MenuMid>{user && user.user && user.user.name}</MenuMid>
        <MenuRight>
        {user && user.user ? <h1 onClick={()=>logout()}>Logout</h1>:<Link to='/auth'><h3>Login</h3></Link>}
        </MenuRight>
    </MenuContainer>
  )
}

export default Menu