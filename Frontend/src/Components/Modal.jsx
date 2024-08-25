    import React from 'react'
    import styled from 'styled-components'
    import { useGlobalComponent } from '../GlobalComponentContext';

    function Modal() {
        const { isComponentVisible } = useGlobalComponent();
       
    return (
        <wrapper>
        {isComponentVisible && (
        <Div>
            <input type="text" placeholder='enter your username'/>
            <input type="password" placeholder='enter your password'/>
            <input type="submit" value="login" />

            <p>forget password ?</p>
            <p>create account ?</p>        
        </Div> )}
        </wrapper>
    )
    }

    const Div= styled.div`
    font-family: ${({ theme }) => theme.fontFamily.games};
    position: absolute;
    transform: translate(-50%,-50%);
    top: 50%;
    left: 50%;
    width: 550px;
    height: 500px;
    background-color: rgba(0,0,0,0.5);
    border: 2px solid #a6f3f5;
    border-radius: 15px;
    display:flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    font-size: 18px;

    input{
        width: 70%;
        height: 70px;
        margin: 20px;
        text-align: center;
    }

    p{
        color: white;
        display: inline-block;
        margin: 10px;
        text-decoration: underline;

        &:hover{
            cursor: pointer;
        }
    }

    input[type='submit']{
        background-color:${({theme})=>theme.colors.logoBlue};
        color: ${({theme})=>theme.colors.logoRed};
        font-size: 28px;
        font-weight: bold;
    }
    `
    export default Modal