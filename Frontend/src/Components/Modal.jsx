import React from 'react'
import styled from 'styled-components'
import { useGlobalComponent } from '../GlobalComponentContext';

function Modal() {
    const { isComponentVisible } = useGlobalComponent();

    return (
        <wrapper>
            {isComponentVisible && (
                <Div>
                    <img src="./images/logo head.png" alt="" />
                    <input type="text" placeholder='enter your username' />
                    <input type="password" placeholder='enter your password' />
                    <input type="submit" value="login" />
                    <div>
                        <p>forget password ?</p>
                        <p>create account ?</p>
                    </div>
                </Div>)}
        </wrapper>
    )
}

const Div = styled.div`
    position: absolute;
    transform: translate(-50%,-50%);
    top: 50%;
    left: 50%;
    width: 550px;
    height: 500px;
    background-color: rgba(0,0,0,0.5);
    border: 2px solid;
    border-color: ${({ theme }) => theme.colors.logoBlue};
    border-radius: 15px;
    display:flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    font-size: 18px;

    img{
    max-width: 80px;
    }

    input{
        font-family: ${({ theme }) => theme.fontFamily.games};
        width: 70%;
        height: 70px;
        margin: 20px;
        text-align: center;
        // font-size: 1.5em;

        &::placeholder{
        font-size: 1.5em;
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
        font-size: 28px;
        font-weight: bold;
        border: none;
        border-bottom: 5px solid #FC0D50;
        transition: 0.5s ease;

        &:hover{
        cursor: pointer;
        background-color:${({ theme }) => theme.colors.logoRed};
        color: ${({ theme }) => theme.colors.logoBlue};
        border-bottom: 5px solid #1092EA;                
        }
    }
    `
export default Modal