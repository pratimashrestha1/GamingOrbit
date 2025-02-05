import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const Edit = () => {
  const navigate = useNavigate();
  const { tournamentId } = useParams(); // Get the tournamentId from the URL

  const [tournament, setTournament] = useState({
    tournamentName: "",
    tournamentUrl: "",
    startDate: "",
    game: "",
    region: "",
    status: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState([]); // To store the list of countries

  useEffect(() => {
    if (!tournamentId) {
      setError("Tournament ID is missing.");
      setLoading(false);
      return;
    }

    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/tour/view/${tournamentId}`) // Correct API call
      .then((response) => {
        setTournament(response.data.tournament); // Assuming data is under 'tournament' key
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching tournament details");
        setLoading(false);
      });

    // Fetch countries for the region dropdown
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const countryNames = data.map((country) => country.name.common);
        const sortedCountries = [
          "Nepal",
          ...countryNames.filter((name) => name !== "Nepal").sort(),
        ];
        setCountries(sortedCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, [tournamentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTournament((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `${process.env.REACT_APP_API_BASE_URL}/tour/update/${tournamentId}`,
        tournament
      )
      .then(() => {
        navigate("/lastTour", {
          state: {
            tourData: tournament,
          },
        });
      })
      .catch(() => {
        setError("Error updating tournament");
      });
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <h2>Edit Tournament</h2>
        <label>
          Tournament Name:
          <input
            type="text"
            name="tournamentName"
            value={tournament.tournamentName}
            onChange={handleChange}
            placeholder="Enter tournament name"
            required
          />
        </label>

        <label>
          Tournament URL:
          <input
            type="text"
            name="tournamentUrl"
            value={tournament.tournamentUrl}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Start Date:
          <input
            type="datetime-local"
            name="startDate"
            value={new Date(tournament.startDate).toISOString().slice(0, 16)}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Game:
          <select
            name="game"
            value={tournament.game}
            onChange={handleChange}
            required
          >
            <option value="PUBG">PUBG</option>
            <option value="FREEFIRE">Freefire</option>
            <option value="FORTNITE">Fortnite</option>
            <option value="COD">COD</option>
            <option value="CLASH ROYALE">Clash Royale</option>
            <option value="COUNTER-STRIKE 2">Counter-Strike 2</option>
            <option value="CYBERPUNK 2077">Cyberpunk 2077</option>
            <option value="GTA SAN ANDRES">GTA San Andres</option>
            <option value="POKEMON GO">Pokemon Go</option>
            <option value="COC">COC</option>
          </select>
        </label>

        <label>
          Region:
          <select
            name="region"
            value={tournament.region}
            onChange={handleChange}
            required
          >
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </label>

        <label>
          Status:
          <select
            name="status"
            value={tournament.status}
            onChange={handleChange}
          >
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
        </label>

        <button type="submit">Update Tournament</button>
      </form>
    </Container>
  );
};

export default Edit;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: url("/images/bluemoroon3.jpg") no-repeat center center/cover;

  form {
    padding: 40px;
    border-radius: 10px;
    background-color: rgba(2, 20, 45, 0.9);
    box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.4);
    width: 100%;
    max-width: 500px;
    color: #ffffff;
    display: flex;
    flex-direction: column;
    gap: 20px;

    h2 {
      text-align: center;
      color: #ff9c00;
      margin-bottom: 20px;
    }

    label {
      font-size: 16px;
      font-weight: bold;
    }

    input,
    select {
      width: 100%;
      padding: 12px;
      border: none;
      border-radius: 6px;
      margin-top: 5px;
      font-size: 16px;
      color: #ffffff;
      background-color: #01253a;
    }

    button {
      padding: 14px;
      border-radius: 8px;
      border: none;
      background-color: #007bff;
      color: white;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
      transition: 0.3s ease;
    }

    button:hover {
      background-color: #0056b3;
    }

    button:disabled {
      background-color: #4a4a4a;
      cursor: not-allowed;
    }
  }

   /* ✅ Responsive styles for smaller screens */
   @media (max-width: 600px) {
    width: 90%; /* Make form take up more space */
    padding: 20px; /* Reduce padding */
    max-width: 100%; /* Ensure it does not get cut */
    
    input,
    select {
      font-size: 14px; /* Reduce font size */
      padding: 10px; /* Adjust padding */
      box-sizing: border-box;
    }

    button {
      font-size: 16px; /* Adjust button size */
      padding: 12px;
    }
  }
`;
