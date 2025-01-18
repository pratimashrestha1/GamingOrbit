import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function MyTournament() {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch tournaments created by the current user
    const fetchTournaments = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          setError('User not authenticated.');
          setLoading(false);
          return;
        }

        const response = await axios.get(`http://localhost:4000/tour/my-tournaments/${userId}`);

        // Ensure that tournaments are in the response data
        if (response.data.tournaments && Array.isArray(response.data.tournaments)) {
          setTournaments(response.data.tournaments); // Set tournaments array from response
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
    navigate('/viewTour', { state: { tournament: tournament } });
  };

  if (loading) return <div style={styles.loading}>Loading tournaments...</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Join Tournament</h1>
      <div style={styles.tournamentsList}>
        {error && <div style={styles.error}>{error}</div>} {/* Display error message */}
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
  },
  title: {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#333',
  },
  tournamentsList: {
    listStyleType: 'none',
    padding: '0',
  },
  tournamentCard: {
    backgroundColor: '#fff',
    padding: '15px',
    margin: '10px 0',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  tournamentDetails: {
    marginBottom: '10px',
  },
  tournamentName: {
    marginTop: '0',
    color: '#007bff',
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
