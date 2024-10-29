import React, { useState } from 'react';
import styled from 'styled-components';
import { useGlobalComponent } from '../GlobalComponentContext';
import axios from 'axios';

function Modal() {
    const { isComponentVisible } = useGlobalComponent();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Axios POST request to new API endpoint
        axios.post('http://localhost:4000/postData/sent', formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            if (response.status === 201) {
                alert('Form submitted successfully');
            } else {
                alert('Error submitting form');
            }
        })
        .catch((error) => {
            alert('Error submitting form');
            console.error("Error:", error);
        });
    };

    return (
        <>
            {isComponentVisible && (
                <Div>
                    <form onSubmit={handleSubmit}>
                        <img src="./images/logo head.png" alt="Logo" />
                        <input
                            type="text"
                            name="username"
                            placeholder="Enter your username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
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
    position: absolute;
    transform: translate(-50%,-50%);
    top: 50%;
    left: 50%;
    width: 500px;
    height: 450px;
    background-color: rgba(0,0,0,0.5);
    border: 2px solid;
    border-color: ${({ theme }) => theme.colors.logoBlue};
    border-radius: 15px;
    display:flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    z-index: 1000;

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
