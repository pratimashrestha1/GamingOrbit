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
    axios
      .get('http://localhost:4000/tour/tour-data')
      .then((response) => {
        const data = response.data;
        setTournaments(Array.isArray(data) ? data : [data]);
        setLoading(false);
      })
      .catch(() => {
        setError('Error fetching tournament data');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Wrapper><div className="loading">Loading tournaments...</div></Wrapper>;
  }

  if (error) {
    return <Wrapper><div className="error">{error}</div></Wrapper>;
  }

  return (
    <Wrapper>
      <div className="container">
        <h1 className="title">Tournaments</h1>
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
    </Wrapper>
  );
};

export default LastTournament;

const Wrapper = styled.div`
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background: linear-gradient(135deg, #1e293b, #334155);
    color: #f1f5f9;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .title {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 20px;
    color: #0ea5e9;
  }

  .loading,
  .error {
    text-align: center;
    font-size: 1.5rem;
    margin: 20px 0;
  }

  .loading {
    color: #0ea5e9;
  }

  .error {
    color: #ef4444;
  }

  .tournament-list {
    list-style: none;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }

  .tournament-item {
    background: #1e293b;
    padding: 20px;
    border-radius: 8px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .tournament-item:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.3);
  }

  .tournament-header h2 {
    font-size: 1.5rem;
    color: #0ea5e9;
  }

  .tournament-link {
    color: #38bdf8;
    text-decoration: none;
  }

  .tournament-link:hover {
    text-decoration: underline;
  }

  .button-container {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .edit-button {
    background: #22c55e;
    color: #f1f5f9;
  }

  .delete-button {
    background: #ef4444;
    color: #f1f5f9;
  }

  .action-button {
    background: #0ea5e9;
    color: #f1f5f9;
  }

  .edit-button,
  .delete-button,
  .action-button {
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    border: none;
    transition: background 0.3s ease;
  }

  .edit-button:hover {
    background: #16a34a;
  }

  .delete-button:hover {
    background: #dc2626;
  }

  .action-button:hover {
    background: #0284c7;
  }
`;