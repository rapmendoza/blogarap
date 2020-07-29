import { createSlice } from '@reduxjs/toolkit';

export const blogsSlice = createSlice({
  name: 'blogs',
  initialState: {
    blogs: [],
    isLoading: false,
    displayCreate: false,
    displayEdit: false,
    displayDelete: false,
    isLoggedIn: false,
    selectedBlog: null,
  },
  reducers: {
    toggleLoad: state => {
      state.isLoading = !state.isLoading;
    },
    initializeBlogs: (state, action) => {
      state.blogs = [...action.payload];
    },
    toggleCreate: state => {
      state.displayCreate = !state.displayCreate;
      state.selectedBlog = null;
    },
    toggleEdit: (state, action) => {
      state.displayEdit = !state.displayEdit;
      state.selectedBlog = action.payload;
    },
    toggleDelete: (state, action) => {
      state.displayDelete = !state.displayDelete;
      state.selectedBlog = action.payload;
    },
    logIn: state => {
      state.isLoggedIn = true;
    },
    logOut: state => {
      state.isLoggedIn = false;
    },
  },
});

export const {
  toggleLoad,
  initializeBlogs,
  toggleCreate,
  toggleEdit,
  toggleDelete,
  logIn,
  logOut,
} = blogsSlice.actions;

export const isLoading = state => state.blogs.isLoading;
export const blogs = state => state.blogs.blogs;
export const displayCreate = state => state.blogs.displayCreate;
export const displayEdit = state => state.blogs.displayEdit;
export const displayDelete = state => state.blogs.displayDelete;
export const isLoggedIn = state => state.blogs.isLoggedIn;
export const selectedBlog = state => state.blogs.selectedBlog;

export default blogsSlice.reducer;
