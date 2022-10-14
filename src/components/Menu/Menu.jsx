import {Link} from 'react-router-dom'
import {useEffect,useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/reducers/LoginSlice';
import thumbnail from '../../images/thumbnail.webp'
import MenuItem from '../MenuItems/MenuItem'
import {
    MenuContainer,
    MenuLeft,
    MenuMid,
    MenuRight,
    LogStatusTitle,
    ImageLogo
} from './Menu.styled'

// MATERIAL UI ICONS
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PersonIcon from '@mui/icons-material/Person';

const Menu = () => {
  const dispatch = useDispatch()
  const {userInfo} = useSelector(state => state.login)
  const cartData = useSelector(state => state.cartData)
  const cartNum = cartData.cart.length




  const [windowSize, setWindowSize] = useState(getWindowSize());

  function getWindowSize() {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
  }



  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);



  const logoVariants ={
    hidden:{
      opacity:0,
      scale:0,
      x:'-100px',
      rotate:0,
    },
    visible:{
      opacity: 1,
      scale:1 ,
      rotate:360,
      x:'0px',
      transition: {type:'spring',duration:2.5,ease:'easeInOut',delay:2.3}
    },
    exit:{
  
    }
  }
  


  const logout = () => {
    dispatch(logoutUser())
  }

if(windowSize && windowSize.innerWidth < 1100){
  //MOBILE MENU
return (
  <MenuContainer>
  <MenuLeft><Link to='/'><ImageLogo variants={logoVariants} initial='hidden' animate='visible' exit='exit' src={thumbnail}/></Link></MenuLeft>

  <MenuRight>
  {userInfo && userInfo.name ?
    <div style={{display:'flex'}}>
    <Link style={{color:'black',margin:'5px'}} to='/package/add'><CreateNewFolderIcon sx={{fontSize:'40px' ,margin:'5px'}}/> </Link>
    <Link style={{color:'black',margin:'5px'}} to='/vendors'><StorefrontIcon sx={{fontSize:'40px',margin:'5px'}}/> </Link>
    <Link style={{color:'black',margin:'5px'}} to='/userpage'><PersonIcon sx={{fontSize:'40px',margin:'5px'}}/> </Link>
    
    <Link style={{color:'black',margin:'5px'}} to='/cart'> 
    <ShoppingCartIcon  sx={{fontSize:'40px',margin:'5px'}}/>
   </Link>
   <div style={{margin:'20px',fontWeight:'700',cursor:'pointer'}} onClick={()=>logout()}>Logout</div>
    </div>

   :<Link to='/auth'><LogStatusTitle whileHover={{backgroundColor:"#Ad974F",color:'white'}}>Login</LogStatusTitle></Link>}
  </MenuRight>
</MenuContainer>
)
}else{
  //FULL PAGE 
  return (
    <MenuContainer>
        <MenuLeft><Link to='/'><ImageLogo variants={logoVariants} initial='hidden' animate='visible' exit='exit' src={thumbnail}/></Link></MenuLeft>
        <MenuMid></MenuMid>
        <MenuRight>
          { userInfo && userInfo.name&&
        <>
        <MenuItem name='My Package' link='package/add'/>
        <MenuItem name='Vendors' link='/vendors'/>
        <MenuItem name='Profile' link='/userpage'/>
        <MenuItem name='Cart' link='/cart'/>
        </> }
        {userInfo && userInfo.name ? <LogStatusTitle onClick={()=>logout()}>Logout</LogStatusTitle>:<Link to='/auth'><LogStatusTitle whileHover={{backgroundColor:"#Ad974F",color:'white'}}>Login</LogStatusTitle></Link>}
        </MenuRight>
    </MenuContainer>
  )
}

}

export default Menu