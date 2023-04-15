import React, {useEffect} from 'react'
import styled from 'styled-components'
import Chat from "../assets/chat.png";
import {useNavigate} from 'react-router-dom'

export default function Home() {
    const navigate = useNavigate();
    const goToRegister = ()=>{
        navigate("/register");
    }
    useEffect(()=>{
        if(localStorage.getItem('chat-app-user')){
          navigate("/");
        }
      },[]);
  return (
    <>
        <Container>
            <div className='content'>
            <img src={Chat} alt='logo'/>
            <span>Chat Anytime Chat Anywhere</span>
            </div>
            <button onClick={goToRegister}>Start the chat</button>
        </Container>
    </>
  );
}
const Container = styled.div`
    background-color: #131324;
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    .content{
        justify-content: center;
        img{
            width: 26vw;
            height: 33vh;
        }
        span{
            color: #ffcccc;
            font-size: 25px;
        }
    }
    button{
        background-color: blue;
        color:white;
        padding: 1.4rem 5rem;
        margin-top: 45px;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 1.3rem;
        text-transform: uppercase;
        transition: 0.5s ease-in-out;
        &:hover{
          background-color: #4e0eff;
        }
      }
`;
