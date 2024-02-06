import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './redux/Slice/TaskSlice'
import authReducer from './redux/auth/auth'



const store = configureStore({
  reducer: {
    tasks: taskReducer,
    auth: authReducer,
  },
});

export default store;
