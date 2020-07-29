import { configureStore } from '@reduxjs/toolkit';
import blogsReducer from '../components/Blogs/blogsSlice';

export default configureStore({
  reducer: {
    blogs: blogsReducer,
  },
});
