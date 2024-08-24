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
            <button>login</button>
            <p>forget password ?</p>
            <p>create account ?</p>        
        </Div> )}
        </wrapper>
    )
    }

    const Div= styled.div`
    position: absolute;
    transform: translate(-50%,-50%);
    top: 50%;
    left: 50%;
    width: 600px;
    height: 500px;
    background-color: rgba(0,0,0,0.5);
    border: 2px solid #a6f3f5;
    border-radius: 15px;
    text-align: center;
    padding-left: 120px;

    input{
        display: block;
        width: 70%;
        height: 70px;
        margin: 20px;
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

    button{
        background-color:green;
    }
    `
    export default Modal