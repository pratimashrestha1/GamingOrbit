import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaCamera, FaEdit, FaTrash, FaUsers, FaProjectDiagram } from 'react-icons/fa';

// Main Component
const QA = () => {
  const location = useLocation();
  const navigate = useNavigate();  
  const tournament = location.state?.tournament;

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

  const storageLink = "https://example.com/storage-link"; // Replace with actual storage link

  if (!tournament) {
    return <div style={{ textAlign: 'center', marginTop: '100px' }}>No tournament data available.</div>;
  }

  // Function to handle the edit button click
  const handleEditClick = () => {
    navigate(`/edit-tournament/${tournament._id}`, { state: { tournament } }); // Navigate to the edit page and pass tournament data
  };

  return (
    <MainContainer>
      {/* Navbar for tournament details */}
      <Navbar>
        <StyledRegion>{tournament.region}</StyledRegion>
        <StyledTournamentName>{tournament.tournamentName}</StyledTournamentName>
        <StyledGame>{tournament.game}</StyledGame>
      </Navbar>

      {/* Cover Photo */}
      <CoverPhoto />

      {/* Profile Picture Section */}
      <ProfileSection>
        {profileImage ? (
          <ProfileImage src={profileImage} alt="Profile" />
        ) : (
          <span>No Profile Picture</span>
        )}
        <CameraIconWrapper>
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            id="profile-pic-upload"
            onChange={handleImageUpload}
          />
          <label htmlFor="profile-pic-upload">
            <FaCamera />
          </label>
        </CameraIconWrapper>
      </ProfileSection>

      {/* Buttons below */}
      <ButtonContainer>
        <ButtonRow>
          {/* Edit Tournament Button */}
          <Button onClick={handleEditClick}>
            <IconWrapper>
              <FaEdit />
            </IconWrapper>
            Edit Tournament
          </Button>

          <Button>
            <IconWrapper>
              <FaTrash />
            </IconWrapper>
            Delete Tournament
          </Button>

          {/* Participants Button */}
          <Button>
            <IconWrapper>
              <FaUsers /> {/* Icon for Participants */}
            </IconWrapper>
            Participants
          </Button>

          {/* Bracket Seeding Button */}
          <Button>
            <IconWrapper>
              <FaProjectDiagram /> {/* Icon for Bracket Seeding */}
            </IconWrapper>
            Bracket Seeding
          </Button>
        </ButtonRow>
      </ButtonContainer>

      {/* Storage Link */}
      {profileImage && <StorageLink href={storageLink} target="_blank">View Profile Picture in Storage</StorageLink>}
    </MainContainer>
  );
};

export default QA;

// Styled Components
const MainContainer = styled.div`
  padding-top: 120px; /* Adjust to fit navbar */
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Navbar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
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
`;

const StyledRegion = styled.p`
  color: white;
  font-weight: bold;
  font-size: 16px;
  margin: 0;
`;

const StyledTournamentName = styled.h2`
  color: #8b0000;
  font-size: 32px;
  font-weight: 900;
  margin: 5px 0;
`;

const StyledGame = styled.p`
  color: white;
  font-size: 18px;
  margin: 0;
`;

const CoverPhoto = styled.div`
  width: 100%;
  height: 300px;
  background: url('https://via.placeholder.com/1600x900') center/cover no-repeat;
  margin-top: 120px;
`;

const ProfileSection = styled.div`
  width: 100%;
  height: 300px;
  background-color: #f1f1f1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-top: 0;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CameraIconWrapper = styled.div`
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

  &:hover {
    background-color: #0056b3;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const Button = styled.button`
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

  &:hover {
    background: #0056b3;
  }

  &:active {
    background: #003d80;
  }
`;

const IconWrapper = styled.span`
  margin-right: 10px;
`;

const StorageLink = styled.a`
  margin-top: 10px;
  font-size: 14px;
  color: #007bff;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;
