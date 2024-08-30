import React from 'react'
import Modal from './Components/Modal'
import styled from 'styled-components'

function Host() {
  return (
    <Div>
    <Modal/>
    <div className="section1">
        <img src="./images/wallpaper1.jpg" alt="" />
      </div>
    </Div>
  )
}

const Div = styled.div`
width:100vw;
height: 100vh;

div{
// it remove the small gap between div(section)
font-size: 0;
}

img{
width: 100%;
}
`

export default Host