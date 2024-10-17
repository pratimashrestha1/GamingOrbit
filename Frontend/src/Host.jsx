import React from 'react'
import Modal from './Components/Modal'
import styled from 'styled-components'
import Theme from './Components/Intro_theme'

function Host() {
  return (
    <Div>
      <Modal />
      <Theme title="Host"
        image='./images/host.png'
        description=' Create and host your own gaming tournaments or events. Set the rules, invite participants, and manage competitions with ease, all while broadcasting live gameplay for others to watch.'
      />

      <div className="options">
        <div className="create-tournament">
          <img src="./images/tournament.gif" alt="" />
          <h2>create tournament</h2>
          <p>To create tournament and generate bracket</p>
        </div>

        <div className="join-tournament">
          <img src="./images/join.gif" alt="" />
          <h2>Join tournament</h2>
          <p>click here to join tournament. Choose and register the available tournament</p>
        </div>

        <div className="live stream">
          <img src="./images/streaming.gif" alt="" />
          <h2>Make live stream</h2>
          <p>stream your live gameplay, share and connect your tactics.</p>
        </div>

        <div className="live watch">
          <img src="./images/live.gif" alt="" />
          <h2>Watch live stream</h2>
          <p>Click here to watch available live stream at the moment. Wait a while if no live is available, it may take sometime to manage.</p>
        </div>
      </div>

    </Div>
  )
}

const Div = styled.div`
.options{
  background: #2874ed;
  justify-content: space-around;
  display: flex;
  
  &>div{
    margin: 50px 0;
    border: 2px solid rgba(200,200,200,0.3);
    max-width: 20%;
    border-radius: 4px;
    background: white;
    img{
      width: 200px;
      display: block;
      margin: auto;
    }

    h2,p{
      text-align: center;
    }
  }
}

`

export default Host