import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

function Intro_theme(props) {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        // Trigger the animation on page load
        setAnimate(true);
    }, []);

    return (
        <Wrapper animate={animate}>
            {/* Sticky background */}
            <div className="background"></div>

            {/* Scrolling contents */}
            <div className="contents">
                <h1>{props.title}</h1>
                <div className="contents-items">
                    <img src="./images/banner_img.png" alt="main pic" />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi officia accusamus, sed impedit unde aperiam fugiat modi nesciunt! Tempora aut repudiandae nihil unde molestiae recusandae sed error veniam dolores voluptatibus.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi officia accusamus, sed impedit unde aperiam fugiat modi nesciunt! Tempora aut repudiandae nihil unde molestiae recusandae sed error veniam dolores voluptatibus.</p>
                </div>
            </div>

            <div className="dummy">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi officia accusamus, sed impedit unde aperiam fugiat modi nesciunt! Tempora aut repudiandae nihil unde molestiae recusandae sed error veniam dolores voluptatibus.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi officia accusamus, sed impedit unde aperiam fugiat modi nesciunt! Tempora aut repudiandae nihil unde molestiae recusandae sed error veniam dolores voluptatibus.</p>
            </div>
            <div className="dummy">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi officia accusamus, sed impedit unde aperiam fugiat modi nesciunt! Tempora aut repudiandae nihil unde molestiae recusandae sed error veniam dolores voluptatibus.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi officia accusamus, sed impedit unde aperiam fugiat modi nesciunt! Tempora aut repudiandae nihil unde molestiae recusandae sed error veniam dolores voluptatibus.</p>
            </div>
            <div className="dummy">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi officia accusamus, sed impedit unde aperiam fugiat modi nesciunt! Tempora aut repudiandae nihil unde molestiae recusandae sed error veniam dolores voluptatibus.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi officia accusamus, sed impedit unde aperiam fugiat modi nesciunt! Tempora aut repudiandae nihil unde molestiae recusandae sed error veniam dolores voluptatibus.</p>
            </div>
            <div className="dummy">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi officia accusamus, sed impedit unde aperiam fugiat modi nesciunt! Tempora aut repudiandae nihil unde molestiae recusandae sed error veniam dolores voluptatibus.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi officia accusamus, sed impedit unde aperiam fugiat modi nesciunt! Tempora aut repudiandae nihil unde molestiae recusandae sed error veniam dolores voluptatibus.</p>
            </div>
            <div className="dummy">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi officia accusamus, sed impedit unde aperiam fugiat modi nesciunt! Tempora aut repudiandae nihil unde molestiae recusandae sed error veniam dolores voluptatibus.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi officia accusamus, sed impedit unde aperiam fugiat modi nesciunt! Tempora aut repudiandae nihil unde molestiae recusandae sed error veniam dolores voluptatibus.</p>
            </div>
        </Wrapper>
    );
}

export default Intro_theme;

const Wrapper = styled.div`
    font-family: ${({ theme }) => theme.fontFamily.games};
    margin-top: 50px;

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

        h1 {
            color: #e7f200;
            font-size: 5em;
            width: fit-content;
            font-family: ${({ theme }) => theme.fontFamily.dot};
            opacity: 0;
            transform: translateX(-100%);
            animation: ${({ animate }) => (animate ? 'flyIn 1s forwards' : 'none')};
        }

        .contents-items {
            width: 40%;
            text-align: center;
            opacity: 0;
            transform: translateX(-100%);
            animation: ${({ animate }) => (animate ? 'flyIn 1s forwards' : 'none')};
            animation-delay: 0.3s;

            img {
                width: 40%;
            }

            p {
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

    .dummy {
        position: relative;
        z-index: 1;
        border: 2px solid green;
        background-color: white;
        padding: 20px;
    }
`;
