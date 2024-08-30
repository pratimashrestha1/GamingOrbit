import React from 'react'
import Modal from './Components/Modal'
import styled from 'styled-components';
import { Carousel } from "./Components/Carousel";
import carouselData from "./data/carouselData.json";

function Home() {
  const { slides } = carouselData;
  return (
    <Div>
      <Modal />
          <Carousel data={slides} />
    </Div>
  )
}

const Div = styled.div`

`

export default Home