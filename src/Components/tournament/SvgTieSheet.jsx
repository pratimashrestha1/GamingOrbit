import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import domtoimage from "dom-to-image";

function InputAndSvg(props) {
    const [count, setCount] = useState(0);
    const [participants, setParticipants] = useState([]);
    const [winners, setWinners] = useState({});
    const containerRef = useRef(null);

    const isPowerOfTwo = (num) => (num & (num - 1)) === 0 && num > 0;

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
                    setCount(data.participants.length);
                }
            } catch (error) {
                console.error("Error fetching participants:", error);
            }
        };

        fetchParticipants();
    }, [props.data]);

    const handleWinnerSelection = (tier, index, name) => {
        setWinners((prev) => {
            const updatedWinners = { ...prev };
            if (!updatedWinners[tier]) updatedWinners[tier] = [];
            updatedWinners[tier][index] = name;
            return updatedWinners;
        });
    };

    const renderTiers = (currentCount, tier = 1, i = 1) => {
        if (currentCount < 1) return null;
        const nextCount = Math.floor(currentCount / 2);
        const nextTier = tier + 1;
        const nextI = i * 2;

        return (
            <div className="tier" key={tier}>
                <div className="input-list">
                    {[...Array(currentCount)].map((_, index) => (
                        <input
                            key={`input-${tier}-${index}`}
                            value={
                                tier === 1 && participants[index]
                                    ? participants[index].username
                                    : winners[tier]?.[index] || ""
                            }
                            readOnly
                            onClick={() =>
                                handleWinnerSelection(
                                    nextTier,
                                    Math.floor(index / 2),
                                    tier === 1 && participants[index]
                                        ? participants[index].username
                                        : winners[tier]?.[index]
                                )
                            }
                            className={
                                winners[nextTier]?.includes(
                                    tier === 1 && participants[index]
                                        ? participants[index].username
                                        : winners[tier]?.[index]
                                )
                                    ? "winner"
                                    : ""
                            }
                        />
                    ))}
                </div>

                <div className="svg-column">
                    {[...Array(nextCount)].map((_, index) => {
                        const svgHeight = 2 * (25 * i);
                        return (
                            <svg key={`svg-${tier}-${index}`} style={{ height: `${svgHeight}px` }} width="50">
                                <path
                                    d={`m10 10 h25 v${25 * i} h25 h-25 v${25 * i} h-25`}
                                    strokeWidth="2"
                                    fill="none"
                                />
                            </svg>
                        );
                    })}
                </div>

                {renderTiers(nextCount, nextTier, nextI)}
            </div>
        );
    };

    const downloadAsJpg = () => {
        if (containerRef.current) {
            domtoimage.toJpeg(containerRef.current, { quality: 1, bgcolor: "#ffffff",})
                .then((dataUrl) => {
                    const link = document.createElement("a");
                    link.href = dataUrl;
                    link.download = "tournament_bracket.jpg";
                    link.click();
                })
                .catch((error) => {
                    console.error("Error capturing image:", error);
                });
        }
    };


    return (
        <Container>
            <h1>Single Elimination System</h1>
            {isPowerOfTwo(participants.length) ? (
                <div ref={containerRef} style={{ padding: "50px 0 50px 50px"}}>
                    {renderTiers(count)}
                </div>
            ) : (
                <div className="error-message">
                    <h3>The number of participants must be a power of 2 (e.g., 2, 4, 8, 16, etc.)</h3>
                </div>
            )}
            <button onClick={downloadAsJpg} className="download-btn">Download as JPG</button>
        </Container>
    );
}

export default InputAndSvg;

const Container = styled.div`
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
            overflow: visible;

            &:hover {
                stroke: #ff3366;
            }
        }
    }

    .winner {
        background: #12e34a;
        border-color: #ff3366;
    }

    .tier {
        display: flex;
    }

    .input-list input {
        padding: 10px;
        border: 2px solid #330066;
        border-radius: 5px;
        color: black;
        font-family: 'Orbitron', sans-serif;
        width: 100%;
        max-width: 150px;
        transition: 0.3s ease;
        
        &:focus {
            scale: 1.1;
        }
    }

    .download-btn {
        margin-top: 20px;
        padding: 10px 15px;
        font-size: 16px;
        background-color: #330066;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: 0.3s ease;
        
        &:hover {
            background-color: #ff3366;
        }
    }
`;
