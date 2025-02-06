import React, { useState, useRef } from "react";
import { io } from "socket.io-client";
import styled from "styled-components";

const socket = io(process.env.REACT_APP_API_BASE_URL); // Connect to Socket.IO server

const StreamingPage = () => {
  const [mediaStream, setMediaStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isStreaming, setIsStreaming] = useState(false);

  const videoRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setMediaStream(stream);
      videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("Error starting camera:", err);
    }
  };

  const stopCamera = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
      setMediaStream(null);
      setMediaRecorder(null);
    }
  };

  const goLive = () => {
    if (mediaStream) {
      const recorder = new MediaRecorder(mediaStream, {
        mimeType: "video/webm; codecs=vp8,opus",
      });

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          socket.emit("binarystream", event.data);
        }
      };

      recorder.start(100); // Send data every 100ms
      setMediaRecorder(recorder);
      setIsStreaming(true);
    }
  };

  return (
    <Div>
      <div className="container">
        <h1 className="title">Gaming Orbit Streaming</h1>
        <div className="video-container">
          <video ref={videoRef} autoPlay muted className="video" />
          <div className="button-container">
            <button
              onClick={startCamera}
              className="button"
              disabled={mediaStream}
            >
              Start Camera
            </button>
            <button
              onClick={stopCamera}
              className="button"
              disabled={!mediaStream}
            >
              Stop Camera
            </button>
            <button
              onClick={goLive}
              className="button"
              disabled={!mediaStream || mediaRecorder}
            >
            {isStreaming?(<div className="loader"></div>):"Go Live"}
            </button>
          </div>
        </div>
      </div>
    </Div>
  );
};

export default StreamingPage;

const Div = styled.div`
  /* Container */
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: radial-gradient(circle, #4a0000, #000000);
    color: #fff;
    text-align: center;
  }

  /* Title */
  .title {
    font-size: 2.5rem;
    color: #00d4ff;
    text-shadow: 0 0 10px #00d4ff, 0 0 20px #00d4ff, 0 0 30px #0094cc;
    margin-bottom: 20px;
  }

  /* Video Container */
  .video-container {
    background-color: rgba(0, 0, 0, 0.8);
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 212, 255, 0.8);
    max-width: 450px;
    width: 90%;
  }

  /* Video */
  .video {
    width: 100%;
    height: auto;
    margin-bottom: 20px;
    border: 2px solid #00d4ff;
    border-radius: 10px;
    box-shadow: 0 0 15px #00d4ff, 0 0 30px #0094cc;
  }

  /* Button Container */
  .button-container {
    display: flex;
    justify-content: space-between;
  }

  /* Buttons */
  .button {
    background: linear-gradient(45deg, #00d4ff, #0056ff);
    color: #ffffff;
    border: none;
    padding: 12px 18px;
    margin: 8px;
    border-radius: 5px;
    font-size: 1rem;
    font-family: "Orbitron", Arial, sans-serif;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    transition: background 0.3s, box-shadow 0.3s, transform 0.2s;
    box-shadow: 0 4px 15px rgba(0, 212, 255, 0.6),
      0 0 10px rgba(0, 212, 255, 0.4);
  }

  .button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .loader {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: spin 1s linear infinite;
    display: inline-block;
    margin-left: 10px;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
