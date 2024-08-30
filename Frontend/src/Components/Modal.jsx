import React from 'react'
import styled from 'styled-components'
import { useGlobalComponent } from '../GlobalComponentContext';

function Modal() {
    const { isComponentVisible } = useGlobalComponent();

    return (
        <>
            {isComponentVisible && (
                <Div>
                    <img src="./images/logo head.png" alt="" />
                    <input type="text" placeholder='enter your username' />
                    <input type="password" placeholder='enter your password' />
                    <input type="submit" value="login" />
                    <div>
                        <a href="./forget_password.html"><p>forget password ?</p></a>
                        <a href="./create_account.html"><p>create account ?</p></a>
                    </div>
                </Div>)}
        </>
    )
}

const Div = styled.div`
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
    `
export default Modal