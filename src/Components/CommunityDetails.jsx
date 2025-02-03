import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

function CommunityDetails() {
  const { communityId } = useParams();
  const [community, setCommunity] = useState(null);

  useEffect(() => {
    const fetchCommunityDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/postData/CommunityView/${communityId}`
        );
        const data = await response.json();
        setCommunity(data);
      } catch (error) {
        console.error("Error fetching community details:", error);
      }
    };

    if (!community && communityId) {
      fetchCommunityDetails();
    }
  }, [communityId, community]);

  if (!community) return <p>Loading...</p>;

  return (
    <Div>
      <div className="main">
        <img
          src={`${process.env.REACT_APP_API_BASE_URL}/${community.data.photo}`}
          alt={community.data.cn}
        />
        <div className="right">
          <h1>{community.data.cn}</h1>
          <p>{community.data.description}</p>
          <p>Location: {community.data.location}</p>
          <p>Game Precedence: {community.data.gameList}</p>
          <p>Privacy: {community.data.privacy}</p>
        </div>
      </div>
    </Div>
  );
}

export default CommunityDetails;

const Div = styled.div`
  .main {
    margin-top: 50px;
    width: 100vw;
    height: 70vh;
    display: flex;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border: 3px solid #fff;
      border-radius: 20px;
      outline: 2px solid black;
    }
  }

  .main::before {
    content: "";
    background: linear-gradient(to right, transparent, #330000);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .right {
    position: relative;
    z-index: 2;
    padding: 20px;
    color: white;
  }

  //***************************************************************  media query start
  @media (max-width: 600px) {
    .main {
      flex-direction: column;
    }

    .main::before {
      content: "";
      background: linear-gradient(to bottom, transparent, #330000);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
`;
