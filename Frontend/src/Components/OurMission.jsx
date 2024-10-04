import React from "react";

const OurMission = () => {
  const styles = {
    pageBackground: {
      backgroundImage: "url(https://path-to-streaming-background-image.jpg)", // Replace with a streaming/gaming image URL
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
      color: "#fff",
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0, 0, 0, 0.5)", // Dark overlay for better text readability
      zIndex: 0,
    },
    contentContainer: {
      position: "relative",
      zIndex: 1,
      padding: "40px",
      maxWidth: "900px",
      margin: "0 auto",
      textAlign: "center",
      backgroundColor: "rgba(0, 0, 0, 0.7)", // Semi-transparent background for the mission section
      borderRadius: "15px",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
      backdropFilter: "blur(10px)", // Glass effect
    },
    heading: {
      fontSize: "3rem",
      color: "#fff",
      marginBottom: "20px",
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
    },
    paragraph: {
      fontSize: "1.4rem",
      color: "#e0e0e0",
      lineHeight: "1.8",
      marginBottom: "20px",
      textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
    },
    button: {
      padding: "10px 20px",
      backgroundColor: "#ff4500", // Gaming-style button color
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      fontSize: "1.2rem",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      textTransform: "uppercase",
    },
    buttonHover: {
      backgroundColor: "#e03e00", // Slightly darker on hover
    },
  };

  return (
    <div style={styles.pageBackground}>
      <div style={styles.overlay}></div>
      <div style={styles.contentContainer}>
        <h1 style={styles.heading}>Our Mission</h1>
        <p style={styles.paragraph}>
          At GamingOrbit, our mission is to create a centralized platform that
          brings together gamers, developers, and industry enthusiasts. We aim
          to provide an engaging environment where users can connect, compete,
          and grow through customizable profiles, tournaments, and interactive
          forums.
        </p>
        <p style={styles.paragraph}>
          We believe in fostering a vibrant community, offering the tools and
          support needed to enhance gaming experiences, create content, and
          discover new opportunities. Our platform is dedicated to innovation,
          inclusivity, and supporting emerging talent within the gaming world.
        </p>
        <button
          style={styles.button}
          onMouseOver={(e) =>
            (e.target.style.backgroundColor =
              styles.buttonHover.backgroundColor)
          }
          onMouseOut={(e) =>
            (e.target.style.backgroundColor = styles.button.backgroundColor)
          }
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default OurMission;
