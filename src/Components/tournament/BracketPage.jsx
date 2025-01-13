import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BracketCreation = () => {
  const [brackets, setBrackets] = useState([
    {
      id: Date.now(), // Unique ID for the bracket
      bracketType: 'Single Elimination', // Default bracket type
      numTeams: 2, // Default number of teams
      membersPerTeam: 1, // Default members per team
    },
  ]);

  const [bracketImage, setBracketImage] = useState('/images/tiesheets.png'); // Default image for brackets
  const navigate = useNavigate();

  // Add a new bracket with default values
  const addNewBracket = () =>
    setBrackets((prev) => [
      ...prev,
      { id: Date.now(), bracketType: 'Single Elimination', numTeams: 2, membersPerTeam: 1 },
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
                <option value="Double Elimination">Double Elimination</option>
              </select>
            </div>

            {/* Input for the number of teams */}
            <div style={{ marginBottom: '10px' }}>
              <label>Number of Teams: </label>
              <input
                type="number"
                value={bracket.numTeams}
                onChange={(e) => updateBracket(bracket.id, 'numTeams', e.target.value)}
                min="2"
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid white',
                  backgroundColor: 'transparent',
                  color: 'white',
                }}
              />
            </div>

            {/* Input for members per team */}
            <div style={{ marginBottom: '20px' }}>
              <label>Members Per Team: </label>
              <input
                type="number"
                value={bracket.membersPerTeam}
                onChange={(e) => updateBracket(bracket.id, 'membersPerTeam', e.target.value)}
                min="1"
                style={{
                  width: '100%',
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
          onClick={() => navigate('/lastTour', { state: { brackets } })}
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
