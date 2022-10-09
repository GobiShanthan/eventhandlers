import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/reducers/LoginSlice';
import MenuItem from '../MenuItems/MenuItem'
import {
    MenuContainer,
    MenuLeft,
    MenuMid,
    MenuRight,
    LogStatusTitle
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
          { user && user.user&&
        <>
        <MenuItem name='packages' link='packages'/>
        <MenuItem name='Vendors' link=''/>
        <MenuItem name='Cart' link=''/>
        <MenuItem name='About' link=''/>
        </> }
        {userInfo && userInfo.name ? <LogStatusTitle onClick={()=>logout()}>Logout</LogStatusTitle>:<Link to='/auth'><LogStatusTitle>Login</LogStatusTitle></Link>}
        </MenuRight>
    </MenuContainer>
  )
}

export default Menu