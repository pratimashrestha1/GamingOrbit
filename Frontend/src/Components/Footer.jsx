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
                    <li><img src="./images/crop thikkako no bg.png" alt="logo" /></li>
                    <div className="icons">
                        <FaSquareFacebook className='icon' />
                        <FaSquareInstagram className='icon' />
                        <FaSquareGithub className='icon' />
                        <IoLogoLinkedin className='icon' />
                        <FaSquareWhatsapp className='icon' />
                        <BiLogoGmail className='icon' />
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
background-image: url('images/heikei app.svg');

div{
    height: 500px;
    display: flex;
}

img{
width: 200px;
}

li{
list-style-type: none;
cursor: pointer;
}

h3{
cursor: default;
}

ul:nth-child(1){
flex-grow: 1;
}
ul:nth-child(2){
flex-grow: 1;
}
ul:nth-child(3){
flex-grow: 3;
}
ul:nth-child(4){
flex-grow:1 ;
}

.icons{
display: flex;
}
.icon{
flex-wrap: wrap-reverse;
font-size: 2em;
margin: 4px;
color:#FC0D50;

&:hover{
color: #1092EA;
cursor: pointer;
}
}

p{
text-align: center;
color: #fff;
margin: 0;
}
`