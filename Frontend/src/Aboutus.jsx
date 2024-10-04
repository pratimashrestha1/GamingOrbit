import React from 'react'
import Modal from './Components/Modal'
import styled from 'styled-components'
import Theme from './Components/Intro_theme'

function Aboutus() {
  return (
    <Div>
      <Modal />
      <Theme title="About us" 
      image='./images/crop thikkako no bg.png'
      width='400px'
      description=' Learn more about our mission to connect gamers from around the world, offering a platform to play, compete, and grow together in the world of gaming. We are dedicated to fostering a fun and inclusive environment for all types of gamers.'
      />
    </Div>
  )
}

export default Aboutus

const Div = styled.div``