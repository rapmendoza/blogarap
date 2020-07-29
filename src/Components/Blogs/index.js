import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  toggleLoad,
  initializeBlogs,
  toggleCreate,
  toggleEdit,
  toggleDelete,
  logIn,
  logOut,
  isLoading,
  blogs,
  displayCreate,
  displayEdit,
  displayDelete,
  isLoggedIn,
  selectedBlog,
} from './blogsSlice';
import Blog from './Blog';
import Nav from '../Nav';
import CreateModal from './Forms/create';
import EditModal from './Forms/edit';
import DeleteModal from './Forms/delete';

export default () => {
  const dispatch = useDispatch();
  const loadingState = useSelector(isLoading);
  const blogsState = useSelector(blogs);
  const createState = useSelector(displayCreate);
  const editState = useSelector(displayEdit);
  const deleteState = useSelector(displayDelete);
  const loggedInState = useSelector(isLoggedIn);
  const selectedBlogState = useSelector(selectedBlog);

  useEffect(() => {
    getAllData(1500);
    checkLoggedInUser();
  }, []);

  const getAllData = (delay = 0) => {
    dispatch(toggleLoad());

    fetch('https://blogarap-api.herokuapp.com/blogs?_sort=id&_order=desc')
      .then(response => response.json())
      .then(blogs => {
        setTimeout(() => {
          dispatch(initializeBlogs(blogs));
          dispatch(toggleLoad());
        }, delay);
      });
  };

  const checkLoggedInUser = () => {
    if (sessionStorage.getItem('name')) {
      dispatch(logIn());
    }
  };

  return (
    <div className="hero is-dark is-fullheight is-bold">
      <Nav isLoggedIn={loggedInState} handleLogout={() => dispatch(logOut())} />

      <section className="section">
        <div className="container">
          {!loadingState && (
            <div className="level is-mobile">
              <div className="level-left">
                <h1 className="title">Blogs</h1>
              </div>

              {loggedInState && (
                <div className="level-right">
                  <button
                    className="button is-primary is-outlined"
                    onClick={() => dispatch(toggleCreate())}
                  >
                    New
                  </button>
                </div>
              )}
            </div>
          )}

          {!loadingState &&
            blogsState.map(blog => (
              <Blog
                blog={blog}
                key={blog.id}
                handleToggleEdit={() => dispatch(toggleEdit(blog.id))}
                handleToggleDelete={() => dispatch(toggleDelete(blog.id))}
                isLoggedIn={loggedInState}
              />
            ))}

          <CreateModal
            active={createState}
            onToggle={() => dispatch(toggleCreate())}
            handleResponse={() => getAllData()}
          />

          {editState && (
            <EditModal
              active={editState}
              onToggle={() => dispatch(toggleEdit())}
              handleResponse={() => getAllData()}
              id={selectedBlogState}
            />
          )}

          <DeleteModal
            active={deleteState}
            onToggle={() => dispatch(toggleDelete(selectedBlogState))}
            handleResponse={() => getAllData()}
            id={selectedBlogState}
          />
        </div>
      </section>

      {loadingState && (
        <progress className="progress is-small is-primary" max="100">
          100%
        </progress>
      )}
    </div>
  );
};
