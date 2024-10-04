import React from 'react'
import Modal from './Components/Modal'
import styled from 'styled-components'
import Theme from './Components/Intro_theme'

function Host() {
  return (
    <Div>
    <Modal/>
    <Theme title="Host" 
    image='./images/host.png'
    description=' Create and host your own gaming tournaments or events. Set the rules, invite participants, and manage competitions with ease, all while broadcasting live gameplay for others to watch.'
    />
    </Div>
  )
}

const Div = styled.div`

`

export default Host