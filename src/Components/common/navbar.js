import React from 'react';
import '../../Styles/HomePage/NavBar.css'; // Ensure this path is correct
import NavItem from './navItem'; // Ensure this path is correct and consider using PascalCase for component files
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'; // Import the search icon
import Logo from '../../assets/images/logo.png'; // Ensure this path is correct

// Functional component for Navbar with destructured props
const Navbar = ({ user, isLoggedIn, onLogout }) => {
  return (
    <nav className='navbar'>
      {/* Company logo */}
      <div className='navbar-header'>
        <a href='/' className='navbar-brand'> {/* Use a routing link or "#" if it's just a placeholder */}
          <img src={Logo} alt='Company Logo' className='navbar-logo' />
          <span className='navbar-brand-name'>ConnectSport</span>
        </a>
        <button type='button' className='navbar-toggler'>
          <span className='navbar-toggler-icon'></span>
        </button>
      </div>

      <div className='navbar-search'>
        <form className='search-form'>
          <input type='text' className='search-input' placeholder='Search...' />
          <button type='submit' className='search-button'>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
      </div>

      {/* Navigation items */}
      <div className='navbar-expand'>
        <div className='navbar-nav'>
          <NavItem link='/' active>Home</NavItem>
          <NavItem link='/features'>Features</NavItem>
          <NavItem link='/pricing'>Pricing</NavItem>
          <NavItem link='#' disabled>Disabled</NavItem> {/* Keep '#' if no path is intended */}
        </div>
      </div>

      {/* Logout button if user is logged in */}
      {isLoggedIn && (
        <div className='navbar-extra'>
          <button onClick={onLogout} className='logout-button'>Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
