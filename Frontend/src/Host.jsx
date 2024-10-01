import React from 'react'
import Modal from './Components/Modal'
import styled from 'styled-components'
import Theme from './Components/Intro_theme'

function Host() {
  return (
    <Div>
    <Modal/>
    <Theme title="Host"/>
    </Div>
  )
}

const Div = styled.div`

`

export default Host