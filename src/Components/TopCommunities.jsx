import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function CommunityList() {
  const [communities, setCommunities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from API
    const fetchCommunities = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/postData/topCommunities`
        );
        const data = await response.json();
        setCommunities(data);
      } catch (error) {
        console.error("Error fetching communities:", error);
      }
    };

    fetchCommunities();
  }, []);

  const handleClick = (communityId) => {
    navigate(`/community/${communityId}`);
  };

  return (
    <Div className="community-list">
      <h1>Wanna join a community?</h1>
      <p>Here are some popular communities</p>
      <div className="community-grid">
        {communities.map((community) => (
          <div className="community-1" key={community._id}>
            <img
              src={`${process.env.REACT_APP_API_BASE_URL}/${community.photo}`}
              alt={community.cn}
            />
            <div className="details">
              <h2>{community.cn}</h2>
              <p>{community.description}</p>
              <div className="button-container">
                <button onClick={() => handleClick(community._id)}>
                  Explore
                </button>
                <button>Join</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Div>
  );
}

export default CommunityList;

const Div = styled.div`
  background: white;
  padding: 0 50px;

  h1 {
    text-align: center; /* Center the heading */
    margin: 1em 0;
  }

  p {
    text-align: center; /* Center the subheading */
    margin-bottom: 2em;
  }

  .community-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* Adjust as needed */
    gap: 2em;
  }

  .community-1 {
    box-sizing: border-box;
    position: relative;
    display: flex;
    border-radius: 10px;
    overflow: hidden;
    background-color: #2b2d42;
    height: auto;

    img {
      width: 40%;
      border-radius: 10px 0 0 10px;
      transition: all 0.4s ease-in;
    }

    .details {
      flex-grow: 1; /* Allow details to grow and fill space */
      display: flex;
      flex-direction: column; /* Stack children vertically */
      justify-content: space-between; /* Space children evenly */
      padding: 1em; /* Add padding for spacing */
      color: #fff;
      background-color: #2b2d42;
      transition: all 0.5s ease-in;

      h2 {
        margin: 0;
      }

      p {
        text-align: left;
        margin: 0;

        &::first-letter {
          font-size: 2em;
          color: #ff5c5c;
        }
      }

      .button-container {
        margin-top: auto; /* Push buttons to the bottom */
        display: flex;
        gap: 10px; /* Space between buttons */
      }
    }

    &:hover .details {
      box-shadow: inset 600px 0 50px #8d99ae;
    }

    &:hover img {
      transform: scale(1.05);
      box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.5);
    }

    button {
      text-decoration: none;
      background-color: white;
      border: none;
      color: #000;
      padding: 10px 20px;
      font-weight: bold;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s, box-shadow 0.3s;

      &:hover {
        background-color: #45a049; /* Darker green on hover */
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
      }

      &:first-of-type {
        background-color: white; /* Blue background for the first button */
        color: #000;
      }

      &:first-of-type:hover {
        background-color: #1976d2; /* Darker blue on hover */
      }
    }
  }

  //***************************************************************  media query start
  @media (max-width: 600px) {
    .community-grid {
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      gap: 1em;
      width: 100vw;
      padding: 0 10px;
    }

    .community-1 {
      width: 100%;
      margin-left: -3em;
      height: 150px;

      img {
        width: 100px;
        height: 150px;
      }
      .details {
        h2 {
          max-width: 80%;
          font-size: 18px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        p {
          display: -webkit-box;
          -webkit-line-clamp: 3; /* Adjust the number of lines */
          -webkit-box-orient: vertical;
          overflow: hidden;
          word-wrap: break-word;
          text-overflow: ellipsis;

          &::first-letter {
            font-size: 1em;
          }
        }

        .button-container {
          button {
            padding: 5px;
            font-weight: normal;
          }
        }
      }
    }
  }
`;
