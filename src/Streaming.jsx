import React, { useRef, useState } from "react";
import io from "socket.io-client";  // Ensure Socket.IO is imported
import styled from "styled-components";

const socket = io("http://localhost:4000", {
  transports: ["websocket", "polling"], // Specify transports to avoid fallback issues
});


const WebcamViewer = () => {
  const videoRef = useRef(null); // Reference to the video element
  const [stream, setStream] = useState(null); // Store the media stream
  const [error, setError] = useState(null); // Store any error messages

  // Function to handle webcam access
  const handleStartWebcam = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        // No need to explicitly call play(), autoPlay is set to true
      }

      setStream(mediaStream);
      setError(null);
    } catch (err) {
      console.error("Error accessing webcam:", err);
      setError("Unable to access webcam. Please check your permissions.");
    }
  };

  // Function to stop the webcam
  const handleStopWebcam = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());

      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }

      setStream(null);
    }
  };

  // Function to start recording and send the stream via socket
  const handleStartRecording = () => {
    if (stream) {
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "video/webm;codecs=vp8,opus", // Force WebM format with VP8 and Opus
        audioBitsPerSecond: 128000,             // Audio quality
        videoBitsPerSecond: 2500000,            // Video quality
      });
    
      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          console.log("Sending binary stream chunk, size:", event.data.size);
          socket.emit("binarystream", event.data);
        }
      };
    
      mediaRecorder.onerror = (error) => {
        console.error("MediaRecorder error:", error);
      };
    
      mediaRecorder.start(100); // Start recording with a chunk interval of 100ms
    }
    
  };

  return (
    <StyledWebcamViewer>
      <div className="video-wrapper">
        {error ? (
          <p className="error-message">{error}</p>
        ) : (
          <video ref={videoRef} autoPlay muted className="video" />
        )}
      </div>
      <button
        onClick={handleStartWebcam}
        className="button start"
      >
        Start Webcam
      </button>
      <button
        onClick={handleStopWebcam}
        className="button stop"
        disabled={!stream}
      >
        Stop Webcam
      </button>

      <button
        onClick={handleStartRecording}
        className="button record"
        disabled={!stream}
      >
        Start Recording & Send
      </button>
    </StyledWebcamViewer>
  );
};

export default WebcamViewer;

const StyledWebcamViewer = styled.div`
  text-align: center;
  margin-top: 20px;

  .video-wrapper {
    border: 1px solid #ccc;
    display: inline-block;
    padding: 10px;
    width: 320px;
    height: 240px;
    background-color: #000;
  }

  .video {
    width: 100%;
    height: 100%;
  }

  .error-message {
    color: red;
  }

  .button {
    margin: 10px 5px 0;
    padding: 10px;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: gray;
    transition: background-color 0.3s ease;

    &.start {
      background-color: green;

      &:hover {
        background-color: darkgreen;
      }
    }

    &.stop {
      background-color: red;

      &:hover {
        background-color: darkred;
      }

      &:disabled {
        background-color: gray;
        cursor: not-allowed;
      }
    }

    &.record {
      background-color: blue;

      &:hover {
        background-color: darkblue;
      }

      &:disabled {
        background-color: gray;
        cursor: not-allowed;
      }
    }
  }
`;
