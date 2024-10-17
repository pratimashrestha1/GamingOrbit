import React from 'react'
import Modal from './Components/Modal'
import styled from 'styled-components'
import Theme from './Components/Intro_theme'
import Button from './Components/Style/Button'

function Aboutus() {
  return (
    <Div>
      <Modal />
      <Theme title="About us"
        image='./images/crop thikkako no bg.png'
        width='400px'
        description=' Learn more about our mission to connect gamers from around the world, offering a platform to play, compete, and grow together in the world of gaming. We are dedicated to fostering a fun and inclusive environment for all types of gamers.'
      />
      <div className="button-container">
        <Button />
      </div>
    </Div>
  )
}

export default Aboutus

const Div = styled.div`
.button-container{
  position: relative;
  top: 100vh;
}
`