import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { useGlobalComponent } from '../GlobalComponentContext';

const Header = () => {
  const { toggleComponentVisibility,componentVisibleFalse } = useGlobalComponent();
  
  return (
    <MainHeader>
      <ul>
        <li><NavLink onClick={componentVisibleFalse} className="navs" to="/"><img src="./images/crop thikkako no bg.png" alt="logo" className="logo" /></NavLink></li>
        <li><NavLink onClick={componentVisibleFalse} className="navs" to="/host">Host</NavLink></li>
        <li><NavLink onClick={componentVisibleFalse} className="navs" to="/community">Community</NavLink></li>
        <li><NavLink onClick={componentVisibleFalse} className="navs" to="/news">News</NavLink></li>
        <li><NavLink onClick={componentVisibleFalse} className="navs" to="/topgames">Top games</NavLink></li>
        <li><NavLink onClick={componentVisibleFalse} className="navs" to="/about">About us</NavLink></li>
        <li><FaUserCircle onClick={toggleComponentVisibility} size={30}/></li>
        <li><IoLogOut size={30}/> </li> 
      </ul>
    </MainHeader>
    //Above is the header of logo.
  );
};

const MainHeader = styled.header`
background-image: ${({theme})=>theme.colors.gradient};
font-family: ${({ theme }) => theme.fontFamily.games};
background-color: #222;
img{
  max-width: 200px;
  // max-height: 100px;
  }
  .navs{
    text-decoration: none;
    color: #fff;
    font-size: 1.5em; 
  }
 
  ul{
    width: 100vw;
    display: flex;
    justify-content: space-evenly;
    
    // gap: 5em;
    margin: 0px;
    li{
      color: #fff;
       list-style-type: none;
      align-content: center;
    }
  }

  .user{}
`;

export default Header;
