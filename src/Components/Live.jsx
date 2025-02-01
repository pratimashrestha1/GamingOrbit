import React, { useState, useRef } from 'react';
import { io } from 'socket.io-client';

const socket = io(process.env.REACT_APP_API_BASE_URL); // Connect to Socket.IO server

const StreamingPage = () => {
  const [mediaStream, setMediaStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  
  const videoRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setMediaStream(stream);
      videoRef.current.srcObject = stream;
    } catch (err) {
      console.error('Error starting camera:', err);
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
      const recorder = new MediaRecorder(mediaStream, { mimeType: 'video/webm; codecs=vp8,opus' });

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          socket.emit('binarystream', event.data);
        }
      };

      recorder.start(100); // Send data every 100ms
      setMediaRecorder(recorder);
      console.log('Streaming started...');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Gaming Orbit Streaming</h1>
      <div style={styles.videoContainer}>
        <video ref={videoRef} autoPlay muted style={styles.video} />
        <div style={styles.buttonContainer}>
          <button onClick={startCamera} style={styles.button} disabled={mediaStream}>
            Start Camera
          </button>
          <button onClick={stopCamera} style={styles.button} disabled={!mediaStream}>
            Stop Camera
          </button>
          <button onClick={goLive} style={styles.button} disabled={!mediaStream || mediaRecorder}>
            Go Live
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: 'radial-gradient(circle, #4a0000, #000000)',
    color: '#fff',
    textAlign: 'center',
  },
  title: {
    fontSize: '2.5rem',
    color: '#00d4ff',
    textShadow: '0 0 10px #00d4ff, 0 0 20px #00d4ff, 0 0 30px #0094cc',
    marginBottom: '20px',
  },
  videoContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: '20px',
    borderRadius: '15px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 212, 255, 0.8)',
    maxWidth: '450px',
    width: '90%',
  },
  video: {
    width: '100%',
    height: 'auto',
    marginBottom: '20px',
    border: '2px solid #00d4ff',
    borderRadius: '10px',
    boxShadow: '0 0 15px #00d4ff, 0 0 30px #0094cc',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    background: 'linear-gradient(45deg, #00d4ff, #0056ff)',
    color: '#ffffff',
    border: 'none',
    padding: '12px 18px',
    margin: '8px',
    borderRadius: '5px',
    fontSize: '1rem',
    fontFamily: "'Orbitron', Arial, sans-serif",
    textTransform: 'uppercase',
    letterSpacing: '1px',
    cursor: 'pointer',
    transition: 'background 0.3s, box-shadow 0.3s, transform 0.2s',
    boxShadow: '0 4px 15px rgba(0, 212, 255, 0.6), 0 0 10px rgba(0, 212, 255, 0.4)',
  },
};

export default StreamingPage;
