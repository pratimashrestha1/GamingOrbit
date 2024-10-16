import React, { useState, useEffect } from 'react'
import Modal from './Components/Modal'
import Theme from './Components/Intro_theme'
import styled from 'styled-components'
import LikeCounter from './Components/Like_counter'
import { FaTrophy } from "react-icons/fa6";
import Footer from './Components/Footer'

function Topgames() {
  const [posts, setPosts] = useState([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from JSONPlaceholder API
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);  // Set the posts in state
        // setLoading(false);  // Set loading to false
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Early return for loading state
  // if (loading) {
  //   return <p>Loading posts...</p>;
  // }

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
          <textarea placeholder="write a review"></textarea>
          <input type="submit" value="submit" />
        </div>
      </div>

      {/* leaderboard */}
      <div className="game-list" >
        <div className="game-item-1">
          <FaTrophy className='trophy-icon' />
          <p>leaderboard</p>
        </div>
        <div className="game-item">
          <div className="left">
            <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/8bfbc4b9-8bd1-4ca2-b19a-165c397e4174/dcnufu3-2b2e4d17-ce67-4ed9-b10f-3eb63771b7a9.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzhiZmJjNGI5LThiZDEtNGNhMi1iMTlhLTE2NWMzOTdlNDE3NFwvZGNudWZ1My0yYjJlNGQxNy1jZTY3LTRlZDktYjEwZi0zZWI2Mzc3MWI3YTkucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.CZ2jTO0PA82QZ7ZIvRvW8zTXlPn_otCbijYq9Hv-oIk" alt="" />
            <h2>PUBG</h2>
          </div>
          <div className="right"><p>1</p></div>
        </div>
        <div className="game-item">
          <div className="left">
            <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f5edeeb1-ecc6-49bb-8d2d-72ab3ab36a87/degn7h4-6c488013-b072-4eea-a386-c614127577e7.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Y1ZWRlZWIxLWVjYzYtNDliYi04ZDJkLTcyYWIzYWIzNmE4N1wvZGVnbjdoNC02YzQ4ODAxMy1iMDcyLTRlZWEtYTM4Ni1jNjE0MTI3NTc3ZTcucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.vxNtMLKMMAk7NYR4i_gRC3uJ4AXpRCjWibuxmJN13vw" alt="" />
            <h2>Freefire</h2>
          </div>
          <div className="right"><p>2</p></div>
        </div>
        <div className="game-item">
          <div className="left">
            <img src="https://freepngimg.com/save/90336-playstation-pc-royale-game-fortnite-battle/512x512" alt="" />
            <h2>Fortnite</h2>
          </div>
          <div className="right"><p>3</p></div>
        </div>
        <div className="game-item">
          <div className="left">
            <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c3f5e888-9edb-41d5-9cec-ad06280152e9/d4xtdr9-d8db81d8-02e1-469f-a9b6-23d6ba47d0d7.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2MzZjVlODg4LTllZGItNDFkNS05Y2VjLWFkMDYyODAxNTJlOVwvZDR4dGRyOS1kOGRiODFkOC0wMmUxLTQ2OWYtYTliNi0yM2Q2YmE0N2QwZDcucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.J6Eah3wLCgMVTiCnUVzIxR9UvYiuLqjniiGBtfXGwFQ" alt="" />
            <h2>COD</h2>
          </div>
          <div className="right"><p>4</p></div>
        </div>
        <div className="game-item">
          <div className="left">
            <img src="./images/clashroyale.png" alt="" />
            <h2>Clash Royale</h2>
          </div>
          <div className="right"><p>5</p></div>
        </div>
        <div className="game-item">
          <div className="left">
            <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/3411dfaa-893e-4093-9260-3592bbd25a39/dgaf20k-dcd4f1a9-69a1-4bf1-9d25-be58cee536e4.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzM0MTFkZmFhLTg5M2UtNDA5My05MjYwLTM1OTJiYmQyNWEzOVwvZGdhZjIway1kY2Q0ZjFhOS02OWExLTRiZjEtOWQyNS1iZTU4Y2VlNTM2ZTQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.SST1beWbLbxU61rmuViwSFlk3BCRdI6c_aLizFCe4Ak" alt="" />
            <h2>Counter-Strike 2</h2>
          </div>
          <div className="right"><p>6</p></div>
        </div>
        <div className="game-item">
          <div className="left">
            <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/557703a2-f0df-4e9e-8006-f1a8a0666122/ddonp58-58ed224c-f931-496d-969a-2f7379849ef8.png/v1/fill/w_512,h_512/cyberpunk_2077_png_icon_by_s7_by_sidyseven_ddonp58-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTEyIiwicGF0aCI6IlwvZlwvNTU3NzAzYTItZjBkZi00ZTllLTgwMDYtZjFhOGEwNjY2MTIyXC9kZG9ucDU4LTU4ZWQyMjRjLWY5MzEtNDk2ZC05NjlhLTJmNzM3OTg0OWVmOC5wbmciLCJ3aWR0aCI6Ijw9NTEyIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.hb8SYjQv4XBeOji7n7D0sA356TQPcUlZ4KUdEiLnqlM" alt="" />
            <h2>Cyberpunk 2077</h2>
          </div>
          <div className="right"><p>7</p></div>
        </div>
        <div className="game-item">
          <div className="left">
            <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/4d04d46d-481e-452a-9bfd-75a8c1cc65a3/dfh0qs5-231e0a2a-1802-4ff1-bf88-6a310863afa1.png" alt="" />
            <h2>GTA San Andres</h2>
          </div>
          <div className="right"><p>8</p></div>
        </div>
        <div className="game-item">
          <div className="left">
            <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9eb92786-5e60-46ac-ae2c-d33af137f691/dad1yjq-7d3b6ae5-2b1c-4570-b65f-0df79372bc85.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzllYjkyNzg2LTVlNjAtNDZhYy1hZTJjLWQzM2FmMTM3ZjY5MVwvZGFkMXlqcS03ZDNiNmFlNS0yYjFjLTQ1NzAtYjY1Zi0wZGY3OTM3MmJjODUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.mMjAEIHvO_Vs9dGLWcD2-ewpqSoXJy-VZVSlGyNSoTU" alt="" />
            <h2>Pokemon Go</h2>
          </div>
          <div className="right"><p>9</p></div>
        </div>
        <div className="game-item">
          <div className="left">
            <img src="./images/coc.png" alt="" />
            <h2>COC</h2>
          </div>
          <div className="right"><p>10</p></div>
        </div>
      </div>
      
      <Footer />
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
    
    textarea{
      width: 20vw;
      height: 10vh;
      margin-left: 3em;
    }
    
    input[type='submit']{
      background: transparent;
      border: 1px solid black;
      border-radius: 4px;
      padding: 5px;
      outline: none;
      margin: 1em;
      transition: all 0.5s ease;

      &:hover{
        translate: 0 -5px;
        box-shadow: 0 5px 2px #000;
      }
    }
  }
}


// leaderboard**************************************************
.game-list::before{
  content:'leaderboard';
  text-align: center;
  font-size: 6em;
  font-weight: bold;
  color: #fff;
  position: absolute;
  rotate: -30deg;
  top: 300px;
  left: 300px;
}
.game-list{
position: relative;
  margin-top: 50px;
  display: grid;
  background-image: url('./images/Bright Blue Purple Gradient Color and Style Video Background.jpg');
  // background-size: cover;
  padding: 50px 0;

  .game-item-1{
    box-shadow: 1px 1px 10px #fff;
    margin: auto;
    width: 65%;
    height: 80px;
    transform: skew(-15deg, 0);
    overflow: hidden;
    border-radius: 0 20px 0 20px;
    background: rgb(50,64,73);
    color: #fff;
    font-size: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
    gap:  1em;

    .trophy-icon{
      font-size: 3em;
    }
  }
  
  .game-item{   
    background: rgba(0, 0, 0, 0.28);
    backdrop-filter: blur(6.7px);
    border: 1px solid rgba(255, 255, 255, 0.37);
    margin: auto;
    width: 65%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    transform: skew(-15deg, 0);
    overflow: hidden;
    border-radius: 0 20px 0 20px;
    transition: all 0.5s ease;

    &:hover{
      scale: 1.1 1.4;
      translate: 0px -10px;   
    }
    
    .left{
      img{
        max-height: 100%;
        margin-right: 1em;
      }
      img,h2{
        display: inline-block;
        vertical-align: middle;
      }
    }
    .right{
      width: 20%;   
      }
  }

    h2{
      margin: 0;
      font-size: 1.5em;
      color: #fff;
      }
      p{
        margin: 0;
        text-align: center;
        font-size: 3em;
        font-family: ${({ theme }) => theme.fontFamily.rank};   
        color: #fff;     
      }
}
`