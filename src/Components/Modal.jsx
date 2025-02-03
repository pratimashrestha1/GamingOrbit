import React, { useState } from 'react';
import styled from 'styled-components';
import { useGlobalComponent } from '../GlobalComponentContext';

function Modal() {
    const { isComponentVisible } = useGlobalComponent();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { toggleComponentVisibility} = useGlobalComponent();


    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/postData/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Store the username in localStorage
                localStorage.setItem('username', data.username);
                localStorage.setItem('profile', data.photo);
                localStorage.setItem('userId', data.userId);
                alert("login successful");
            } 
            else{
                alert('invalid username and password');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            {isComponentVisible && (
                <Div>
                    <form onSubmit={handleLogin}>            
                        <p className='close' onClick={toggleComponentVisibility}>X</p>
                        <img src="./images/logo_head.png" alt="Logo" />
                        <input
                            type="text"
                            name="username"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input type="submit" value="Login" />
                        <div>
                            <a href="./create_account.html"><p>Create Account</p></a>
                            <a href="./forget_password.html"><p>Forgot password?</p></a>
                        </div>
                    </form>
                </Div>
            )}
        </>
    );
}

export default Modal;


const Div = styled.div`
form{
    font-family: ${({ theme }) => theme.fontFamily.games};
    position: fixed;
    transform: translate(-50%,-50%);
    top: 50%;
    left: 50%;
    width: 500px;
    height: 450px;
    border: 2px solid;
    border-color: ${({ theme }) => theme.colors.logoBlue};
    border-radius: 15px;
    display:flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    z-index: 1000;
    background: rgba(70, 70, 70, 0.28);
    backdrop-filter: blur(6.7px);

    .close{
        color: red;
        position: absolute;
        top: 5px;
        right: 1em;
        /* border: 1px solid white; */
        /* border-radius: 50%; */
        padding: 0 3px;
        text-shadow: 2px 2px 5px rgba(200, 200, 200, 1);
        cursor: pointer;
        font-weight: bold;
    }

    img{
    max-width: 100px;
    }

    input{
        font-family: ${({ theme }) => theme.fontFamily.games};
        width: 60%;
        height: 55px;
        margin: 20px;
        text-align: center;
        font-weight: bold;

        &:focus{
        outline:none;
        border-bottom: 4px solid #FC0D50;
        }

        &::placeholder{
        font-size: 1.2em;
        opacity: 60%;
        }
    }

    div p{
        color: white;
        display: inline-block;
        margin: 10px;
        text-decoration: underline;

        &:hover{
            cursor: pointer;
        }
    }

    input[type='submit']{
        font-family: ${({ theme }) => theme.fontFamily.games};
        background-color:${({ theme }) => theme.colors.logoBlue};
        color: ${({ theme }) => theme.colors.logoRed};
        font-size: 22px;
        font-weight: bold;
        border: none;
        border-bottom: 5px solid #FC0D50;
        width: 150px;
        border-radius: 10px;
        transition: 0.5s ease;        

        &:hover{
        cursor: pointer;
        background-color:${({ theme }) => theme.colors.logoRed};
        color: ${({ theme }) => theme.colors.logoBlue};
        border-bottom: 5px solid #1092EA;                
        }

        &:focus{
        transform: scale(1.1);
        transition: transform 0.5s ease infinity;
        }
    }
}
`
