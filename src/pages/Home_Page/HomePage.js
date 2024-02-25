import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../Components/common/navbar'; // Ensure correct import path
import PostList from './postList'; // Ensure correct import path
import PostForm from './postForm'; // Ensure correct import path

function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('userName'))?.name);
  const isLoggedIn = !!localStorage.getItem('token');
  const [posts, setPosts] = useState([]);

  // Fetch posts from the backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3000/posts', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Adjust according to your auth method
          },
        });
        if (response.ok) {
          const data = await response.json();
          setPosts(data); // Assuming the backend returns an array of posts
        } else {
          throw new Error('Failed to fetch posts');
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchPosts();
  }, []); // Empty dependency array ensures this runs once on mount

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName'); // Clear user name from localStorage on logout
    setCurrentUser(null); // Reset current user state
    navigate('/login');
  };

  // Function to add a new post
  const addNewPost = async (content) => {
    try {
      const response = await fetch('http://your-backend-domain.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Adjust according to your auth method
        },
        body: JSON.stringify({ author: currentUser || 'Anonymous', content }),
      });
      if (response.ok) {
        const newPost = await response.json(); // Assuming backend returns the created post
        setPosts(prevPosts => [newPost, ...prevPosts]);
      } else {
        throw new Error('Failed to create post');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className='container-fluid'>
      <Navbar user={currentUser} isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <div className='row'>
        <div className='col-md-3'>
          {/* Placeholder for left sidebar content */}
        </div>
        <div className='col-md-6'>
          <PostForm onPostSubmit={addNewPost} />
          <PostList posts={posts} currentUser={currentUser} />
        </div>
        <div className='col-md-3'>
          {/* Placeholder for right sidebar content */}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
