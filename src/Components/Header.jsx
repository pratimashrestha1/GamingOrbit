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
          <li><NavLink onClick={componentVisibleFalse} to="/"><img src="./images/crop thikkako no bg.png" alt="logo" className="logo" /></NavLink></li>
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
          src={`http://localhost:4000/${profile}`}
          className="user_logo"
          alt="profile"
          onClick={toggleComponentVisibility}
        />

      </div>
    </MainHeader>
    //Above is the header of logo.
  );
};

const MainHeader = styled.header`
background-image: ${({ theme }) => theme.colors.gradient};
font-family: ${({ theme }) => theme.fontFamily.games};
background-color: #222;
display:flex;
justify-content: space-between;
box-shadow: 0 10px 15px rgba(80, 15, 20, 1); 

img{
  max-width: 150px;
  }

.nav_menu{
ul{
  display:flex;
  gap:15px;
  margin: 0;

  li{
      color: #fff;
      list-style-type: none;
      align-content: center;
    }
      .navs{
      text-decoration: none;
      color: #fff;
      font-size: 1em; 

      &:hover{
      color: ${({ theme }) => theme.colors.logoBlue};
      border-bottom: 2px solid #FC0D50;
      transition: 0.3s ease;
      }
      }
}
}

.nav_logo{  
  display: flex;
  align-items: center;
  gap: 10px;

  p{
  color: white;
  }
  .user_logo{
  color: #fff;
  width: 50px;
  padding: 15px;
  border-radius: 50%;
    }
}
`;

export default Header;