import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

function IntroTheme({ title, image, width, description }) {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        // Trigger the animation on page load
        setAnimate(true);
    }, []);

    return (
        <Wrapper $animate={animate}>
            {/* Sticky background */}
            <div className="background"></div>

            {/* Scrolling contents */}
            <div className="contents">
                <h1>{title}</h1>
                <div className="contents-items">
                    <img src={image} width={width} alt="main pic" />
                    <p>{description}</p>
                </div>
            </div>
        </Wrapper>
    );
}

export default IntroTheme;

const Wrapper = styled.div.attrs((props) => ({
    // Remove custom props like $animate from being passed to DOM
    animate: undefined,
}))`
    font-family: ${({ theme }) => theme.fontFamily.games};
    margin-top: 120px;

    .background {
        position: sticky;
        top: 0;
        background-image: url('images/about_bg.jpg');
        background-size: cover;
        width: 100vw;
        height: 100vh;
        z-index: -1;
    }

    .contents {
        position: relative;
        z-index: 1;
        margin-top: -100vh;
        padding: 20px;
        height: 400px;
        width: 100vw;
        display: flex;
        justify-content: space-around;
        margin-bottom: 50px;

        h1 {
            color: #e7f200;
            font-size: 5em;
            width: fit-content;
            font-family: ${({ theme }) => theme.fontFamily.dot};
            transform: translateX(-100%);
            animation: ${({ $animate }) => ($animate ? 'flyIn 1s forwards' : 'none')};
        }

        .contents-items {
            width: 40%;
            text-align: center;
            opacity: 0;
            transform: translateX(-100%);
            animation: ${({ $animate }) => ($animate ? 'flyIn 1s forwards' : 'none')};
            animation-delay: 0.3s;
            margin: auto 0;

            p {
                margin: 0;
                text-align: justify;
                color: #fff;
            }
        }
    }

    @keyframes flyIn {
        0% {
            opacity: 0;
            transform: translateY(40%);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }


    //media query ******************************************************** 

    @media(max-width: 600px){
        width: 100%;

        .contents{
            width: 100%;
            overflow: hidden;
            
            h1{
                display: none;
            }

            .contents-items{
                width: 100%;
                img{
                    width: 40%;
                }
                p{
                    margin-right: 2em;
                }
            }
        }
    }
`;
