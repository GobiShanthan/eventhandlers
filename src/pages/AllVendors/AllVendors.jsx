import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

import { DataGrid } from '@mui/x-data-grid';


const AllVendors = () => {
  const [vendors,setVendors] = useState([])
  const navigate = useNavigate()

  const columns = [
    { field: '_id', id: '_id', width:200 },
    { field: 'createdAt', headerName: 'Created At', width: 200},
    { field: 'email', headerName: 'Email', width: 200},
    {field: 'name',headerName: 'Name', width: 200},
    {
      field: 'action',
      headerName: 'Action',
      width: 180,
      sortable: false,
      disableClickEventBubbling: true,
      
      renderCell: (params) => {
          const onHandleCLick = (e) => {
            const currentRow = params.row;
            // return alert(JSON.stringify(currentRow, null, 4));
            let id = JSON.stringify(currentRow._id).split('"')
     
            navigate(`/vendors/${id[1]}`)
          };
          
          return (
            <>
            <button onClick={onHandleCLick} >Packages</button>
            </>
            
          );
      },
    }

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
  </div>
  )
}

export default AllVendors
