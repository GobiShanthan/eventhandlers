import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import ChatModal from '../../components/ChatModal/ChatModal'

import io from 'socket.io-client'

// Material UI imports
import { DataGrid } from '@mui/x-data-grid';
import Search from '../../components/Search/Search'


const AllVendors = () => {
  const [vendors,setVendors] = useState([])
  const [messageHistory, setMessageHistory] = useState([])
  const navigate = useNavigate()
  const {userInfo} = useSelector(state => state.login)
  let socket = io();

  // this code block will update User's socketID in the backend
  // socket.on('connAcknowledge', (msg) => {
  //     socket.emit('newUser',{
  //       Id: userInfo._id,
  //       name: userInfo.name})
  //   });

  socket.on('feedbackOffline', )
  
  socket.on('feedbackOnline', msg => {
    let messageDetails = {
      'user': msg.user,
      // 'userId': msg.userId, 
      'message': msg.message, 
      // 'recipientId': msg.recipientId
    }
   
    
    setMessageHistory([...messageHistory, messageDetails]);
  })
 

  const handleAllPackages = (params) => {
    return (
      <button onClick={() => {
        const currentRow = params.row;
              // return alert(JSON.stringify(currentRow, null, 4));
              let id = JSON.stringify(currentRow._id).split('"')
       
              navigate(`/vendors/${id[1]}`)
      } }>Packages</button>
    )
  }

  // const handleOpenChat = (params) => {
  //   return (
  //     <button onClick={() => {
  //       const currentRow = params.row;
  //       console.log(currentRow);
  //       <ChatModal />
  //     }}>Open Chat</button>
  //   )
  // }

  const columns = [
    { field: '_id', id: '_id', width:200 },
    { field: 'createdAt', headerName: 'Created At', width: 200},
    { field: 'email', headerName: 'Email', width: 200},
    {field: 'name',headerName: 'Name', width: 200},
    {
      field: 'column1',
      headerName: 'View Packages',
      width: 180,
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: handleAllPackages
      // getActions: (params) => [
      //   <button onClick={handleAllPackages} label="Delete" >All Packages</button>,
      // ]
     

      // renderCell: (params) => {
      //     const onHandleCLick = (e) => {
      //       const currentRow = params.row;
      //       // return alert(JSON.stringify(currentRow, null, 4));
      //       let id = JSON.stringify(currentRow._id).split('"')
     
      //       navigate(`/vendors/${id[1]}`)
      //     };
          
      //     return (
      //       <>
      //       <button onClick={onHandleCLick} >Packages</button>
      //       </>
            
      //     );
      // },
    },
  ];
  

  const getVendors = async()=>{
    let jwt = localStorage.getItem('token')
    let options={
      header:{
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + jwt
      },
    }
    try{
      let fetchResponse = await fetch('/api/users/vendors',options)
      if(!fetchResponse.ok) throw new Error('Fetch failed - Bad request')
      let data = await fetchResponse.json()
      setVendors(data)

    }catch(err){
      console.log(err)
    }
    
  }

  useEffect(()=>{
    if(vendors.length < 1){
      getVendors()
    }
  },[vendors])


  return (
    <div style={{ height: 400, width: '100%', marginTop: '10vh'}}>
      
    <DataGrid
      getRowId={(row) => row._id}
      rows={vendors && vendors}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
    />
    <Search />
    <ul>
      {vendors && vendors.map(v => (
        <div key={v._id} > 
          <h1>Name : {v.name}</h1>
          {console.log('hello world -------------------------------')}
          <ChatModal vendorId={v._id} messageHistory={messageHistory} setMessageHistory={setMessageHistory}/>
        </div>
      )
      )}
    </ul>
  
  </div>
  )
}

export default AllVendors
