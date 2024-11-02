import React from 'react'
import Modal from './Components/Modal'
import Theme from './Components/Intro_theme'

function News() {
  return (
    <>
    <Modal/>
    <Theme title="News" 
    image='./images/news.png'
    width='300px'
    description=' Stay up-to-date with the latest gaming industry news, including updates on game releases, patches, esports events, and community-driven content.'
    />
    </>
  )
}

export default News