import React from 'react';

const WatchLiveStream = () => {
    return (
        <div style={styles.body}>
            <h1 style={styles.h1}>Watch Live Stream</h1>
            <div id="live-stream-container">
                <iframe
                    title="watching_live"
                    style={styles.iframe}
                    width="560"
                    height="315"
                    // src="https://www.youtube.com/channel/UCe5M4lR7MkSb56qdDc8WvEw"
                    src="https://www.youtube.com/embed/live_stream?channel=UCe5M4lR7MkSb56qdDc8WvEw"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
};

// Inline CSS styles for the component
const styles = {
    body: {
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        backgroundColor: '#222',
        color: 'white',
        minHeight: '100vh',
        padding: '20px',
    },
    h1: {
        margin: '20px',
        fontSize: '2rem',
        color: '#00d4ff',
    },
    iframe: {
        border: 'none',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0, 212, 255, 0.6)',
    },
};

export default WatchLiveStream;
