import React from "react";
import "../../Styles/HomePage/NavBar.css"; // Ensure this path is correct
import NavItem from "./navItem"; // Adjust the import if necessary
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons"; // Import the search icon
import Logo from "../../assets/images/logo.png"; // Ensure this path is correct
import SearchComponent from "../../Components/common/searchComponent"; // Ensure this path is correct

// Functional component for Navbar with destructured props
const Navbar = ({ user, isLoggedIn, onLogout }) => {
  return (
    <nav className="navbar">
      {/* Company logo */}
      <div className="navbar-header">
        <a href="/" className="navbar-brand">
          <img src={Logo} alt="Company Logo" className="navbar-logo" />
          <span className="navbar-brand-name">ConnectSport</span>
        </a>
        <button type="button" className="navbar-toggler">
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>

      {/* Replace the static search form with the SearchComponent */}
      <div className="navbar-search">
        <SearchComponent />
      </div>

      {/* Navigation items */}
      <div className="navbar-expand">
        <div className="navbar-nav">
          {isLoggedIn && (
            <NavItem link="/" active>
              Home
            </NavItem>
          )}
          {isLoggedIn && <NavItem link="/messages">Messages</NavItem>}
          {isLoggedIn && <NavItem link="/friends">Friends</NavItem>}
          {isLoggedIn && <NavItem link="/groups">Groups</NavItem>}
          {isLoggedIn && <NavItem link="/pages">Pages</NavItem>}
          {isLoggedIn && <NavItem link="/settings">Settings</NavItem>}
        </div>
      </div>

      {/* Logout button if user is logged in */}
      {isLoggedIn && (
        <div className="navbar-extra">
          <button onClick={onLogout} className="logout-button">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
