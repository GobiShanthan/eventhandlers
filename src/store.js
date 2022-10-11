import {configureStore} from '@reduxjs/toolkit';
import loginReducer from './redux/reducers/LoginSlice'
import signUpReducer from './redux/reducers/SignupSlice'
import packageReducer from './redux/reducers/PackageSlice'
import cartReducer from './redux/reducers/cartSlice'



export const store = configureStore({
    reducer: {
      login: loginReducer,
      signup:signUpReducer,
      package:packageReducer,
      cartData:cartReducer
    },
    
  });