import React, { useState } from "react";
import "../../Styles/HomePage/NavBar.css";
import NavItem from "./navItem"; // Ensure the file name matches with case sensitivity
import Logo from "../../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
// Removed direct import of SearchComponent since it's no longer used here

const Navbar = ({ user, isLoggedIn, onLogout, onSearchChange }) => { // Assuming you might pass onSearchChange later
  const [searchInput, setSearchInput] = useState("");

  // Handle the search input changes
  const handleSearchChange = (e) => {
    const newValue = e.target.value;
    setSearchInput(newValue);
    // Call onSearchChange if it's provided
    if (onSearchChange) {
      onSearchChange(newValue);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-header">
        <a href="/" className="navbar-brand">
          <img src={Logo} alt="Company Logo" className="navbar-logo" />
          <span className="navbar-brand-name">ConnectSport</span>
        </a>
        <button type="button" className="navbar-toggler">
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>

      {/* Interactive search input */}
      <div className="navbar-search">
        <input
          type="text"
          value={searchInput}
          onChange={handleSearchChange}
          placeholder="Search..."
          className="search-input"
        />
        <FontAwesomeIcon icon={faSearch} />
      </div>

      {/* Navigation items */}
      <div className="navbar-expand">
        <div className="navbar-nav">
          {isLoggedIn && <NavItem link="/" active>Home</NavItem>}
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
