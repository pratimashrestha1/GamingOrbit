// src/Components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/news">News</Link> {/* Link to News Tab */}
        <Link to="/about">About</Link>
      </nav>
    </header>
  );
}

export default Header;
