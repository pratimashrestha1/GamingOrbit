import React from 'react'
import Modal from './Components/Modal'
import styled from 'styled-components'
import Theme from './Components/Intro_theme'

function Aboutus() {
  return (
    <Div>
      <Modal />
      <Theme title="About us"/>
    </Div>
  )
}

export default Aboutus

const Div = styled.div``