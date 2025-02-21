import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal";
import styled from "styled-components";

const JoinTournament = () => {
  const [tournaments, setTournaments] = useState([]);
  const [error, setError] = useState(null); // Optional error state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          setError("User ID is not available.");
          return;
        }
        
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/tour/all-tour/${userId}`
        );
        const data = await response.json();

        // Check if the response contains tournaments and filter them
        if (data.tournaments && data.tournaments.length > 0) {
          // Filter out tournaments created by the logged-in user
          const filteredTournaments = data.tournaments.filter(
            (tournament) => tournament.createdBy !== userId
          );
          setTournaments(filteredTournaments); // Set filtered tournaments
        } else {
          setTournaments([]); // Handle empty response
        }
      } catch (err) {
        console.error("Error fetching tournaments:", err);
        setError("Error fetching tournaments"); // Set error message
        setTournaments([]); // Handle error scenario
      }
    };

    fetchTournaments();
  }, []);

  const handleJoinClick = (tournament) => {
    navigate("/viewTour", { state: { tournament: tournament } });
  };

  return (
    <Div>
      <Modal />
      <div className="container">
        <h1 className="title">Join Tournament</h1>
        <div className="tournamentsList">
          {error && <div className="error">{error}</div>}{" "}
          {/* Display error message */}
          {Array.isArray(tournaments) && tournaments.length > 0 ? (
            tournaments.map((tournament) => (
              <div key={tournament._id} className="tournamentCard">
                <div className="tournamentDetails">
                  <h3 className="tournamentName">
                    {tournament.tournamentName}
                  </h3>
                  <p className="game">{tournament.game}</p>
                  <p className="region">{tournament.region}</p>
                  <p className="startDate">
                    {new Date(tournament.startDate).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => handleJoinClick(tournament)}
                  className="joinButton"
                >
                  Explore
                </button>
              </div>
            ))
          ) : (
            <div className="error">No tournaments found.</div>
          )}
        </div>
      </div>
    </Div>
  );
};

export default JoinTournament;

//********************************************************  style component
const Div = styled.div`
  margin-top: 70px;
  .container {
    padding: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
  }

  .title {
    text-align: center;
    margin-bottom: 30px;
    font-size: 2em;
    color: blue;
  }

  .tournamentsList {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    gap: 2em;
    justify-content: stretch;
  }

  .tournamentCard {
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .tournamentDetails {
    flex: 1;
  }

  .tournamentName {
    font-size: 1.3em;
    margin-bottom: 10px;
  }

  .game,
  .region,
  .startDate {
    font-size: 1em;
    margin-bottom: 5px;
  }

  .joinButton {
    background-color: #4caf50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
  }

  .error {
    color: red;
    text-align: center;
    margin-bottom: 20px;
  }

  //********************************************************  media query
  @media (max-width: 600px) {
    .tournamentsList {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: auto;
      gap: 10px;
    }

    .tournamentCard {
      width: 100%;
      margin-left: -2em;
      padding-right: 3em;
    }

    .joinButton {
      padding: 5px 10px;
      border-radius: 4px;
      font-weight: bold;
    }
  }
`;
