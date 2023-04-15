import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { BiPowerOff } from 'react-icons/bi'

export default function Logout() {
    const navigate = useNavigate();
    const handleClick = ()=>{
        localStorage.clear();
        navigate("/login");
    }
  return (
    <Button onClick={handleClick}>
      <BiPowerOff />
    </Button>
  )
}

const Button = styled.button`
    display:flex;
    justify-content: center;
    align-items: center;
    padding: 0.8rem;
    border-radius: 0.5rem;
    background-color: #663300;
    border: none;
    cursor: pointer;
    svg{
        font-size: 1.5rem;
        color: #ff9999;
    }
`; 
