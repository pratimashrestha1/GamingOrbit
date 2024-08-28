import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useGlobalComponent } from '../GlobalComponentContext';

const Header = () => {
  const { toggleComponentVisibility, componentVisibleFalse } = useGlobalComponent();

  return (
    <MainHeader>
      <div className="nav_menu">
        <ul>
          <li><NavLink onClick={componentVisibleFalse} to="/"><img src="./images/crop thikkako no bg.png" alt="logo" className="logo" /></NavLink></li>
          <li><NavLink onClick={componentVisibleFalse} className="navs" to="/host">Host</NavLink></li>
          <li><NavLink onClick={componentVisibleFalse} className="navs" to="/community">Community</NavLink></li>
          <li><NavLink onClick={componentVisibleFalse} className="navs" to="/news">News</NavLink></li>
          <li><NavLink onClick={componentVisibleFalse} className="navs" to="/topgames">Top games</NavLink></li>
          <li><NavLink onClick={componentVisibleFalse} className="navs" to="/about">About us</NavLink></li>
        </ul>
      </div>
      <div className="nav_logo">
        <FaUserCircle className="user_logo" onClick={toggleComponentVisibility} size={30} />
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
.user_logo{
  color: #fff;
  padding-right: 15px;
}
}
`;

export default Header;
