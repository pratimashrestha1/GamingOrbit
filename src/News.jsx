import React from 'react'
import Modal from './Components/Modal'
import Theme from './Components/Intro_theme'
import styled from 'styled-components'

function News() {
  return (
    <Div>
      <Modal />
      <Theme title="News"
        image='./images/news.png'
        width='300px'
        description=' Stay up-to-date with the latest gaming industry news, including updates on game releases, patches, esports events, and community-driven content.'
      />

      <div className='check'><h1>checking</h1></div>
    </Div>
  )
}

export default News

const Div= styled.div`
.check{
  background: green;
  color: red;
  height: 400px;
  width: 100vw;
}
`