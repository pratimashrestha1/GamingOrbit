import React, { useState } from "react";
import { BiSolidLike } from "react-icons/bi";
import styled from "styled-components";
import { BiSolidDislike } from "react-icons/bi";

function LikeDislike() {
  // Initialize the state using the useState hook
  const [like, setLike] = useState(23);
  const [dislike, setDislike] = useState(3);
  const [likeActive, setLikeActive] = useState(false);
  const [dislikeActive, setDislikeActive] = useState(false);

  // Toggle the dislike state
  const toggleDislike = () => {
    setDislikeActive(!dislikeActive);
    setDislike(dislikeActive ? dislike - 1 : dislike + 1);
  };

  // Toggle the like state
  const toggleLike = () => {
    setLikeActive(!likeActive);
    setLike(likeActive ? like - 1 : like + 1);
  };

  // Handle the like button click
  const handleLike = () => {
    if (dislikeActive) {
      toggleDislike();  // If dislike is active, remove the dislike first
    }
    toggleLike(); // Then toggle the like
  };

  // Handle the dislike button click
  const handleDislike = () => {
    if (likeActive) {
      toggleLike();  // If like is active, remove the like first
    }
    toggleDislike(); // Then toggle the dislike
  };

  return (
    <Div>
      <button
        onClick={handleLike}
        className={likeActive ? "active" : ""}
      >
        <BiSolidLike className="icons"/>
        {like}
      </button>
      <button
        onClick={handleDislike}
        className={dislikeActive ? "active" : ""}
      >
        <BiSolidDislike className="icons"/>
        {dislike}
      </button>
    </Div>
  );
}

export default LikeDislike;

const Div=styled.div`
display: flex;
gap: 2em;

button{
    padding: 10px;
    font-size: 1.5em;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 5px;
    .icons{
        color: green;
    }
}
`
