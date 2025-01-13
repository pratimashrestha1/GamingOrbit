import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LastTournament = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch tournament data when the component mounts
    axios
      .get('http://localhost:4000/tour/tour-data')
      .then((response) => {
        const data = response.data;
        console.log(data);  // Debugging line
        setTournaments(Array.isArray(data) ? data : [data]);  // Ensure tournaments is an array
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching tournament data');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Loading tournaments...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <Wrapper>
      <div className="container">
        <h1 className="title">Tournaments List</h1>
        <ul className="tournament-list">
          {tournaments.map((tournament) => (
            <li className="tournament-item" key={tournament._id}>
              <div className="tournament-header">
                <h2>{tournament.tournamentName}</h2>
                <p><strong>ID:</strong> {tournament._id}</p>
              </div>
              <p><strong>Game:</strong> {tournament.game}</p>
              <p><strong>Start Date:</strong> {new Date(tournament.startDate).toLocaleDateString()}</p>
              <p><strong>Region:</strong> {tournament.region}</p>
              <p><strong>Status:</strong> {tournament.status}</p>
              <p>
                <strong>Tournament URL:</strong>{' '}
                <a className="tournament-link" href={tournament.tournamentUrl} target="_blank" rel="noopener noreferrer">
                  {tournament.tournamentUrl}
                </a>
              </p>
              <div className="button-container">
                <button className="edit-button" onClick={() => navigate(`/view/${tournament._id}`)}>Edit Tournament</button>
                <button className="delete-button">Delete Tournament</button>
                <button className="action-button">Manage Participants</button>
                <button className="action-button">Bracket Seeding</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Wrapper >
  );
};

export default LastTournament;

const Wrapper = styled.div`
/* LastTournament.css */

/* General Container Styling */
.container {
  padding: 20px;
  background-color: #f8f9fa;
}

/* Title Styling */
.title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 20px;
}

/* Loading and Error Styling */
.loading,
.error {
  text-align: center;
  font-size: 1.5rem;
}

.loading {
  color: #007bff;
}

.error {
  color: #dc3545;
}

/* Tournament List Styling */
.tournament-list {
  list-style-type: none;
  padding: 0;
}

/* Tournament Item Styling */
.tournament-item {
  background-color: #ffffff;
  margin-bottom: 15px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Tournament Header Styling */
.tournament-header {
  margin-bottom: 10px;
}

.tournament-header h2 {
  font-size: 1.5rem;
  color: #343a40;
}

.tournament-header p {
  font-size: 1rem;
  color: #6c757d;
}

/* Tournament Link Styling */
.tournament-link {
  color: #007bff;
  text-decoration: none;
}

.tournament-link:hover {
  text-decoration: underline;
}

/* Button Container Styling */
.button-container {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Button Styling */
.edit-button,
.delete-button,
.action-button {
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  border: none;
}

.edit-button {
  background-color: #28a745;
}

.edit-button:hover {
  background-color: #218838;
}

.delete-button {
  background-color: #dc3545;
}

.delete-button:hover {
  background-color: #c82333;
}

.action-button {
  background-color: #007bff;
}

.action-button:hover {
  background-color: #0056b3;
}

`