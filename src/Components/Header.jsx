import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useGlobalComponent } from '../GlobalComponentContext';

const Header = () => {
  const { toggleComponentVisibility, componentVisibleFalse } = useGlobalComponent();
  const username = localStorage.getItem('username');
  const profile = localStorage.getItem('profile');

  return (
    <MainHeader>
      <div className="nav_menu">
        <ul>
          <li><NavLink onClick={componentVisibleFalse} to="/"><img src="/images/crop_thikkako_no_bg.png" alt="logo" className="logo" /></NavLink></li>
          <li><NavLink onClick={componentVisibleFalse} className="navs" to="/news">News</NavLink></li>
          <li><NavLink onClick={componentVisibleFalse} className="navs" to="/community">Community</NavLink></li>
          <li><NavLink onClick={componentVisibleFalse} className="navs" to="/topgames">Top games</NavLink></li>
          <li><NavLink onClick={componentVisibleFalse} className="navs" to="/host">Host</NavLink></li>
          <li><NavLink onClick={componentVisibleFalse} className="navs" to="/about">About us</NavLink></li>
        </ul>
      </div>
      <div className="nav_logo">
        <p>{username}</p>
        <img
          src={`${process.env.REACT_APP_API_BASE_URL}/${profile}`}
          className="user_logo"
          alt="profile"
          onClick={toggleComponentVisibility}
        />
      </div>
    </MainHeader>
  );
};

const MainHeader = styled.header`
  position: sticky;
  top: 0;
  background-image: ${({ theme }) => theme.colors.gradient};
  font-family: ${({ theme }) => theme.fontFamily.games};
  background-color: #222;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 10px 15px rgba(80, 15, 20, 1);
  z-index: 2;
  padding: 10px 20px; /* Add padding for spacing */
  
  img {
    max-width: 150px;
  }

  .nav_menu {
    ul {
      display: flex;
      gap: 15px;
      margin: 0;

      li {
        color: #fff;
        list-style-type: none;
        align-content: center;
      }

      .navs {
        text-decoration: none;
        color: #fff;
        font-size: 1em;

        &:hover,
        &.active {
          color: ${({ theme }) => theme.colors.logoBlue};
          border-bottom: 2px solid #FC0D50;
          transition: 0.3s ease;
        }
      }
    }
  }

  .nav_logo {
    display: flex;
    align-items: center;
    gap: 10px;

    p {
      color: white;
    }
    
    .user_logo {
      color: #fff;
      width: 50px;
      padding: 15px;
      border-radius: 50%;
    }
  }

  /* Media query for smaller screens */
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    .nav_menu {
      margin-top: 10px;
      ul {
        flex-direction: column; /* Stack nav items vertically */
        align-items: center; /* Center the nav items */
      }
    }

    .nav_logo {
      flex-direction: column;
      margin-top: 10px;
      gap: 5px;
    }
    
    /* Make logo smaller on smaller screens */
    img {
      max-width: 120px;
    }
  }

  @media (max-width: 480px) {
    padding: 10px; /* Reduce padding for very small screens */
    .nav_menu {
      ul {
        gap: 10px; /* Reduce gap between items */
      }
    }

    .nav_logo .user_logo {
      width: 40px;
      padding: 10px; /* Smaller profile image */
    }
  }
`;

export default Header;
