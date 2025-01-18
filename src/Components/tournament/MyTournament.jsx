import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

function MyTournament() {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div>Loading tournaments...</div>;

  if (error) return <div>{error}</div>;

  return (
    <Div>
      <h1>Total tournaments: {tournaments.length}</h1>
      <div className="my-tournaments">
        <h2 className="tournament-header">My Tournaments</h2>
        {tournaments.length === 0 ? (
          <p className="no-tournaments">You have not created any tournaments yet.</p>
        ) : (
          <ul className="tournament-list">
            {tournaments.map((tournament) => (
              <li key={tournament._id} className="tournament-item">
                <h3>{tournament.tournamentName}</h3>
                <p><strong>Game:</strong> {tournament.game}</p>
                <p><strong>Region:</strong> {tournament.region}</p>
                <p><strong>Status:</strong> {tournament.status}</p>
                <p><strong>Start Date:</strong> {new Date(tournament.startDate).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
        <button className="explore-btn">Explore More Tournaments</button>
      </div>
    </Div>
  );
}

export default MyTournament;

const Div = styled.div`
.my-tournaments {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.tournament-header {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
}

.no-tournaments {
  color: #d9534f;
  font-size: 1.2rem;
}

.tournament-list {
  list-style-type: none;
  padding: 0;
}

.tournament-item {
  background-color: #fff;
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.tournament-item h3 {
  margin-top: 0;
  color: #007bff;
}

.tournament-item p {
  margin: 5px 0;
  color: #555;
}

.explore-btn {
  display: inline-block;
  background-color: #007bff;
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 5px;
  margin-top: 20px;
  cursor: pointer;
  font-size: 1rem;
  text-align: center;
  transition: background-color 0.3s;
}

.explore-btn:hover {
  background-color: #0056b3;
}
`
