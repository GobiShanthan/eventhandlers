import {useState, useEffect } from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import Login from '../../components/Login/Login'
import SignUp from '../../components/Signup/SignUp'

import {
    AuthContainer,
    AuthFormWrapper,
    AuthButton
} from './AuthPage.styled'





const AuthPage = () => {
  const {userInfo} = useSelector(state => state.login)
  const navigate = useNavigate()
  const [login,setLogin] = useState(false)

  useEffect(() => {
    if (userInfo && userInfo.name) {
      navigate("/")
    } 
  }, [userInfo])

  return (
    <AuthContainer>
        <AuthFormWrapper>
        {login? <Login /> :<SignUp />}
        <AuthButton onClick={()=>setLogin(!login)}>{login?'SignUp':'Login'}</AuthButton>
        </AuthFormWrapper>
    </AuthContainer>
  )
}

export default AuthPage