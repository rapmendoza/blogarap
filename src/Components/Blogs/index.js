import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Blog from './Blog';
import Nav from '../Nav';
import CreateModal from './Forms/create';
import EditModal from './Forms/edit';
import DeleteModal from './Forms/delete';
import { actions, states } from './blogsSlice';

export default props => {
  const dispatch = useDispatch();
  const store = useSelector(states);

  useEffect(() => {
    dispatch(actions.fetch(1500));
    checkLoggedInUser();
  }, []);

  const checkLoggedInUser = () => {
    if (sessionStorage.getItem('name')) {
      dispatch(actions.logIn());
    }
  };

  return (
    <div className="hero is-dark is-fullheight is-bold">
      <Nav
        isLoggedIn={store.isLoggedIn}
        handleLogout={() => dispatch(actions.logOut())}
      />

      <section className="section">
        <div className="container">
          {!store.isLoading && (
            <div className="level is-mobile">
              <div className="level-left">
                <h1 className="title">Blogs</h1>
              </div>

              {store.isLoggedIn && (
                <div className="level-right">
                  <button
                    className="button is-primary is-outlined"
                    onClick={() => dispatch(actions.toggleCreate())}
                  >
                    New
                  </button>
                </div>
              )}
            </div>
          )}

          {!store.isLoading &&
            store.blogs.map(blog => (
              <Blog
                blog={blog}
                key={blog.id}
                handleToggleEdit={() => dispatch(actions.toggleEdit(blog.id))}
                handleToggleDelete={() =>
                  dispatch(actions.toggleDelete(blog.id))
                }
                isLoggedIn={store.isLoggedIn}
              />
            ))}

          <CreateModal
            active={store.displayCreate}
            toggle={() => dispatch(actions.toggleCreate())}
            handleResponse={() => dispatch(actions.fetch(0))}
          />

          {store.displayEdit && (
            <EditModal
              active={store.displayEdit}
              onToggle={() => dispatch(actions.toggleEdit())}
              handleResponse={() => dispatch(actions.fetch(0))}
              id={store.selectedBlog}
            />
          )}

          <DeleteModal
            active={store.displayDelete}
            onToggle={() =>
              dispatch(actions.toggleDelete(store.selectedBlogState))
            }
            handleResponse={() => dispatch(actions.fetch(0))}
            id={store.selectedBlog}
          />
        </div>
      </section>

      {store.isLoading && (
        <progress className="progress is-small is-primary" max="100">
          100%
        </progress>
      )}
    </div>
  );
};
