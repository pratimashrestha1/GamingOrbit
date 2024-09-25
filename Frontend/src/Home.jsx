import React, { useState, useEffect} from 'react';
import Modal from './Components/Modal';
import styled from 'styled-components';
import { Carousel } from "./Components/Carousel";
import carouselData from "./data/carouselData.json";
import Footer from "./Components/Footer"

function Home() {
  const [pvalue, setPvalue] = useState('Connect');
  const { slides } = carouselData;
  const [addClass1,setAddClass1]=useState();
  const [addClass2,setAddClass2]=useState();
  const [addClass3,setAddClass3]=useState();
  const [addClass4,setAddClass4]=useState();

  useEffect(() => {
    const values = ['Connect', 'Play', 'Stream'];
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % values.length; // Cycle through the values
      setPvalue(values[index]);
    }, 2000); // Change every 2 seconds (2000 ms)

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleMouseOver1=()=>{
    setAddClass1(true);
  }
  const handleMouseOver2=()=>{
    setAddClass2(true);
  }
  const handleMouseOver3=()=>{
    setAddClass3(true);
  }
  const handleMouseOver4=()=>{
    setAddClass4(true);
  }
  
  const handleMouseOut=()=>{
    setAddClass1(false);
    setAddClass2(false);
    setAddClass3(false);
    setAddClass4(false);
  }

  return (
    <Div>
      <Modal />
      {/* main display home screen */}
      <div className="main">
        <h1>Gaming Orbit</h1>
        <p>Lets <span>{pvalue}</span> together</p>
        <br /><br />
        <p>Our aims is to help you increase your circle and make strong community based on common interest and boost your gaming capability.Let's share our gaming knowledge to form robust and unbeatable squad.</p>
        <Carousel data={slides} />
      </div>

      {/* news section start */}
      <div className="news">
        {/* logo line  */}      
          <div className="img_container">
            <img className={addClass1?'rotate':''} src="./images/gamenews.jpg" alt="game news" />
          </div>
          <div className="img_container">
            <img className={addClass2?'rotate':''} src="./images/gamehost.jpg" alt="game host" />
          </div>
          <div className="img_container">
            <img className={addClass3?'rotate':''} src="./images/gamecommuity.jpg" alt="game community" />
          </div>
          <div className="img_container">
            <img className={addClass4?'rotate':''} src="./images/topgames.jpg" alt="top games" />
          </div>

        {/* card line */}
        <div className="cards 1" onMouseOver={handleMouseOver1} onMouseOut={handleMouseOut}>
          <h2>Games News</h2>
          <p>To see the latest news and recent updates about games and different events click here.</p>
          </div>
        <div className="cards 2" onMouseOver={handleMouseOver2} onMouseOut={handleMouseOut}>
          <h2>Host Game</h2>
          <p>wanna host game or see stream of running game tournaments click here.</p>
          </div>
        <div className="cards 3" onMouseOver={handleMouseOver3} onMouseOut={handleMouseOut}>
          <h2>Communities</h2>
          <p>There are many communities, if you wanna join or create one click here.</p>
          </div>
        <div className="cards 4" onMouseOver={handleMouseOver4} onMouseOut={handleMouseOut}>
          <h2>Top Games</h2>
          <p>This year top games according to game rank association these games are included. Lets share your opinion and exchange review and recommendation. And report if any unsatisfied things about game is troubling you.</p>
        </div>
      </div>

      <Footer/>
    </Div>

  );
}

const Div = styled.div`
font-family: ${({theme})=>theme.fontFamily.games};
  .main {
    width: 100vw;
    height: 100vh;
    background-image: linear-gradient(to bottom right,#020f1f,#4d0702);

    h1, p {
    width: 40%;
      margin: 0;
      padding: 0;
      font-family: ${({ theme }) => theme.fontFamily.games};
      color: #fff;
      position: relative;
      top: 6rem;
      left: 5rem;
      text-align: justify;
    }

    h1 {
      font-size: 3em;
    }

    p {
      font-size: 1em;

      span {
        background-color: ${({ theme }) => theme.colors.logoRed};
        padding: 0 0.5rem;
        border-radius: 0.2rem;
      }
    }
  }

  // news section section start
  .news{
  height: 700px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  align-items: center;

  img{width:120px}

  .img_container{
  max-width: 120px;
  height: 100px;
  }

  .cards{
  width: 100%;
  height: 100%;
  background-image: linear-gradient(#820423,#2b020c);
  color: #fff;
  border-left: 2px solid #fff;
  text-align: center;
  transition: transform 0.5s ease;

  &:hover{
  transform: translate(0,-30px);
  }
  }

  .rotate{
  transform: rotate(360deg);
  transition: transform 0.5s ease;
  }
    // news section end here
    }

`;

export default Home;