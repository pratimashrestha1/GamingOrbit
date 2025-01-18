import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BracketCreation = () => {
  const [players, setPlayers] = useState(1); // Default value set to 1
  const [tourId,setTourId]= useState(null);
  const [brackets, setBrackets] = useState([
    {
      id: Date.now(), // Unique ID for the bracket
      bracketType: 'Single Elimination', // Default bracket type
      membersPerTeam: 1, // Default members per team
    },
  ]);
  console.log(players);

  const [bracketImage, setBracketImage] = useState('/images/tiesheets.png'); // Default image for brackets
  const navigate = useNavigate();

  // Add a new bracket with default values
  const addNewBracket = () =>
    setBrackets((prev) => [
      ...prev,
      { id: Date.now(), bracketType: 'Single Elimination', membersPerTeam: 1 },
    ]);

  // Remove a bracket by its ID
  const removeBracket = (id) =>
    setBrackets((prev) => prev.filter((bracket) => bracket.id !== id));

  // Update a specific field of a bracket
  const updateBracket = (id, field, value) => {
    setBrackets((prev) =>
      prev.map((bracket) => (bracket.id === id ? { ...bracket, [field]: value } : bracket))
    );

    // Change the bracket image based on the bracket type
    if (field === 'bracketType') {
      setBracketImage(
        value === 'Single Elimination'
          ? '/images/tiesheet.png'
          : '/images/doubleElimination.png'
      );
    }
  };

  const handleNext = async () => {
    if (!tourId || !players) {
      alert("Please provide both tournament ID and maxPlayers.");
      return;
    }

    try {
      // const response = await axios.post("http://localhost:4000/tour/maxPlayers", {
      await axios.post("http://localhost:4000/tour/maxPlayers", {
        id: tourId,
        maxPlayers: players,
      });

      // alert("Max players updated successfully!");
      // console.log(response.data);
      navigate('/lastTour');
    } catch (error) {
      console.error("Error updating maxPlayers:", error);
      alert(
        error.response?.data?.message || "Failed to update maxPlayers. Try again!"
      );
    }
  }

  useEffect(() => {
    // Fetch the data from the API
    const fetchTourData = async () => {
      try {
        const response = await fetch("http://localhost:4000/tour/tour-data");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();

        // Store the `_id` value in the `tourId` variable
        setTourId(data._id);
      } catch (error) {
        console.error("Error fetching tour data:", error);
      }
    };

    fetchTourData();
  }, []); // Empty dependency array to run only once on component mount

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: '20px',
        backgroundImage: 'url(/images/bluemoroon3.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        color: 'white',
      }}
    >
      <div style={{ flex: '1', maxWidth: '50%', padding: '30px' }}>
        <h2 style={{ textAlign: 'center' }}>Bracket Overview</h2>

        {/* Render each bracket */}
        {brackets.map((bracket, index) => (
          <div
            key={bracket.id}
            style={{
              border: '2px solid maroon',
              marginBottom: '20px',
              padding: '20px',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              borderRadius: '8px',
            }}
          >
            {/* Dropdown to select bracket type */}
            <div style={{ marginBottom: '10px' }}>
              <label>Bracket Type: </label>
              <select
                value={bracket.bracketType}
                onChange={(e) => updateBracket(bracket.id, 'bracketType', e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid white',
                  backgroundColor: 'transparent',
                  color: 'white',
                }}
              >
                <option value="Single Elimination">Single Elimination</option>
              </select>
            </div>

            {/* Input for numbers of participants */}
            <div style={{ marginBottom: '20px' }}>
              <label>No of players in a team: </label>
              <input
                type="number"
                value={players} // Bind the input value to players state
                onChange={(e) => setPlayers(Number(e.target.value))} // Directly update the players state
                min="2"
                style={{
                  width: '96%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid white',
                  backgroundColor: 'transparent',
                  color: 'white',
                }}
              />

            </div>

            {/* Remove button for brackets */}
            {index > 0 && (
              <button
                onClick={() => removeBracket(bracket.id)}
                style={{
                  width: '100%',
                  padding: '10px',
                  backgroundColor: 'maroon',
                  color: 'white',
                  border: '1px solid white',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  marginTop: '10px',
                }}
              >
                Remove Bracket
              </button>
            )}
          </div>
        ))}

        {/* Add new bracket button */}
        <button
          onClick={addNewBracket}
          style={{
            width: '250px',
            padding: '10px',
            backgroundColor: 'white',
            color: 'blue',
            border: '1px solid white',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '20px',
          }}
        >
          Add Another Bracket
        </button>

        {/* Next button */}
        <button
          onClick={handleNext}
          disabled={brackets.length === 0} // Disable if no brackets
          style={{
            width: '250px',
            padding: '10px',
            backgroundColor: brackets.length === 0 ? 'gray' : 'green',
            color: 'white',
            border: '1px solid white',
            borderRadius: '5px',
            cursor: brackets.length === 0 ? 'not-allowed' : 'pointer',
            marginTop: '20px',
          }}
        >
          Next
        </button>
      </div>

      {/* Bracket image preview */}
      <div style={{ flex: '1', display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <img
          src={bracketImage}
          alt="Bracket Overview"
          style={{ maxWidth: '74%', height: 'auto', borderRadius: '10px', marginTop: '25px' }}
        />
      </div>
    </div>
  );
};

export default BracketCreation;
