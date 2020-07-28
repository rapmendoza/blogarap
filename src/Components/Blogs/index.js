import React, { useState, useEffect } from 'react';

import Nav from '../Nav';
import Blog from './Blog';
import CreateModal from './Forms/create';
import EditModal from './Forms/edit';
import DeleteModal from './Forms/delete';

export default () => {
  const [blogs, setBlogs] = useState([]),
    [displayCreate, setDisplayCreate] = useState(false),
    [displayEdit, setDisplayEdit] = useState(false),
    [displayDelete, setDisplayDelete] = useState(false),
    [isLoading, setIsLoading] = useState(true),
    [selectedBlog, setSelectedBlog] = useState(null),
    [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    getAllData();
    checkLoggedInUser();
  }, []);

  const getAllData = (delay = 1500) => {
    fetch('https://blogarap-api.herokuapp.com/blogs?_sort=id&_order=desc')
      .then(response => response.json())
      .then(blogs => {
        setTimeout(() => {
          setBlogs(blogs);
          setIsLoading(false);
        }, delay);
      });
  };

  const handleToggleCreate = () => {
    setDisplayCreate(!displayCreate);
    setSelectedBlog(null);
  };

  const handleToggleEdit = id => {
    setDisplayEdit(!displayEdit);
    setSelectedBlog(id);
  };

  const handleToggleDelete = id => {
    setDisplayDelete(!displayDelete);
    setSelectedBlog(id);
  };

  const handleDisplayUpdate = () => {
    getAllData(0);
  };

  const handleLogoutState = () => {
    setIsLoggedIn(false);
  };

  const checkLoggedInUser = () => {
    if (sessionStorage.getItem('name')) {
      setIsLoggedIn(true);
    }
  };

  return (
    <div className="hero is-dark is-fullheight is-bold">
      <Nav isLoggedIn={isLoggedIn} handleLogoutState={handleLogoutState} />
      <section className="section">
        <div className="container">
          {isLoading ? (
            <progress className="progress is-small is-primary" max="100">
              100%
            </progress>
          ) : (
            <div className="level is-mobile">
              <div className="level-left">
                <h1 className="title">Blogs</h1>
              </div>

              {isLoggedIn && (
                <div className="level-right">
                  <button
                    className="button is-primary is-outlined"
                    onClick={handleToggleCreate}
                  >
                    New
                  </button>
                </div>
              )}
            </div>
          )}

          {!isLoading &&
            blogs.map(blog => (
              <Blog
                blog={blog}
                key={blog.id}
                handleToggleEdit={() => handleToggleEdit(blog.id)}
                handleToggleDelete={() => handleToggleDelete(blog.id)}
                isLoggedIn={isLoggedIn}
              />
            ))}

          <CreateModal
            active={displayCreate}
            onToggle={handleToggleCreate}
            handleResponse={handleDisplayUpdate}
          />

          {displayEdit && (
            <EditModal
              active={displayEdit}
              onToggle={handleToggleEdit}
              handleResponse={handleDisplayUpdate}
              id={selectedBlog}
            />
          )}

          <DeleteModal
            active={displayDelete}
            onToggle={handleToggleDelete}
            handleResponse={handleDisplayUpdate}
            id={selectedBlog}
          />
        </div>
      </section>
    </div>
  );
};
