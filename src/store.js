import {configureStore} from '@reduxjs/toolkit';
import loginReducer from './redux/reducers/LoginSlice'

export const store = configureStore({
    reducer: {
      login: loginReducer,
    },
  });