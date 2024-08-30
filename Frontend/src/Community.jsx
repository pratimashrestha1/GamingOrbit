import React from 'react'
import Modal from './Components/Modal'
import styled from 'styled-components'

function Community() {
  return (
    <Div>    
    <Modal/>
    <div className="section2">
        <img src="./images/wallpaper2.jpg" alt="" />
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

export default Community