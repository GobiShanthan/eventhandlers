import {useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {addToCart} from '../../redux/reducers/cartSlice'


import {
  VDetailContainer,
  VDetailUser,
  TopUserInfo,
  BottomUserImages,
  ImageView,
  UserInfoLeft,
  UserInfoMid,
  UserInfoRight
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
        {data ? data.map(d=>(
          <VDetailUser key={d._id}>
            <TopUserInfo> 
              <UserInfoLeft>
                <h1>{d.title}</h1>
                <h3>{d.description}</h3>
                <h3>CAD ${d.price}</h3>

              </UserInfoLeft>
              <UserInfoMid>
                <h3>Date: {d.createdAt.split('T')[0]}</h3>
                <h3>Capacity: {d.capacity}</h3>
              </UserInfoMid>
              <UserInfoRight>
                {userId && d.user === userId?<button style={{background: 'black',color:'white'}} onClick={()=>deletePackage(d._id)}>DELETE</button>:<button onClick={()=>dispatch(addToCart(d))}> ADD TO CART</button>}
              </UserInfoRight>  
             
            
            
            </TopUserInfo>
         <BottomUserImages>
         <ImageView src={d.photos ?d.photos:'https://a.cdn-hotels.com/gdcs/production61/d931/c994bd00-cb15-11e8-9739-0242ac110006.jpg?impolicy=fcrop&w=1600&h=1066&q=medium'} alt={d.title}/>
         </BottomUserImages>
          </VDetailUser>
        )) :<h1>No Packages for this user</h1>}



    </VDetailContainer>
  )
}

export default VendorDetail