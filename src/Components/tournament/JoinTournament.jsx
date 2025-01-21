import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal';

const JoinTournament = () => {
  const [tournaments, setTournaments] = useState([]);
  const [error, setError] = useState(null); // Optional error state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          setError('User ID is not available.');
          return;
        }

        const response = await fetch(`http://localhost:4000/tour/all-tour/${userId}`);
        const data = await response.json();

        // Check if the response contains tournaments and filter them
        if (data.tournaments && data.tournaments.length > 0) {
          // Filter out tournaments created by the logged-in user
          const filteredTournaments = data.tournaments.filter(
            (tournament) => tournament.createdBy !== userId
          );
          setTournaments(filteredTournaments);  // Set filtered tournaments
        } else {
          setTournaments([]); // Handle empty response
        }
      } catch (err) {
        console.error('Error fetching tournaments:', err);
        setError('Error fetching tournaments'); // Set error message
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
      <Modal/>
      <h1 style={styles.title}>Join Tournament</h1>
      <div style={styles.tournamentsList}>
        {error && <div style={styles.error}>{error}</div>}  {/* Display error message */}
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
    padding: '20px',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  tournamentsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  tournamentCard: {
    border: '1px solid #ccc',
    padding: '10px',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tournamentDetails: {
    flex: 1,
  },
  tournamentName: {
    fontSize: '1.2em',
    marginBottom: '10px',
  },
  game: {
    fontSize: '1em',
    marginBottom: '5px',
  },
  region: {
    fontSize: '1em',
    marginBottom: '5px',
  },
  startDate: {
    fontSize: '0.9em',
    marginBottom: '10px',
  },
  joinButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
};

export default JoinTournament;
