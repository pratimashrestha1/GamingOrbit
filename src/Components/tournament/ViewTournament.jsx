import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaCamera, FaEdit, FaUsers, FaProjectDiagram } from 'react-icons/fa';
import styled from 'styled-components';
import axios from 'axios';
import TieSheet from './Tiesheet4MyTour'; // Import your TieSheet component

const ViewTournament = () => {
  const location = useLocation();
  const tournament = location.state?.tournament;
  const [participants, setParticipants] = useState([]);
  const [visible, setVisible] = useState(false);
  const [showBracket, setShowBracket] = useState(false); // State for TieSheet visibility
  const [profileImage, setProfileImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!tournament) {
    return <div style={{ textAlign: 'center', marginTop: '100px' }}>No tournament data available.</div>;
  }

  const addParticipant = async () => {
    const username = localStorage.getItem('username');
    const userId = localStorage.getItem('userId');
    try {
      const response = await axios.post(`http://localhost:4000/tour/tournament/${tournament._id}/addParticipant`, {
        userId,
        username,
      });
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.message || 'Error adding participant.');
    }
  };

  const fetchParticipants = async () => {
    setVisible(!visible);
    setShowBracket(false);
    try {
      const response = await axios.get(`http://localhost:4000/tour/tournament/${tournament._id}/fetchPaticipants`);
      setParticipants(response.data.participants);
    } catch (error) {
      console.error('Error fetching participants:', error.response?.data?.message || error.message);
    }
  };

  const toggleBracket = () => {
    setShowBracket(!showBracket);
    setVisible(false);
  };

  return (
    <Wrapper>
      <div className="main-container">
        <div className="navbar">
          <h2 className="styled-tournament-name">{tournament.tournamentName}</h2>
        </div>

        <div className="profile-section">
          {profileImage ? (
            <img className="profile-image" src={profileImage} alt="Profile" />
          ) : (
            <span>No Profile Picture</span>
          )}
          <div className="camera-icon-wrapper">
            <input
              type="file"
              accept="image/*"
              id="profile-pic-upload"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
          </div>
          <label htmlFor="profile-pic-upload">
            <FaCamera />
          </label>
        </div>

        <div className="button-container">
          <div className="button-row">
            <button className="button" onClick={addParticipant}>
              <span className="icon-wrapper">
                <FaEdit />
              </span>
              Join tournament
            </button>
            <button className="button" onClick={fetchParticipants}>
              <span className="icon-wrapper">
                <FaUsers />
              </span>
              See Participants
            </button>
            <button className="button" onClick={toggleBracket}>
              <span className="icon-wrapper">
                <FaProjectDiagram />
              </span>
              See Bracket Seeding
            </button>
          </div>
        </div>

        {visible && (
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
        )}

        {showBracket && (
          <div className="tie-sheet-container">
            <TieSheet data={tournament._id} />
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default ViewTournament;

const Wrapper = styled.div`
.main-container {
  // padding-top: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.navbar {
  margin-top: 100px;
  width: 100%;
  background: #121212;
  color: white;
  padding: 20px 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.styled-region {
  color: white;
  font-weight: bold;
  font-size: 16px;
  margin: 0;
}

.styled-tournament-name {
  color: moroon;
  font-size: 32px;
  font-weight: 900;
  margin: 5px 0;
}

.styled-game {
  color: white;
  font-size: 18px;
  margin: 0;
}

.cover-photo {
  width: 100%;
  height: 300px;
  background: url('https://via.placeholder.com/1600x900') center/cover no-repeat;
  margin-top: 120px;
}

.profile-section {
  width: 100%;
  height: 300px;
  background-color: #f1f1f1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-top: 0;
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.camera-icon-wrapper {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: #007bff;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  color: white;
  font-size: 20px;
  transition: background-color 0.3s;
}

.camera-icon-wrapper:hover {
  background-color: #0056b3;
}

.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
}

.button-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.button {
  background: #007bff;
  color: white;
  font-size: 16px;
  padding: 15px 30px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  width: 200px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
}

.button:hover {
  background: #0056b3;
}

.button:active {
  background: #003d80;
}

.icon-wrapper {
  margin-right: 10px;
}

.storage-link {
  margin-top: 10px;
  font-size: 14px;
  color: #007bff;
  text-decoration: none;
}

.storage-link:hover {
  text-decoration: underline;
}

/* Container for participants list */
.participants_list {
  margin-top: 20px;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
  width: 80%;
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

.tie-sheet-container{
  width: 90%;
}
`
