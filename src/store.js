import {configureStore} from '@reduxjs/toolkit';
import loginReducer from './redux/reducers/LoginSlice'
import signUpReducer from './redux/reducers/SignupSlice'
import packageReducer from './redux/reducers/PackageSlice'
import cartReducer from './redux/reducers/cartSlice'
import orderReducer from './redux/reducers/orderSlice'


export const store = configureStore({
    reducer: {
      login: loginReducer,
      signup:signUpReducer,
      package:packageReducer,
      cartData:cartReducer,
      orderData:orderReducer
    },
    
  });