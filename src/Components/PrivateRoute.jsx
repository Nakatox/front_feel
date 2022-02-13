import React, { useEffect, useState } from 'react'
import {
    Navigate
  } from "react-router-dom";
import { testToken } from '../Services/API';
import { getToken } from '../Services/API';

const PrivateRoute = (props) => {

    const [isLogged, setIsLogged] = useState([]);

    const checkLogged = async () => {
        let token = await getToken();
        if(token){
            let response = await testToken();
            setIsLogged(response);
        }
        setIsLogged(false);
    }

    useEffect(() => {
        checkLogged();
    }, [])

    if (getToken()){
        // if(isLogged){
        //     console.log("oui");
            return props.children
        // }else{
        //     return <Navigate to="/login"/>
        // }
    }else{
        return <Navigate to="/login"/>
    }
}

export default PrivateRoute
