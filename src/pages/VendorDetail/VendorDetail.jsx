import {useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'

const VendorDetail = () => {
  const [data, setData] = useState(null)
  const params = useParams()
  const vendorId = params['id']



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
    <div>
      <ul>
        {data ? data.map(d=>(
          <li key={d._id}>
            <h1>{d.title}</h1>
            <button style={{background: 'black',color:'white'}} onClick={()=>deletePackage(d._id)}>DELETE</button>
          </li>
        )) :<h1>No Packages for this user</h1>}
      </ul>
    </div>
  )
}

export default VendorDetail