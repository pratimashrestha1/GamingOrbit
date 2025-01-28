import React, { useEffect, useState } from "react";
import styled from "styled-components";

function InputAndSvg(props) {
    const [count, setCount] = useState(0);
    const [participants, setParticipants] = useState([]);

    // Fetch participants from API
    useEffect(() => {
        const fetchParticipants = async () => {
            try {
                const response = await fetch(
                    `http://localhost:4000/tour/tournament/${props.data}/fetchPaticipants`
                );
                const data = await response.json();
                console.log("API Response:", data);
                if (data.message === "Participants fetched successfully") {
                    setParticipants(data.participants);
                    setCount(data.participants.length); // Set count based on participants
                }
            } catch (error) {
                console.error("Error fetching participants:", error);
            }
        };

        fetchParticipants();
    }, [props.data]);

    const renderTiers = (currentCount, i = 1) => {
        if (currentCount < 1) return null;

        const nextCount = Math.floor(currentCount / 2); // Halve the count for the next tier
        const nextI = i * 2; // Double the value of i for the next tier

        return (
            <div className="tier" key={currentCount}>
                {/* Input Column */}
                <div className="input-list">
                    {[...Array(currentCount)].map((_, index) => (
                        <input
                            // key={`input-${currentCount}-${index}`}
                            value={
                                participants[index]
                                    ? participants[index].username
                                    : `Player ${index + 1}`
                            }
                            // readOnly // Inputs are pre-filled and not editable
                        />
                    ))}
                </div>

                {/* SVG Column */}
                <div className="svg-column">
                    {[...Array(nextCount)].map((_, index) => {
                        const svgHeight = 2 * (25 * i); // Dynamic height based on v
                        return (
                            <svg
                                key={`svg-${currentCount}-${index}`}
                                style={{ height: `${svgHeight}px` }}
                                width="50"
                                overflow="visible"
                            >
                                <path
                                    d={`m10 10 h25 v${25 * i} h25 h-25 v${25 * i} h-25`}
                                    strokeWidth="2"
                                    fill="none"
                                />
                            </svg>
                        );
                    })}
                </div>

                {/* Recursive call for the next tier */}
                {renderTiers(nextCount, nextI)}
            </div>
        );
    };

    return (
        <Container>
            <div>{renderTiers(count)}</div>
        </Container>
    );
}

export default InputAndSvg;

const Container = styled.div`
    // background: linear-gradient(to right, #000033, #330033);
    width: 100%;
    height: 100vh;
    padding: 20px;

    .input-list {
        display: flex;
        gap: 10px;
        flex-direction: column;
        justify-content: space-around;
    }
    .svg-column {
        display: flex;
        gap: 10px;
        flex-direction: column;
        justify-content: space-around;

        svg {
        stroke: #330066;
        fill: none;
        margin-bottom: 20px;
        transition: stroke 0.3s ease;

        &:hover{
        stroke: #ff3366;
            }
        }
    }

    input[type="number"] {
        margin-bottom: 20px;
        padding: 5px;
        border: 2px solid black;
        border-radius: 5px;
        background: linear-gradient(to right, #330066, #660033);
        color: white;
        font-family: 'Orbitron', sans-serif;
    }

    .tier {
        display: flex;
        // gap: 10px;
    }

    .input-list input {
        // box-sizing: border-box;
        padding: 10px;
        border: 2px solid #330066;
        border-radius: 5px;
        // background: linear-gradient(to right, #330066, #660033), repeat;
        color: black;
        // font-weight: bold;
        // font-size: 23px;
        font-family: 'Orbitron', sans-serif;
        width: 100%;
        max-width: 150px;
    }
`;