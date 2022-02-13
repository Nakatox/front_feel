import React, { useContext, useState } from 'react'
import {NavLink} from 'react-router-dom'
import { getToken, testToken } from '../Services/API'
import {useNavigate } from "react-router-dom";
import styled from 'styled-components'
import { useEffect } from 'react';

const HeaderS = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: blueviolet;
    color: white;
    padding: 10px 30px;
`
const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 20vw;
    justify-content: space-between;
`

const Text = styled.div`
& > a{
    text-decoration: none;
    color: white;
    text-decoration: underline;
}
`
export const Header = () => {
    let naviguate = useNavigate()

    const [isLogged, setIsLogged] = useState([])

    const logout = () =>{
        localStorage.removeItem("token");
        naviguate('/login')
    }

    const isLoggedCheck = async () => {
        const infos = await testToken()
        setIsLogged(infos)
    }
    useEffect(() => {
        isLoggedCheck()
    })

    if (getToken()){
        if(typeof(isLogged.token)!== "undefined"){ 
            return (
                <HeaderS>
                    <Container className="header_menu" style={{marginRight:'20px'}}>
                        <Text><button onClick={()=>{logout()}}>Logout</button></Text>
                        <Text><NavLink to="/">Home</NavLink></Text>
                        <Text><NavLink to="/recap">Recap</NavLink></Text>
                    </Container>
                </HeaderS>
            )
        }else{
            return(
                <HeaderS>
                    <Container className="header_menu" style={{marginRight:'20px'}}>
                        <Text><button onClick={()=>{logout()}}>Logout</button></Text>
                        <Text><NavLink to="/">Home</NavLink></Text>
                        <Text><NavLink to="/recap">Recap</NavLink></Text>
                    </Container>
                </HeaderS>
            )
        }
    }else{
        return (
            <HeaderS>
                <Container className="header_menu">
                    <Text><NavLink to="/login">Login</NavLink></Text>
                    <Text><NavLink to="/register">Register</NavLink></Text>
            </Container>
          </HeaderS>
        )
    }
    
}
