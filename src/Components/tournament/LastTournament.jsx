import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const LastTournament = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTabs, setActiveTabs] = useState({}); // Active tab for each tournament
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const tourData = location.state?.tourData;
    if (!tourData) {
      setError('No tournament data provided.');
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:4000/tour/tour-data/${tourData._id}`)
      .then((response) => {
        const data = response.data;
        const tournamentsData = Array.isArray(data) ? data : [data];
        setTournaments(tournamentsData);

        // Set default active tab to "Overview" for each tournament
        const defaultTabs = tournamentsData.reduce((tabs, tournament) => {
          tabs[tournament._id] = 'Overview';
          return tabs;
        }, {});
        setActiveTabs(defaultTabs);

        setLoading(false);
      })
      .catch(() => {
        setError('Error fetching tournament data.');
        setLoading(false);
      });
  }, [location.state]);

  const handleTabChange = (tournamentId, tab) => {
    setActiveTabs((prevTabs) => ({
      ...prevTabs,
      [tournamentId]: tab,
    }));
  };

  const renderTabContent = (tab, tournament) => {
    switch (tab) {
      case 'Overview':
        return (
          <div className="tab-content">
            <p><strong>Region:</strong> {tournament.region}</p>
            <p><strong>Start Date:</strong> {new Date(tournament.startDate).toLocaleString()}</p>
            <p><strong>Status:</strong> {tournament.status}</p>
            <p><strong>Max players allowed:</strong> {tournament.maxPlayers}</p>
            <p><strong>Participants:</strong> {tournament.participants.length}</p>
          </div>
        );
      case 'Brackets':
        return <div className="tab-content"><p>Brackets feature coming soon!</p></div>;
      case 'Participants':
        return <div className="tab-content"><p>Participants feature coming soon!</p></div>;
      default:
        return null;
    }
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    alert('Tournament URL copied to clipboard!');
  };

  if (loading) return <Wrapper><div className="loading">Loading tournaments...</div></Wrapper>;
  if (error) return <Wrapper><div className="error">{error}</div></Wrapper>;

  return (
    <Wrapper>
      <div className="container">
        <ul className="tournament-list">
          {tournaments.map((tournament) => (
            <li className="tournament-item" key={tournament._id}>
              <div className="tournament-header">
                <h2>{tournament.game} Tournament By: {tournament.tournamentName}</h2>
              </div>
              <div className="tabs">
                {['Overview', 'Brackets', 'Participants'].map((tab) => (
                  <span
                    key={tab}
                    className={`tab ${activeTabs[tournament._id] === tab ? 'active' : ''}`}
                    onClick={() => handleTabChange(tournament._id, tab)}
                  >
                    {tab}
                  </span>
                ))}
              </div>
              <div className="tab-content-wrapper">
                {renderTabContent(activeTabs[tournament._id], tournament)}
              </div>
              <div className="button-container">
                <button className="edit-button" onClick={() => navigate(`/view/${tournament._id}`)}>Edit Tournament</button>
                <button className="delete-button">Delete Tournament</button>
                <button className="action-button">Manage Participants</button>
                <button className="action-button">Bracket Seeding</button>
                <button
                  className="share-button"
                  onClick={() => copyToClipboard(`${window.location.origin}/view/${tournament._id}`)}
                >
                  Share
                </button>
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
    background: none;
    color: #f1f5f9;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .loading, .error {
    text-align: center;
    font-size: 1.5rem;
    margin: 20px 0;
  }

  .tournament-list {
    list-style: none;
    padding: 0;
    display: grid;
    // grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }

  .tournament-item {
    background: #ffffff;
    padding: 20px;
    border-radius: 8px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    color: #1e293b;
  }

  .tournament-item:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.3);
  }

  .tabs {
    display: flex;
    gap: 10px;
    margin: 10px 0;
  }

  .tab {
    background: #e2e8f0;
    color: #1e293b;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.9rem;
  }

  .tab.active {
    background: #0ea5e9;
    color: #ffffff;
  }

  .tab-content-wrapper {
    background: #f8fafc;
    padding: 15px;
    border-radius: 8px;
    margin-top: 10px;
  }

  .button-container {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  button {
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    border: none;
    transition: background 0.3s ease;
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

  .share-button {
    background: #6366f1;
    color: #ffffff;
  }

  button:hover {
    filter: brightness(1.2);
  }
`;
