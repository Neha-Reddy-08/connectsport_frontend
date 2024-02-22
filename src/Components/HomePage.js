import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate hook

function HomePage() {
  const location = useLocation();
  const navigate = useNavigate(); // Added for redirection after logout
  const user = location.state?.user; // Get user from location state

  const handleLogout = () => {
    // Clear any stored authentication data
    localStorage.removeItem('token'); // Assuming you're storing the token in localStorage

    // Redirect to login page
    navigate('/login');
  };

  return (
    <div>
      <h1>Welcome, {user?.firstName}!</h1> {/* Use optional chaining to safely access firstName */}
      <p>This is your user account page.</p>
      <button onClick={handleLogout}>Logout</button> {/* Logout button */}
    </div>
  );
}

export default HomePage;
