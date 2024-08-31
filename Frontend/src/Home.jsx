import React, { useState, useEffect } from 'react';
import Modal from './Components/Modal';
import styled from 'styled-components';
import { Carousel } from "./Components/Carousel";
import carouselData from "./data/carouselData.json";

function Home() {
  const [pvalue, setPvalue] = useState('Connect');
  const { slides } = carouselData;

  useEffect(() => {
    const values = ['Connect', 'Play', 'Stream'];
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % values.length; // Cycle through the values
      setPvalue(values[index]);
    }, 2000); // Change every 2 seconds (2000 ms)

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <Div>
      <Modal />
      <div className="main">
        <h1>Gaming Orbit</h1>
        <p>Lets <span>{pvalue}</span> together</p>
        <br/><br/>
        <p>Our aims is to help you increase your circle and make strong community based on common interest and boost your gaming capability.Let's share our gaming knowledge to form robust and unbeatable squad.</p>
        <Carousel data={slides} />
      </div>
    </Div>
  );
}

const Div = styled.div`
  .main {
    width: 100vw;
    height: 90vh;
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
        background-color: ${({theme})=>theme.colors.logoRed};
        padding: 0 0.5rem;
        border-radius: 0.2rem;
      }
    }
  }
`;

export default Home;
