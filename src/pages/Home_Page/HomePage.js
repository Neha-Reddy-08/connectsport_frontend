import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../Components/common/navbar'; // Ensure this path is correct and follow PascalCase for component files
import PostList from './postList'; // Ensure this path is correct and follow PascalCase for component files

function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user;
  const isLoggedIn = !!localStorage.getItem('token'); // Convert token presence to a boolean

  const posts = [
    { id: 1, author: 'John Doe', content: 'This is the first post' },
    { id: 2, author: 'Jane Doe', content: 'This is the second post' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  // Sample posts data


  return (
    <div className='container-fluid'>
      <Navbar user={user} isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      <div className='row'>
        {/* It's good practice to comment sections even if they're empty to maintain structure and readability */}
        <div className='col-md-3'>
          {/* Left sidebar content can be added here */}
        </div>

        <div className='col-md-6'>
          <h1>Welcome, {user?.firstName || 'Guest'}!</h1>
          {/* Fallback to 'Guest' if user.firstName is undefined */}
          <p>This is your user account page.</p>
          <PostList posts={posts} />
        </div>

        <div className='col-md-3'>
          {/* Right sidebar content can be added here */}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
