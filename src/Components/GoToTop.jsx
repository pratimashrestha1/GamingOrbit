import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const GoToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down by a certain amount
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to the top when the button is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth scroll
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <Div>
      {isVisible && (
          <img src="./images/up-arrow.gif" onClick={scrollToTop} alt=""/>
      )}
    </Div>
  );
};

export default GoToTop;

const Div=styled.div`
img{
    position: fixed;
    bottom: 30px;
    right: 30px;
    border-radius: 50%;
    border: none;
    height: 50px;
    width: 50px;
    z-index: 1;
    box-shadow: 0 5px 5px #999;
}

`