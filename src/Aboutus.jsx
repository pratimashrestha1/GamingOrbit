import React from 'react'
import Modal from './Components/Modal'
import styled from 'styled-components'
import Theme from './Components/Intro_theme'
import Footer from './Components/Footer'
import ContactUs from './Components/ContactUs'

function Aboutus() {
  return (
    <Div>
      <Modal />
      <Theme title="About us"
        image='./images/crop_thikkako_no_bg.png'
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
            <p>Roman Gautam<br/><span>romangautam71399@gmail.com</span></p>
            <p className='position'>Frontend developer</p>
          </div>
          <div className="img2">
            <img src="./images/pratima.png" alt="" />
            <p>Pratima Shrestha<br/><span>crexthapratima111@gmail.com</span></p>
            <p className='position'>Backend developer</p>
          </div>
          <div className="img3">
            <img src="./images/pratyush.png" alt="" />
            <p>Pratyush Pokharel<br/><span>pokharelpratyush620@gmail.com</span></p>
            <p className='position'>UI/UX designer</p>
          </div>
        </div>
      </div>

      <ContactUs/>

      <Footer/>
    </Div>
  )
}

export default Aboutus

const Div = styled.div`
font-family: ${({ theme }) => theme.fontFamily.games};
.profile{
  background: linear-gradient(#fff 70%,#490f10 30%);
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
      border: 5px solid #4d0717;
      overflow: hidden;
      border-radius: 30px;
      background: #bbb;

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

        span{font-size: 14px;}
      }
    }

    img{
      width: 250px;
      height: 250px;   
      display: block;   
    }
  }
}

// *****************************************************************   media query start

@media only Screen and (max-width:600px){
  
.profile{
  overflow: hidden;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;

  .top{
    flex-direction: column;
    width: 100%;

    .title{
    font-size: 2rem;
    margin:0;
    }

    .define{
    width: auto;
    text-align: center;
    float: right;
    font-size: 15px;
    margin:0px;
    }
  }

  .bottom{
    margin:0;
    flex-direction: column;
    gap: 1rem;
    align-items: center;

      &>div{
      border: 3px solid #4d0717;
      max-width: fit-content;

      p:first-of-type{
        padding: 5px;
        border-radius: 20px;   
        margin-top: -25xp;
        z-index: 1;   
      }
      
      .position{
        padding: 5px;
      }

      p{
        text-align: center;
        margin: 0;

        span{font-size: 14px;}
      }
      }
  }

  img{
      width: 150px;
      height: 50px;   
    }
}

}//media query close bracket
`