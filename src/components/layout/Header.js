import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // In a real app, this would come from auth context
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    // In a real app, this would call your logout API and clear auth state
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <img src="/logo.png" alt="Nood Community" />
            <h1>The Nood Community</h1>
          </Link>
        </div>

        <div className="search-bar">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">
              <i className="fas fa-search"></i>
            </button>
          </form>
        </div>

        <nav className="main-nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/explore">Explore</Link></li>
            <li><Link to="/resources">Resources</Link></li>
            <li><Link to="/events">Events</Link></li>
          </ul>
        </nav>

        <div className="user-controls">
          {isLoggedIn ? (
            <>
              <div className="notifications">
                <button className="icon-button">
                  <i className="fas fa-bell"></i>
                  <span className="badge">3</span>
                </button>
              </div>
              <div className="messages">
                <button className="icon-button">
                  <i className="fas fa-envelope"></i>
                  <span className="badge">2</span>
                </button>
              </div>
              <div className="user-profile">
                <Link to="/profile" className="profile-link">
                  <img src="/default-profile.png" alt="Profile" />
                </Link>
                <div className="dropdown">
                  <Link to="/profile">My Profile</Link>
                  <Link to="/settings">Settings</Link>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              </div>
            </>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn-secondary">Login</Link>
              <Link to="/register" className="btn-primary">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 