import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JoinTournament = ({ tournamentss }) => {
  const [tournaments, setTournaments] = useState([]);
  const navigate = useNavigate(); // Use to programmatically navigate

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await fetch('http://localhost:4000/tour/all-tour'); // Adjust your API endpoint
        const data = await response.json();

        if (data && data.length > 0) {
          setTournaments(data);
        } else {
          setTournaments([]); // Handle empty response
        }
      } catch (err) {
        console.error('Error fetching tournaments:', err);
        setTournaments([]); // Handle error scenario
      }
    };

    fetchTournaments();
  }, []);

  const handleJoinClick = (tournament) => {
    navigate('/viewTour', { state: { tournament: tournament } });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Join Tournament</h1>
      <div style={styles.tournamentsList}>
        {Array.isArray(tournaments) && tournaments.length > 0 ? (
          tournaments.map((tournament) => (
            <div key={tournament._id} style={styles.tournamentCard}>
              <div style={styles.tournamentDetails}>
                <h3 style={styles.tournamentName}>{tournament.tournamentName}</h3>
                <p style={styles.game}>{tournament.game}</p>
                <p style={styles.region}>{tournament.region}</p>
                <p style={styles.startDate}>{new Date(tournament.startDate).toLocaleString()}</p>
              </div>
              <button onClick={() => handleJoinClick(tournament)} style={styles.joinButton}>
                Explore
              </button>
            </div>
          ))
        ) : (
          <div style={styles.error}>No tournaments found.</div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    padding: '40px',
    minHeight: '100vh',
    color: '#fff',
  },
  title: {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '2.5rem',
    color: '#ff6347',
    textAlign: 'center',
    marginBottom: '30px',
  },
  tournamentsList: {
    display: 'flex',
    flexDirection: 'column', // Stack the cards vertically
    alignItems: 'center', // Center align the cards
    gap: '20px', // Space between cards
    width: '100%', // Ensures the list takes full width
  },
  tournamentCard: {
    backgroundColor: '#2c3e50',
    padding: '20px',
    borderRadius: '10px',
    width: '70vw', // Set the width of each card to 70% of the viewport width
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
    textAlign: 'center',
    transition: 'transform 0.3s ease',
  },
  tournamentDetails: {
    marginBottom: '20px',
  },
  tournamentName: {
    fontFamily: "'Press Start 2P', cursive",
    fontSize: '1.5rem',
    color: '#ffcc00',
    marginBottom: '10px',
  },
  game: {
    fontSize: '1rem',
    color: '#ddd',
  },
  region: {
    fontSize: '1rem',
    color: '#ddd',
  },
  startDate: {
    fontSize: '1rem',
    color: '#ddd',
    marginBottom: '20px',
  },
  joinButton: {
    backgroundColor: '#ff6347',
    color: 'white',
    padding: '10px 20px',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  error: {
    fontSize: '1.5rem',
    color: '#ff4500',
    textAlign: 'center',
  },
};

export default JoinTournament;



