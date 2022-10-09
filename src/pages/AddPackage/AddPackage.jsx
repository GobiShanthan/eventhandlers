import {useState} from 'react'


const AddPackage = () => {
  const [formData,setFormData] = useState({
    title:'',
    description:'',
    price:0,
    capacity:''
  })

  const handleChange = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const onSubmit = async(e)=>{
    e.preventDefault()

      try {
        let jwt = localStorage.getItem('token')
        let fetchResponse = await fetch("/api/packages/create", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization":"Bearer " + jwt
         },
          body: JSON.stringify(formData), // <-- send this object to server
        });
        let serverResponse = await fetchResponse.json(); // <-- decode fetch response
        console.log("Success:", serverResponse); // <-- log server response
  
      
      } catch (err) {
        console.error("Error:", err); // <-- log if error
      }
  
  }


  return (
    <div style={{marginTop:'10vh'}}>
      <form onSubmit={(e)=>onSubmit(e)}>
        <input name='title' type='text' onChange ={(e)=>handleChange(e)} value={formData.title} style={{border:'solid 2px red'}}/>
        <textarea name='description' rows="4" cols="50" onChange ={handleChange} value={formData.description} style={{border:'solid 2px red'}}/>
        <input name='price' type='Number' min={1} max={10000000} onChange ={handleChange} value={formData.price} style={{border:'solid 2px red'}}/>
        <input name='capacity' type='String' onChange ={handleChange} value={formData.capacity} style={{border:'solid 2px red'}}/>
        <button type='submit'>Create</button>
      </form>
    </div>
  )
}

export default AddPackage
