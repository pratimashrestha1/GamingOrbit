import React, { useState, useEffect } from 'react';
import {  useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

function Edit() {
    const navigate= useNavigate();
    const { tournamentId } = useParams();  // Get the tournamentId from the URL

    const [tournament, setTournament] = useState({
        tournamentName: '',
        tournamentUrl: '',
        startDate: '',
        game: '',
        region: '',
        status: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!tournamentId) {
            setError('Tournament ID is missing.');
            setLoading(false);
            return;
        }

        // Fetch the tournament details when the component mounts
        axios
            .get(`http://localhost:4000/tour/view/${tournamentId}`)  // Correct API call
            .then((response) => {
                setTournament(response.data.tournament); // Assuming the data is under 'tournament' key
                setLoading(false);
            })
            .catch((error) => {
                setError('Error fetching tournament details');
                setLoading(false);
            });
    }, [tournamentId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTournament((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:4000/tour/update/${tournamentId}`, tournament)
            .then((response) => {
                navigate('/lastTour');
            })
            .catch((error) => {
                setError('Error updating tournament');
            });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <Div>
            <div className="form-container">
                <h1>Edit Tournament</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Tournament Name:</label>
                        <input
                            type="text"
                            name="tournamentName"
                            value={tournament.tournamentName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Tournament URL:</label>
                        <input
                            type="text"
                            name="tournamentUrl"
                            value={tournament.tournamentUrl}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Start Date:</label>
                        <input
                            type="date"
                            name="startDate"
                            value={new Date(tournament.startDate).toISOString().split('T')[0]} // Formatting the date
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Game:</label>
                        <select
                            name="game"
                            value={tournament.game}
                            onChange={handleChange}
                            required
                        >
                            <option value="PUBG">PUBG</option>
                            <option value="FREEFIRE">FREEFIRE</option>
                            <option value="FORTNITE">FORTNITE</option>
                            <option value="COD">COD</option>
                            <option value="CLASH ROYALE">CLASH ROYALE</option>
                            <option value="COUNTER-STRIKE 2">COUNTER-STRIKE 2</option>
                            <option value="CYBERPUNK 2077">CYBERPUNK 2077</option>
                            <option value="GTA SAN ANDRES">GTA SAN ANDRES</option>
                            <option value="POKEMON GO">POKEMON GO</option>
                            <option value="COC">COC</option>
                        </select>
                    </div>
                    <div>
                        <label>Region:</label>
                        <input
                            type="text"
                            name="region"
                            value={tournament.region}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Status:</label>
                        <select
                            name="status"
                            value={tournament.status}
                            onChange={handleChange}
                            required
                        >
                            <option value="Public">Public</option>
                            <option value="Private">Private</option>
                        </select>
                    </div>
                    <button type="submit">Update Tournament</button>
                </form>
            </div>
        </Div>
    );
}

export default Edit;


const Div = styled.div`
/* EditForm.css */
.form-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  font-family: 'Arial', sans-serif;
  color: #333;
}

form {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

label {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

input, select {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  width: 100%;
  box-sizing: border-box;
}

input[type="date"] {
  padding: 10px;
}

button {
  padding: 12px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
}

button:hover {
  background-color: #45a049;
}

.error {
  color: red;
  text-align: center;
  font-size: 16px;
}

.loading {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
}
`