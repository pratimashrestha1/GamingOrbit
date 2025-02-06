import React, { useState } from "react";
import styled from "styled-components";
import { CiMenuBurger } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import { useGlobalComponent } from "../GlobalComponentContext";

function PracticeHeader() {
  const username = localStorage.getItem("username");
  const profile = localStorage.getItem("profile");
  const [show, setShow] = useState(false);
  const { toggleComponentVisibility } = useGlobalComponent();

  // const menuToggle = () => {
  //   setShow(!show);
  // };

  return (
    <Div>
      <div className="top">
        <div className="top_left">
          <NavLink to="/">
            <img src="/images/crop_thikkako_no_bg.png" alt="website logo" />
          </NavLink>
        </div>
        <div className="top_right">
          <p>{username}</p>
          <img
            src={`${process.env.REACT_APP_API_BASE_URL}/${profile}`}
            className="user_logo"
            alt="profile"
            onClick={toggleComponentVisibility}
          />
        </div>
      </div>

      <div className="bottom">
        <div className="bottom_left">
          <nav className={show ? "nav1" : ""}>
            {/* <nav className="nav1"> */}
            <li>
              <NavLink onClick={() => setShow(false)} to="./news">News</NavLink>
            </li>
            <li>
              <NavLink onClick={() => setShow(false)} to="./community">Community</NavLink>
            </li>
            <li>
              <NavLink onClick={() => setShow(false)} to="./topgames">Top games</NavLink>
            </li>
            <li>
              <NavLink onClick={() => setShow(false)} to="./host">Host</NavLink>
            </li>
            <li>
              <NavLink onClick={() => setShow(false)} to="./about">About Us</NavLink>
            </li>
          </nav>
        </div>
        <div className="bottom_right">
          <CiMenuBurger onClick={() => setShow(!show)} className="menu_icon" />
        </div>
      </div>
    </Div>
  );
}

export default PracticeHeader;

const Div = styled.div`
  max-width: 600px;
  /* position: fixed;
  top: 0px; */
  background-image: ${({ theme }) => theme.colors.gradient};
  font-family: ${({ theme }) => theme.fontFamily.games};

  .top {
    width: 100%;
    display: flex;
    justify-content: space-between;
    box-shadow: 0 10px 15px rgba(80, 15, 20, 1);

    .top_left {
      img {
        width: 40vw;
      }
    }

    .top_right {
      display: flex;
      gap: 5px;
      p {
        color: #fff;
      }
      align-items: center;

      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
  }

  .bottom {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    box-shadow: 0 10px 15px rgba(80, 15, 20, 1);
    /* padding-bottom: 1em; */

    .bottom_left {
      flex-grow: 1;

      nav {
        list-style-type: none;
        max-height: 0;
        overflow: hidden;
        opacity: 0;
        transform: translateY(-10px);
        transition: max-height 0.5s ease-in-out, opacity 0.5s ease-in-out,
          transform 0.5s ease-in-out;

        li {
          width: 100%;
          text-align: left;
          padding-left: 1em;

          a {
            width: 100%;
            text-decoration: none;
            font-size: 1em;
            width: 100%;
            color: #fff;
            line-height: 1.5;

            &:hover,
            &.active {
              color: ${({ theme }) => theme.colors.logoBlue};
              border-bottom: 2px solid #fc0d50;
              transition: 0.3s ease;
            }
          }
        }
      }

      .nav1 {
        max-height: 320px;
        opacity: 1;
        transform: translateY(0);
        /* padding-bottom: 10px; */

        li {
          width: 100%;
          text-align: left;
          padding-left: 1em;
      
          a {
            width: 100%;
            text-decoration: none;
            font-size: 1em;
            width: 100%;
            color: #fff;
            
            &:hover,
            &.active {
              color: ${({ theme }) => theme.colors.logoBlue};
              border-bottom: 2px solid #fc0d50;
              transition: 0.3s ease;
            }
          }
        }
      }
    }

    .bottom_right {
      .menu_icon {
        color: #fff;
        font-size: 1.4em;
        padding: 2px 2px 2px 0;
        font-weight: bold;
        /* margin: auto; */

        &:hover {
          color: #fc0d50;
        }
      }
    }
  }
`;
