import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function MyTournament() {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          setError('User not authenticated.');
          setLoading(false);
          return;
        }

        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/tour/my-tournaments/${userId}`);
        if (response.data.tournaments && Array.isArray(response.data.tournaments)) {
          setTournaments(response.data.tournaments);
        } else {
          setError('Unexpected response format.');
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching tournaments:', err);
        setError('Error fetching tournaments');
        setLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  const handleJoinClick = (tournament) => {
    navigate('/lastTour', { state: { tourData: tournament } });
  };

  if (loading) return <div style={styles.loading}>Loading tournaments...</div>;

  return (
    <div style={styles.container}>
      <h1>Total tournaments: {tournaments.length}</h1>
      <h1 style={styles.title}>Join Tournament</h1>
      <div style={styles.tournamentsList}>
        {error && <div style={styles.error}>{error}</div>}
        {Array.isArray(tournaments) && tournaments.length > 0 ? (
          tournaments.map((tournament) => (
            <div key={tournament._id} style={styles.tournamentCard}>
              <div style={styles.tournamentDetails}>
                <h3 style={styles.tournamentName}>{tournament.tournamentName}</h3>
                <p style={styles.game}>{tournament.game}</p>
                <p style={styles.region}>{tournament.region}</p>
                <p style={styles.startDate}>{new Date(tournament.startDate).toLocaleString()}</p>
              </div>
              <button
                onClick={() => handleJoinClick(tournament)}
                style={styles.joinButton}
              >
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
}

export default MyTournament;

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',  // Center horizontally
    justifyContent: 'center',  // Center vertically
    minHeight: '100vh',  // Full screen height
  },
  title: {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#333',
  },
  tournamentsList: {
    listStyleType: 'none',
    padding: '0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',  // Center tournament cards horizontally
    justifyContent: 'center',  // Center tournament cards vertically
    gap: '20px',  // Space between cards
  },
  tournamentCard: {
    background: 'rgba(255, 255, 255, 0.4)',  // Semi-transparent white for frosted glass effect
    padding: '20px',
    margin: '10px 0',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Soft shadow for depth
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '800px',
    width: '100%',
    backdropFilter: 'blur(6px)', // Optional if your browser supports backdrop-filter
  },
  tournamentDetails: {
    marginRight: '20px',
  },
  tournamentName: {
    marginTop: '0',
    color: '#007bff',
    fontSize: '1.3rem',
  },
  game: {
    margin: '5px 0',
    color: '#555',
  },
  region: {
    margin: '5px 0',
    color: '#555',
  },
  startDate: {
    margin: '5px 0',
    color: '#555',
  },
  joinButton: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '12px 25px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    textAlign: 'center',
    transition: 'background-color 0.3s',
    width: '120px',  // Fixed width for the button
  },
  joinButtonHover: {
    backgroundColor: '#0056b3',
  },
  error: {
    color: '#d9534f',
    fontSize: '1.2rem',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.5rem',
    color: '#007bff',
  },
};
