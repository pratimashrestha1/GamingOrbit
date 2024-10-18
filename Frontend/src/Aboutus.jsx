import React from 'react'
import Modal from './Components/Modal'
import styled from 'styled-components'
import Theme from './Components/Intro_theme'
import Footer from './Components/Footer'

function Aboutus() {
  return (
    <Div>
      <Modal />
      <Theme title="About us"
        image='./images/crop thikkako no bg.png'
        width='400px'
        description=' Learn more about our mission to connect gamers from around the world, offering a platform to play, compete, and grow together in the world of gaming. We are dedicated to fostering a fun and inclusive environment for all types of gamers.'
      />

      <div className="profile">
        <div className="top">
          <p className='title'>Project <br />members</p>
          <p className='define'>"We offer gamers an online community for enhanced interaction and growth. Our key features include tournament hosting and live streaming. There will be time-to-time updates to enhance our website."</p>
        </div>
        <div className="bottom">
          <div className="img1">
            <img src="./images/roman.png" alt="" />
            <p>Roman <br/>Gautam</p>
            <p className='position'>Frontend developer</p>
          </div>
          <div className="img2">
            <img src="./images/pratima.png" alt="" />
            <p>Pratima<br/>Shrestha</p>
            <p className='position'>Backend developer</p>
          </div>
          <div className="img3">
            <img src="./images/pratyush.png" alt="" />
            <p>Pratyush <br/>Pokharel</p>
            <p className='position'>UI/UX designer</p>
          </div>
        </div>
      </div>
      <Footer/>
    </Div>
  )
}

export default Aboutus

const Div = styled.div`
font-family: ${({ theme }) => theme.fontFamily.games};
.profile{
  background: linear-gradient(#bcd6d4 70%,#490f10 30%);
  padding-bottom: 50px;

.top{
  width: 100vw;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .title{
    font-size: 60px;
    margin-left: 50px;
  }
  .define{
    color: #000;
    width: 35vw;
    text-align: right;
    float: right;
    font-size: 18px;
    margin-right: 50px;
  }
}
  .bottom{
    margin-top: 100px;
    display: flex;
    justify-content: space-around;
    
    &>div{
      border: 5px solid white;
      overflow: hidden;
      border-radius: 30px;
      background: white;

      p:first-of-type{
        background: ${({theme})=>theme.colors.gradient};
        padding: 5px;
        border-radius: 20px;   
        margin-top: -15px;
        z-index: 1;   
        position: relative;
        color: white;
      }
      
      .position{
        padding: 5px;
      }

      p{
        text-align: center;
        margin: 0;
      }
    }

    img{
      width: 250px;
      height: 250px;   
      display: block;   
    }
  }
}
`