import {useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {addToCart} from '../../redux/reducers/cartSlice'
import {Button} from '@mui/material'
import {lightGold} from '../../components/Colors/colors'
import {
  VDetailContainer,
  VDetailUser,
  TopUserInfo,
  BottomUserImages,
  ImageView,
  UserInfoLeft,
  UserInfoMid,
  UserInfoRight,
  TextDiv
} from './VendorDetail.styled'



const VendorDetail = () => {

  const dispatch = useDispatch()
  const [data, setData] = useState(null)
  const params = useParams()
  const vendorId = params['id']


  
  const {userInfo} = useSelector((state)=>state.login)

  let userId = userInfo && userInfo._id ? userInfo._id:null


  //FETCH LISTS ASSOCIATED WITH THE USER 
  const fetchLists = async()=>{
    let jwt = localStorage.getItem('token')
    let options={
      method:"GET",
      header:{
        'Content-Type':"application/json",
        'Authorization':'Bearer ' + jwt
    }
  }
    try{
      let fetchResponse = await fetch(`/api/packages/${vendorId}`,options)
      if(!fetchResponse.ok) throw new Error('Fetch failed - Bad request')
      let datanew = await fetchResponse.json()
      setData(datanew)
   
    }catch(err){
      console.log(err, 'inside the packages list file')
    }
  }

  //DELETE LIST ITEM 
  const deletePackage = async(pkId)=>{
    let jwt = localStorage.getItem('token')
    let options={
      method:"DELETE",
      header:{
        'Content-Type':"application/json",
        'Authorization':'Bearer ' + jwt
    }
  }
    try{
      let fetchResponse = await fetch(`/api/packages/${pkId}`,options)
      if(!fetchResponse.ok) throw new Error('Fetch failed - Bad request')
      fetchLists()
    }catch(err){
      console.log(err, 'inside the packages list file')
    }
  }



  useEffect(()=>{
    if(!data){
      fetchLists()
    }
  })


  return (
    <VDetailContainer>
        {data ? data.map((d,i)=>(
          <VDetailUser key={d._id}>
            <TopUserInfo>

              <UserInfoLeft>
                
                <h1>{d.title}</h1>
                <h3>{d.description}</h3>
                <h3>CAD ${d.price.toFixed(2)}</h3>
              </UserInfoLeft>

              <UserInfoMid>
                <h2>Date: {d.createdAt.split('T')[0]}</h2>
                <h3>Capacity: {d.capacity}</h3>
              </UserInfoMid>


            </TopUserInfo>
            
         <BottomUserImages>
         <ImageView src={d.image ? d.image:'https://a.cdn-hotels.com/gdcs/production61/d931/c994bd00-cb15-11e8-9739-0242ac110006.jpg?impolicy=fcrop&w=1600&h=1066&q=medium'} alt={d.title}/>
         {userId && d.user === userId?<Button style={{
                  justifySelf: "center",
                  margin: "20px",
                  backgroundColor: `${lightGold}`,
                  alignItems: 'center',

                }} variant="contained" onClick={()=>deletePackage(d._id)}>DELETE</Button>:<Button style={{
                  justifySelf: "center",
                  margin: "20px",
                  backgroundColor: `${lightGold}`,
                  alignItems: 'center',
                }} variant="contained" onClick={()=>dispatch(addToCart(d))}> ADD TO CART</Button>}
         </BottomUserImages>
          </VDetailUser>
        )) :<h1>No Packages for this user</h1>}

    </VDetailContainer>
  )
}

export default VendorDetail