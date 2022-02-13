import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Feel from '../Components/Feel';
import { getFeelAPI } from '../Services/API';

const ShowFeel = () => {

    const [feel, setFeel] = useState([])
    const [isLoaded, setIsLoaded] = useState(false);

    let slug  = useParams();
    
    const getFeel = async (idFeel) => {
        let data = await getFeelAPI(idFeel)
        setFeel(data);
        if (!isLoaded){
            setIsLoaded(true);
        }
    }
    
    useEffect(() => {
        getFeel(slug.id)
    }, [isLoaded])

    if (feel.length == undefined){
        return (
            <Feel key={feel.id} data={feel} isBig={true} />
        );
    } else {
        return (
            <div>Loading...</div>
        );
    }
};

export default ShowFeel;
