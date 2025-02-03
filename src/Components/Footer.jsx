import React from 'react'
import style from 'styled-components'
import { FaSquareFacebook } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaSquareGithub } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaSquareWhatsapp } from "react-icons/fa6";
import { BiLogoGmail } from "react-icons/bi";

function Footer() {
    return (
        <Div>
            <div>
                <ul>
                    <li><h3>EXPLORE</h3></li>
                    <li>Tournaments</li>
                    <li>leaderboard</li>
                    <li>FAQ</li>
                    <li>Player</li>
                    <li>Organizer</li>
                </ul>
                <ul>
                    <li><h3>POLICIES</h3></li>
                    <li>Privacy Policy</li>
                    <li>Disclosure Policy</li>
                    <li>User Agreement</li>
                </ul>
                <ul>
                    <li><h3>ABOUT US</h3></li>
                    <li>Mission & Team</li>
                    <li>Our partners</li>
                    <li>Contact Us</li>
                    <li>Media Kit</li>
                </ul>
                <ul>
                    <li><img src="./images/crop_thikkako_no_bg.png" alt="logo" /></li>
                    <div className="icons">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaSquareFacebook className='icon' /></a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaSquareInstagram className='icon' /></a>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer"><FaSquareGithub className='icon' /></a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><IoLogoLinkedin className='icon' /></a>
                        <a href="https://wa.me/9817313776" target="_blank" rel="noopener noreferrer"><FaSquareWhatsapp className='icon' /></a>
                        <a href="mailto:romangautam71399@gmail.com" target="_blank" rel="noopener noreferrer"><BiLogoGmail className="icon" /></a>
                    </div>
                </ul>
            </div>
            <p>2024@all right reserved.GamingOrbit</p>
        </Div>
    )
}

export default Footer

const Div = style.div`
    overflow: hidden;
    background-image: url('images/heikei_app.svg');

    div {
        height: 500px;
        display: flex;
        flex-direction: row; /* Ensure it's row by default */
    }

    img {
        width: 200px;
    }

    li {
        list-style-type: none;
        cursor: pointer;
        transition: transform 0.5s ease, font-weight 0.5s ease;

        &:hover {
            transform: translatey(-3px);
            font-weight: bold;
        }
    }

    ul li:nth-child(1):hover {
        transform: none;
        font-weight: regular;
    }

    h3 {
        cursor: default;
    }

    ul:nth-child(1),
    ul:nth-child(2),
    ul:nth-child(3),
    ul:nth-child(4) {
        flex-grow: 1;
    }

    .icons {
        display: flex;
        flex-wrap: wrap;
    }

    .icon {
        font-size: 2em;
        margin: 5px;
        color: #FC0D50;
        transition: all 0.5s ease;

        &:hover {
            color: #1092EA;
            cursor: pointer;
            transform: scale(1.5);
        }
    }

    p {
        text-align: center;
        color: #fff;
        margin-bottom: 30px;
    }



    // **********************************************************   Media query for screens max-width 600px
    @media (max-width: 600px) {
        div{
            height: fit-content;
            display: grid;
            grid-template-columns: auto auto; 
        }
        
        img{
            max-width: 150px;
        }

        .icons{
            height: fit-content;

            a{
                height: fit-content;
            }

            .icon{
                font-size: 1.5em;
                margin: 3px;
            }
        }

        p{
            margin-top: 100px;
        }
    }
`
