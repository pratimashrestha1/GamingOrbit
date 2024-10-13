import React from 'react'
import Modal from './Components/Modal'
import Theme from './Components/Intro_theme'
import styled from 'styled-components'
import LikeCounter from './Components/Like_counter'

function Topgames() {
  return (
    <Div>
      <Modal />
      <Theme title="Top Games"
        image='./images/topgames.png'
        width='300px'
        description=' Explore the most popular games played by the community, featuring trending titles, game reviews, and user ratings. Discover new games based on recommendations from fellow gamers.'
      />

      <div className="top-games-preview">
        <h1>Top 10 Fan-Favorite Games</h1>
        <div className='game1'>
          <img src="https://upload.wikimedia.org/wikipedia/en/thumb/4/44/PlayerUnknown%27s_Battlegrounds_Mobile.webp/180px-PlayerUnknown%27s_Battlegrounds_Mobile.webp.png" alt="" />
          <div className="rating">
            <div className="filling"></div>
            <img src="./images/White Ratings Father's Day Card.png" alt="" />
          </div>
          <h3>Player Unknown BattleGround: PUBG</h3>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium nisi quasi deserunt cum repellat, distinctio adipisci perspiciatis ab hic consequatur? Dolores beatae nulla, iure fugit dolore omnis repudiandae doloribus soluta.</p>
          <LikeCounter />
          <h4>Reviews:</h4>
        </div>
      </div>
    </Div>
  )
}

export default Topgames

const Div = styled.div`
font-family: ${({ theme }) => theme.fontFamily.games};

.top-games-preview{
  background: #fff;
  
  .game1{
    .rating{
      max-width: 150px;
      height: 2em;
      position: relative;
      
      img{
      width: 100%;
      height: 100%;
      position: absolute;
      }

      .filling{
        height: 100%;
        width: 85%;
        background: #deba09;
        position: absolute;

      }
    }
  }
}
`