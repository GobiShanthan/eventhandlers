import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/reducers/LoginSlice';
import {
    MenuContainer,
    MenuLeft,
    MenuMid,
    MenuRight
} from './Menu.styled'

const Menu = () => {
  const dispatch = useDispatch()
  const {userInfo} = useSelector(state => state.login)
  const logout = () => {
    dispatch(logoutUser())
  }

  return (
    <MenuContainer>
        <MenuLeft><Link to='/'>EVENT HANDLERS</Link></MenuLeft>
        <MenuMid>{userInfo && userInfo.name ? userInfo.name : ''}</MenuMid>
        <MenuRight>
        {userInfo && userInfo.name ? <h1 onClick={()=>logout()}>Logout</h1>:<Link to='/auth'><h3>Login</h3></Link>}
        </MenuRight>
    </MenuContainer>
  )
}

export default Menu