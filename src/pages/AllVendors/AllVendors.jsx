import React,{useState,useEffect} from 'react'
import {useNavigate,Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import ChatModal from '../../components/ChatModal/ChatModal'
import chatIcon from '../../images/chatIcon.webp'
import io from 'socket.io-client'

import {
  IconImage
} from '../../pages/AllVendors/AllVendors.styled'


// Material UI imports
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import {Button} from '@mui/material'

import {
lightBlack,
lightGold,
grey
} from '../../components/Colors/colors'

import {
  AllVendContainer,

} from './AllVendors.styled'


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: `${lightGold}`,
    color: `${lightBlack}`,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const AllVendors = () => {
  const [vendors,setVendors] = useState([])
  const [messageHistory, setMessageHistory] = useState([])
  const navigate = useNavigate()
  const {userInfo} = useSelector(state => state.login)
  let socket = io();

  // this code block will update User's socketID in the backend, comment out lines 21 to 25 to disable socket.io
  socket.on('connAcknowledge', (msg) => {
      socket.emit('newUser',{
        Id: userInfo._id,
        name: userInfo.name})
    });

  socket.on('feedbackOffline', )
  
  socket.on('feedbackOnline', msg => {
    let messageDetails = {
      'user': msg.user,
      'message': msg.message, 
    }
    setMessageHistory([...messageHistory, messageDetails]);
  })
 

  // const handleAllPackages = (params) => {
  //   return (
  //     <button onClick={() => {
  //       const currentRow = params.row;
  //             // return alert(JSON.stringify(currentRow, null, 4));
  //             let id = JSON.stringify(currentRow._id).split('"')
       
  //             navigate(`/vendors/${id[1]}`)
  //     } }>Packages</button>
  //   )
  // }


  // const columns = [
  //   { field: '_id', id: '_id', width:200 },
  //   { field: 'createdAt', headerName: 'Created At', width: 200},
  //   { field: 'email', headerName: 'Email', width: 200},
  //   {field: 'name',headerName: 'Name', width: 200},
  //   {
  //     field: 'column1',
  //     headerName: 'View Packages',
  //     width: 180,
  //     sortable: false,
  //     disableClickEventBubbling: true,
  //     renderCell: handleAllPackages
  //     // getActions: (params) => [
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
  //     // },
  //   },
  // ];
  

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
    <AllVendContainer>

    <TableContainer component={Paper} sx={{ margin:'50px', maxWidth:600}}>
      <Table sx={{ minWidth:300}} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="center">Add To Cart</StyledTableCell>
            <StyledTableCell align="center">Chat</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vendors && vendors.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center">
                <Button style={{
                  justifySelf: "center",
                  margin: "20px",
                  backgroundColor: `${lightGold}`,
                  alignItems: 'center',
                }} variant="contained">
                  <Link to={`/vendors/${row._id}`} style={{color:grey,textDecoration:'none'}}>  View Package</Link>
                  </Button>
                   </StyledTableCell>
              <StyledTableCell align="center">  <ChatModal vendorId={row._id} messageHistory={messageHistory} setMessageHistory={setMessageHistory}/></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

{/* 
    <Search /> */}
    {/* <ul>
      {vendors && vendors.map(v => (
        <div key={v._id} > 
          <h1>Name : {v.name}</h1>
          <ChatModal vendorId={v._id} messageHistory={messageHistory} setMessageHistory={setMessageHistory}/>
        </div>
      )
      )}
    </ul> */}
  
  </AllVendContainer>
  )
}

export default AllVendors
