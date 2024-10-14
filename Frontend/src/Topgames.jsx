import React, { useState, useEffect } from 'react'
import Modal from './Components/Modal'
import Theme from './Components/Intro_theme'
import styled from 'styled-components'
import LikeCounter from './Components/Like_counter'

function Topgames() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from JSONPlaceholder API
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);  // Set the posts in state
        setLoading(false);  // Set loading to false
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  if (loading) {
    return <p>Loading posts...</p>;
  }

  return (
    <Div>
      <Modal />
      <Theme title="Top Games"
        image='./images/topgames.png'
        width='300px'
        description=' Explore the most popular games played by the community, featuring trending titles, game reviews, and user ratings. Discover new games based on recommendations from fellow gamers.'
      />

      {/* game preview */}
      <div className="top-games-preview">
        <h1>Top 10 Fan-Favorite Games</h1>
        <div className='game1'>
          <img src="https://upload.wikimedia.org/wikipedia/en/thumb/4/44/PlayerUnknown%27s_Battlegrounds_Mobile.webp/180px-PlayerUnknown%27s_Battlegrounds_Mobile.webp.png" alt="" />
          <div className="rating">
            <div className="filling"></div>
            <img src="./images/White Ratings Father's Day Card.png" alt="" />
          </div>
          <h3>Player Unknown BattleGround: PUBG<br />Genre: Multiplayer shooter</h3>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium nisi quasi deserunt cum repellat, distinctio adipisci perspiciatis ab hic consequatur? Dolores beatae nulla, iure fugit dolore omnis repudiandae doloribus soluta.</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium nisi quasi deserunt cum repellat, distinctio adipisci perspiciatis ab hic consequatur? Dolores beatae nulla, iure fugit dolore omnis repudiandae doloribus soluta.</p>
          <LikeCounter />
          <h3>Reviews:</h3>
          <ul>
            {posts.slice(0, 5).map((post) => (
              <li key={post.id}>
                <h4>{post.title.split(' ').slice(0, 2).join(' ')}</h4>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* list of games */}
      <div className="game-list">
        <div className="game-item">
          <h2>PUBG</h2>
          <p>1</p>
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
  display: grid;
  // padding: 0px 100px;

  h1{
  text-align: center;
  padding-top: 50px;
  }
  
  .game1{
    width: 80%;
    margin:auto;
    box-shadow: 0px 4px 8px #999;
    padding: 20px 0px 0px 20px;
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
      ul li h4{
        margin-bottom: -1em;
      }
  }
}

.game-list{
  margin-top: 50px;
  display: grid;
  gap: 10px;

  .game-item{
      margin: auto;
      width: 80%;
      background-color: red;
      display: flex;
      justify-content: space-between;
      align-items: center;

      h2{
        font-size: 100px;
      }
      p{
        font-family: ${({theme})=>theme.fontFamily.rank}};
        font-size: 100px;
    }
}
`