// src/HomePage.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../Components/common/navbar'; // Adjust path as necessary
import PostList from './postList'; // Adjust path as necessary
import PostForm from './postForm'; // Adjust path as necessary

function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user;
  const isLoggedIn = !!localStorage.getItem('token');

  const [posts, setPosts] = useState([
    { id: 1, author: 'John Doe', content: 'This is the first post' },
    { id: 2, author: 'Jane Doe', content: 'This is the second post' },
  ]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const addNewPost = (content) => {
    const newPost = {
      id: posts.length + 1, // Simple ID assignment
      author: user?.firstName || 'Anonymous', // Use user name or a placeholder
      content,
    };
    setPosts([newPost, ...posts]);
  };

  return (
    <div className='container-fluid'>
      <Navbar user={user} isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <div className='row'>
        <div className='col-md-3'>
          {/* Left sidebar content */}
        </div>
        <div className='col-md-6'>
          <PostForm onPostSubmit={addNewPost} />
          <PostList posts={posts} />
        </div>
        <div className='col-md-3'>
          {/* Right sidebar content */}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
