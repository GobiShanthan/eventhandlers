import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/reducers/LoginSlice';
import thumbnail from '../../images/thumbnail.svg'
import MenuItem from '../MenuItems/MenuItem'
import {
    MenuContainer,
    MenuLeft,
    MenuMid,
    MenuRight,
    LogStatusTitle
} from './Menu.styled'

// MATERIAL UI ICONS
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

const Menu = () => {
  const dispatch = useDispatch()
  const {userInfo} = useSelector(state => state.login)
  const cartData = useSelector(state => state.cartData)
  const cartNum = cartData.cart.length
  const logout = () => {
    dispatch(logoutUser())
  }


  return (
    <MenuContainer>
      {console.log(cartData)}
        <MenuLeft><Link to='/'><img src={thumbnail} /></Link></MenuLeft>
        <MenuMid>{userInfo && userInfo.name ? userInfo.name : ''}</MenuMid>
        <MenuRight>
          { userInfo && userInfo.name&&
        <>
        <MenuItem name='About' link=''/>
        <MenuItem name='Packages' link='packages'/>
        <MenuItem name='Vendors' link='/vendors'/>
        <MenuItem name='UserPage' link='/userpage'/>
        <MenuItem name='Cart' link='/cart'/>
        <Badge badgeContent={cartNum?cartNum:0} color="primary" style={{marginTop:'2vh'}}>
        <ShoppingCartIcon color="action" />
        </Badge>
        </> }
        {userInfo && userInfo.name ? <LogStatusTitle onClick={()=>logout()}>Logout</LogStatusTitle>:<Link to='/auth'><LogStatusTitle>Login</LogStatusTitle></Link>}
        </MenuRight>
    </MenuContainer>
  )
}

export default Menu