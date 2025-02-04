import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function MyTournament() {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          setError("User not authenticated.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/tour/my-tournaments/${userId}`
        );
        if (
          response.data.tournaments &&
          Array.isArray(response.data.tournaments)
        ) {
          setTournaments(response.data.tournaments);
        } else {
          setError("Unexpected response format.");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching tournaments:", err);
        setError("Error fetching tournaments");
        setLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  const handleJoinClick = (tournament) => {
    navigate("/lastTour", { state: { tourData: tournament } });
  };

  if (loading) return <div className="loading">Loading tournaments...</div>;

  return (
    <Div>
      <div className="container">
        <h1 className="title">My Tournament: {tournaments.length}</h1>
        <div className="tournamentsList">
          {error && <div className="error">{error}</div>}
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
}

export default MyTournament;

const Div = styled.div`
  .container {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  }

  .title {
    font-size: 2rem;
    margin-bottom: 20px;
    color: blue;
  }

  .tournamentsList {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 80vw;
    align-items: center;
  }

  .tournamentCard {
    background: rgba(255, 255, 255, 0.4);
    padding: 20px;
    margin: 10px 0;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 800px;
    width: 100%;
    backdrop-filter: blur(6px);
  }

  .tournamentDetails {
    margin-right: 20px;
  }

  .tournamentName {
    margin-top: 0;
    font-size: 1.3rem;
  }

  .game,
  .region,
  .startDate {
    margin: 5px 0;
    color: #555;
  }

  .joinButton {
    background-color: #4caf50;
    color: white;
    padding: 12px 25px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    text-align: center;
    transition: background-color 0.3s;
    width: 120px;
  }

  .joinButton:hover {
    background-color: #0056b3;
  }

  .error {
    color: #d9534f;
    font-size: 1.2rem;
  }

  .loading {
    text-align: center;
    font-size: 1.5rem;
    color: #007bff;
  }

  @media (max-width: 600px){
    .joinButton{
      width: 80px;
      padding: 8px 15px;
      font-size: 0.8rem;
    }
  }
`;
