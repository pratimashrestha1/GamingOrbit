import React from "react";
import styled from "styled-components";

const WatchLiveStream = () => {
  return (
    <Div>
      <div className="watch_container">
        <h1>Watch Live Stream</h1>
        <div id="live-stream-container">
          <iframe
            title="watching_live"
            width="560"
            height="315"
            // src="https://www.youtube.com/channel/UCe5M4lR7MkSb56qdDc8WvEw"
            src="https://www.youtube.com/embed/live_stream?channel=UCe5M4lR7MkSb56qdDc8WvEw"
            allow="autoplay; fullscreen"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </Div>
  );
};

// Inline CSS styles for the component
const Div = styled.div`
  .watch_container {
    font-family: Arial, sans-serif;
    text-align: center;
    background-color: #222;
    color: white;
    min-height: 100vh;
    padding: 20px;
  }

  .watch_container h1 {
    margin: 21px;
    font-size: 2rem;
    color: #00d4ff;
  }

  .watch_container iframe {
    border: none;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 212, 255, 0.6);
  }

  //*************************************************************  media query
  @media (max-width:600px){
    .watch_container{
        width: 100vw;

        iframe{
            width: 95%;
            margin-left: -40px;
        }
    }
  }
`;

export default WatchLiveStream;
