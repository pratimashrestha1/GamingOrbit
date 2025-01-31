import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import TieSheet from './SvgTieSheet';

const LastTournament = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTabs, setActiveTabs] = useState({}); // Active tab for each tournament
  const navigate = useNavigate();
  const location = useLocation();
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const tourData = location.state?.tourData;
    // console.log(tourData._id);
    const fetchParticipants = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/tour/tournament/${tourData._id}/fetchPaticipants`);
        setParticipants(response.data.participants); // Update participants state
        // console.log(participants);
      } catch (error) {
        console.error('Error fetching participants:', error.response?.data?.message || error.message);
      }
    };

    fetchParticipants();
  }, [location.state]);


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
        return (
          <div className="tab-content">
            <TieSheet data={tournament._id} />
          </div>
        );
      case 'Participants':
        return (
          <div className="participants_list">
            <table>
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                {participants.length > 0 ? (
                  participants.map((participant) => (
                    <tr key={participant.userId}>
                      <td>{participant.userId}</td>
                      <td>{participant.username}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2">No participants found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        );

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

  const deleteTournament = async () => {
    const tourData = location.state?.tourData;
    // console.log(tourData._id);
    try {
      const confirmed = window.confirm('Are you sure you want to delete this tournament?');
      if (!confirmed) {
        return;
      }

      // Make the delete request
      await axios.delete(`http://localhost:4000/tour/delTour/${tourData._id}`);
      alert("delete successfully !");
    } catch (error) {
      console.error('Error deleting tournament:', error.response?.data?.message || error.message);
      // setMessage('Error deleting the tournament. Please try again.');
    }
  };

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
                <button className="delete-button" onClick={deleteTournament}>Delete Tournament</button>
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

  .participants_list {
  margin-top: 20px;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
  max-width: 100%;
}

/* Table styles */
.participants_list table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

/* Table header styles */
.participants_list th {
  background-color: #4CAF50;
  color: white;
  padding: 10px;
  text-align: left;
  font-size: 16px;
}

/* Table cell styles */
.participants_list td {
  padding: 8px;
  border: 1px solid #ddd;
  text-align: left;
  font-size: 14px;
}

/* Alternate row colors */
.participants_list tr:nth-child(even) {
  background-color: #f2f2f2;
}

/* Hover effect for rows */
.participants_list tr:hover {
  background-color: #e9e9e9;
}

/* Message when no participants are found */
.participants_list .no-participants {
  text-align: center;
  font-style: italic;
  color: #777;
  padding: 10px;
}
`;
