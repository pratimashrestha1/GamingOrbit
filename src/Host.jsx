import React from "react";
import Modal from "./Components/Modal";
import styled from "styled-components";
import Theme from "./Components/Intro_theme";
import Footer from "./Components/Footer";
import { useNavigate } from "react-router-dom";

function Host() {
  const navigate = useNavigate();

  const handleClickCreate = () => {
    navigate("/create-tournament");
  };

  const handleClickJoin = () => {
    navigate("/joinTour");
  };

  const handleClickLive = () => {
    navigate("/live");
  };

  const handleClickWatch = () => {
    navigate("/watch");
  };
  return (
    <Div>
      <Modal />
      <Theme
        title="Host"
        image="./images/host.png"
        description=" Create and host your own gaming tournaments or events. Set the rules, invite participants, and manage competitions with ease, all while broadcasting live gameplay for others to watch."
      />

      <div className="options">
        <div className="create-tournament" onClick={handleClickCreate}>
          <img src="./images/tournament1.gif" alt="" />
          <h2>create tournament</h2>
          <p>To create tournament and generate bracket</p>
        </div>

        <div className="join-tournament" onClick={handleClickJoin}>
          <img src="./images/join.gif" alt="" />
          <h2>Join tournament</h2>
          <p>
            click here to join tournament. Choose and register the available
            tournament
          </p>
        </div>

        <div className="live stream" onClick={handleClickLive}>
          <img src="./images/streaming1.gif" alt="" />
          <h2>Make live stream</h2>
          <p>stream your live gameplay, share and connect your tactics.</p>
        </div>

        <div className="live watch" onClick={handleClickWatch}>
          <img src="./images/live.gif" alt="" />
          <h2>Watch live stream</h2>
          <p>
            Click here to watch available live stream at the moment. Wait a
            while if no live is available, it may take sometime to manage.
          </p>
        </div>
      </div>

      <Footer />
    </Div>
  );
}
export default Host;

//******************************************************************* css
const Div = styled.div`
  font-family: ${({ theme }) => theme.fontFamily.host};
  .options {
    display: flex;
    justify-content: space-around;
    /* flex-wrap: wrap; */

    & > div {
      margin: 50px 0;
      border: 2px solid rgba(200, 200, 200, 0.3);
      width: 20%;
      border-radius: 4px;
      background: #fff;
      transition: all 0.3s ease;

      &:hover {
        translate: 0 -5px;
        box-shadow: 0 8px 2px #000;
        cursor: pointer;
      }

      img {
        width: 200px;
        display: block;
        margin: auto;
      }

      h2,
      p {
        text-align: center;
      }
    }
  }

  //******************************************************************* media query
  @media (max-width: 600px) {
    .options {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1em;

      &>div{
        width: fit-content;
        margin: 0 2em;
        border: 2px solid rgba(164, 230, 246, 0.8);

        img{
          width: 150px;
        }
      }
    }
  }
`;
