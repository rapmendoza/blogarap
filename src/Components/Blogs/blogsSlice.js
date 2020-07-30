import { createSlice } from '@reduxjs/toolkit';

export const blogsSlice = createSlice({
  name: 'blogs',
  initialState: {
    blogs: [],
    error: false,
    isLoading: false,
    displayCreate: false,
    displayEdit: false,
    displayDelete: false,
    isLoggedIn: false,
    selectedBlog: null,
  },
  reducers: {
    fetch(state) {
      state.isLoading = true;
      state.error = false;
      state.blogs = [];
    },
    fetchbyid(state, action) {},
    fetchSuccess(state, action) {
      state.blogs = action.payload.data;
      state.isLoading = false;
    },
    fetchFailure(state, action) {
      state.error = action.payload.error;
      state.isLoading = false;
    },
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

export const states = state =>
  state[blogsSlice.name] || blogsSlice.initialState;

export const { name, actions, reducer } = blogsSlice;
