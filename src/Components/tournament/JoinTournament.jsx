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

        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/tour/all-tour/${userId}`);
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
    padding: '50px',  // Reduced padding to create space but keep overall padding
    display: 'flex',
    flexDirection: 'column',  // Ensure title is at the top and tournaments list follows
    alignItems: 'center',  // Center the content horizontally
    minHeight: '100vh',
  },
  title: {
    textAlign: 'center',
    marginBottom: '30px',  // Space between title and tournaments list
    fontSize: '2em',  // Optional: Increase font size of the title if desired
    color:'blue',
  },
  tournamentsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',  // Added more space between tournament cards
    maxWidth: '1000px',  // Limit the width to prevent cards from stretching too wide
    padding: '20px',  // Add padding around the tournament cards section
  },
  tournamentCard: {
    border: '1px solid #ccc',
    padding: '20px',  // More padding to create space inside each card
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'space-between',  // Space between details and button
    alignItems: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',  // Optional: Add a shadow for better visibility
  },
  tournamentDetails: {
    flex: 1,
  },
  tournamentName: {
    fontSize: '1.3em',  // Slightly larger font size for better visibility
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
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: '20px',  // Space below the error message
  },
};


export default JoinTournament;
