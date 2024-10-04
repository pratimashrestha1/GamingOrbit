import React from 'react'
import Modal from './Components/Modal'
import Theme from './Components/Intro_theme'

function Topgames() {
  return (
    <>
    <Modal/>
    <Theme title="Top Games"
     image='./images/topgames.png'
     width='300px'
     description=' Explore the most popular games played by the community, featuring trending titles, game reviews, and user ratings. Discover new games based on recommendations from fellow gamers.'
     />
    </>
  )
}

export default Topgames