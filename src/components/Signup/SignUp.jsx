import React,{useState,useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signupUser } from '../../redux/apiCalls/signup'
import {
  SignUpContainer,
  SignUpTitle,
  SignUpForm,
  Input,
  Button,

} from './Signup.styled'

const SignUp = ({authUser}) => {
  const dispatch = useDispatch();
  const [signData, setSignData] = useState({
    name:'',
    email:'',
    password:'',
    error:''
  })



  const handleChange =(e)=>{
    setSignData({...signData,[e.target.name]: e.target.value})
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    console.log(signData)
    await signupUser({name: signData.name, email:signData.email, password:signData.password},dispatch)
  }

  // const  handleSubmit = async(e)=>{
  //   e.preventDefault()

  //   try {
  //     //1 POST our new user to our server
  //     const options ={
  //       method:'POST',
  //       headers:{'Content-Type': 'application/json'},
        
  //       body:JSON.stringify({
  //         name: signData.name,
  //         email:signData.email,
  //         password:signData.password})
  //     }
  //     const fetchResponse = await fetch('/api/users/signup',options)
  //     if(!fetchResponse.ok) throw new Error('Fetch failed - Bad request')
  //     let token = await fetchResponse.json()
  //     localStorage.setItem('token',token)
  //     let user = JSON.parse(window.atob(token.split('.')[1])).user
  //     authUser(user)
  //   } catch (err) {
  //     setSignData({...signData,error:err})
     
  //   }

  // }


  return (
    <SignUpContainer>
      <SignUpForm onSubmit={(e) => onSubmit(e)}>
      <SignUpTitle>Sign Up</SignUpTitle>
    
      
        <Input placeholder="Enter name" required  name='name' value={signData.name}  onChange={ handleChange}/>
        <Input placeholder='Enter email' required name ='email'   value={signData.email} onChange={handleChange}/>
        <Input placeholder='Enter password' required name='password' value={signData.password} onChange={handleChange}/>

        <Button>Submit</Button>
      </SignUpForm>

    </SignUpContainer>
  )
}

export default SignUp