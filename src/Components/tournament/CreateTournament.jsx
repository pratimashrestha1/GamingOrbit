import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const CreateTournament = () => {
  const navigate = useNavigate();

  // Helper to get the current date-time in 'YYYY-MM-DDTHH:mm' format
  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString().slice(0, 16); // Format for datetime-local input
  };

  const [formData, setFormData] = useState({
    tournamentName: "",
    tournamentUrl: "",
    startDate: getCurrentDateTime(), // Default to current date and time
    game: "",
    region: "",
    status: "Public",
  });

  const [countries, setCountries] = useState([]); // State to hold country names
  const [nameError, setNameError] = useState(""); // State for name error
  const [urlError, setUrlError] = useState(""); // State for URL error

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const countryNames = data.map((country) => country.name.common);

        // Ensure "Nepal" is the first in the list
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
  }, []);

  const handleChange = async (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };

      if (name === "tournamentName") {
        const formattedUrl = value
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "");
        updatedData.tournamentUrl = `communitygaming.io/tournament/${formattedUrl}`;
      }
      return updatedData;
    });

    if (name === "tournamentName" && value.trim() !== "") {
      try {
        const response = await axios.post("http://localhost:4000/tour/check-name", {
          tournamentName: value,
        });

        if (!response.data.success) {
          setNameError("Tournament name is already taken.");
        } else {
          setNameError("");
        }
      } catch (error) {
        console.error("Error validating name:", error.response?.data || error.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { startDate, ...otherData } = formData;
      const payload = {
        ...otherData,
        startDate: new Date(startDate).toISOString(),
      };

      const response = await axios.post("http://localhost:4000/tour/create", payload);
      console.log("Tournament created successfully:", response.data);
      navigate("/brackets");
    } catch (error) {
      console.error("Error creating tournament:", error.response?.data || error.message);
      const errorMessage = error.response?.data?.message || "Something went wrong";
      if (errorMessage.includes("name")) {
        setNameError(errorMessage);
      } else if (errorMessage.includes("URL")) {
        setUrlError(errorMessage);
      } else {
        alert(`Error: ${errorMessage}`);
      }
    }
  };

  return (
    <Div>
      <form onSubmit={handleSubmit}>
        <label>
          Tournament Name:
          <input
            type="text"
            name="tournamentName"
            value={formData.tournamentName}
            onChange={handleChange}
            required
          />
        </label>
        {nameError && <ErrorMessage>{nameError}</ErrorMessage>}

        <label>
          Tournament URL:
          <input
            type="text"
            name="tournamentUrl"
            value={formData.tournamentUrl}
            onChange={handleChange}
            required
            readOnly
          />
        </label>
        {urlError && <ErrorMessage>{urlError}</ErrorMessage>}

        <label>
          Start Date:
          <input
            type="datetime-local"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Game:
          <select name="game" value={formData.game} onChange={handleChange} required>
            <option value="" disabled>Select Game</option>
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
          <select name="region" value={formData.region} onChange={handleChange} required>
            <option value="" disabled>Select Region</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </label>
        <label>
          Status:
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
        </label>
        <button type="submit" disabled={!!nameError || !!urlError}>
          Create Tournament
        </button>
      </form>
    </Div>
  );
};

export default CreateTournament;

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #001f3d; /* Dark blue background */

  form {
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  h2 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 24px;
    color: white;
  }

  label {
    font-size: 16px;
    font-weight: bold;
    color: white;
  }

  input, select {
    width: 100%;
    padding: 10px;
    font-size: 14px;
    border: 1px solid white; /* White border for input and select fields */
    border-radius: 4px;
    margin-top: 5px;
    background-color: transparent;
    color: white;
  }

  button {
    padding: 12px;
    background-color: #800000; /* Maroon color for the button */
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #6a0000; /* Darker maroon on hover */
  }

  button:disabled {
    background-color: moroon;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: -10px;
  margin-bottom: 0;
`;


