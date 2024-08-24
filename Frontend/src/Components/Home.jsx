import React from 'react'
import Modal from './Modal'
import styled from 'styled-components'

function Home() {
  return (
    <Div>
    <Modal/>
    </Div>
  )
}

const Div= styled.div`
width:100vw;
height: 100vh;
background-image: url('https://c4.wallpaperflare.com/wallpaper/56/878/323/pubg-playerunknown-s-battlegrounds-4k-wallpaper-preview.jpg');
background-size: cover;
`

export default Home