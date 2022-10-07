import {useState} from 'react'
import Login from '../../components/Login/Login'
import SignUp from '../../components/Signup/SignUp'

import {
    AuthContainer,
    AuthFormWrapper,
    AuthButton
} from './AuthPage.styled'





const AuthPage = ({authUser}) => {
  
  const [login,setLogin] = useState(false)
  return (
    <AuthContainer>
        <AuthFormWrapper>
        {login? <Login authUser={authUser}/> :<SignUp authUser={authUser} />}
        <AuthButton onClick={()=>setLogin(!login)}>{login?'SignUp':'Login'}</AuthButton>
        </AuthFormWrapper>
    </AuthContainer>
  )
}

export default AuthPage