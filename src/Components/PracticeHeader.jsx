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

  const menuToggle = () => {
    setShow(!show);
  };

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
          <nav className={show ? "nav1" : "nav2"}>
          {/* <nav className="nav1"> */}
            <li>
              <NavLink to="./news">News</NavLink>
            </li>
            <li>
              <NavLink to="./community">Community</NavLink>
            </li>
            <li>
              <NavLink to="./topgames">Top games</NavLink>
            </li>
            <li>
              <NavLink to="./host">Host</NavLink>
            </li>
            <li>
              <NavLink to="./about">About Us</NavLink>
            </li>
          </nav>
        </div>
        <div className="bottom_right">
          <CiMenuBurger onClick={menuToggle} className="menu_icon" />
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

    .bottom_left {
      flex-grow: 1;
      .nav1 {
        /* display: none; */
        list-style-type: none;
        text-align: center;
        /* transition: 0.5s ease-in; */

        li {
          width: 100%;
          /* border-bottom: 3px solid rgba(0, 0, 0, 0.5); */
          /* background: rgba(30,30,30,0.5); */
          text-align: left;
          padding-left: 1em;

          a {
            width: 100%;
            text-decoration: none;
            font-size: 1.2em;
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
      /* height: 100%; */
      /* display: grid; */
      .menu_icon {
        color: #fff;
        font-size: 1.3em;
        padding: 2px 0;
        font-weight: bold;
        /* margin: auto; */

        &:hover {
          color: #fc0d50;
        }
      }
    }
  }

  .nav2 {
    display: none;
    /* transition: 0.5s ease-out; */
  }
`;
