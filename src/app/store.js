import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { reducer as blogsReducer } from '../components/Blogs/blogsSlice';
import saga from '../middleware/saga';

const reducer = combineReducers({
  blogs: blogsReducer,
});

const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware(), sagaMiddleware];

export default configureStore({
  reducer,
  middleware,
});

sagaMiddleware.run(saga);
