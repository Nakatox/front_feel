import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getMoodsAPI, updateFeelAPI } from '../Services/API';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useForm } from 'react-hook-form';
import Select from 'react-select'
import { useEffect } from 'react';
import DatePicker from 'react-datepicker';



const Feel = (props) => {

    let naviguate = useNavigate()
    const [moods, setmoods] = useState([]);
    const [idmood, setidmood] = useState([])
    const [isLoaded, setisLoaded] = useState(false);
    const [option, setoption] = useState([]);
    const [newDate, setnewDate] = useState(false);

    const { register, handleSubmit } = useForm();
    const onSubmit = async (data)=> {
        if (!isNaN(data.note) && (data.note <10 || data.note >0)){
            
            let response = await updateFeelAPI(props.data.id, {"description":data.description, "note":data.note,"mood":idmood, "newDate":!newDate ? props.data.data : newDate.toISOString().split('T')[0], "isCustom":true})

            if(response.status == 200){
                toast.success('Your article have been added !', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                
            }else if (response.status == 400){
                if (response.error == "already"){
                    toast.error('You already have an article in this date', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                } else if (response.error == "only"){
                    toast.error('You can only have one feel per day', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }

            }else {
                toast.error('wrong information', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }else{
            toast.error('Note must be between 0 and 10', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

    }
    const getMoods = async () => {
        const moods = await getMoodsAPI() 
        console.log("oyiouoiuoiouiouioui");

        setmoods(moods)
        if (option.length === 0) {
            moods["hydra:member"].forEach((element, id) => {
                let value = {'value':element["@id"], 'label':element.name}
                setoption(option => [...option, value])
                if (!isLoaded){
                    if (id === 0 ){
                        setidmood(value.value)
                    }
                    if (option.length>1 && id === 1){       
                        setisLoaded(true)
                    }
                }
            });
        }
    }

    useEffect(async () => {
        if (props.isBig){
            let loadData = await getMoods()
        }
    }, [isLoaded])

    if (props.isBig){
        const feel = props.data;

        return (
            <Container2>
                <Popup trigger={<Button> Edit</Button>} position="right center" modal>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <p>note :</p>
                        <input type="number" min="0" max="10" {...register("note", {required:true})} defaultValue={feel.note} />
                        <Select options={option} onChange={(e)=>{setidmood(e.value)}}/>
                        <p>description :</p>
                        <textarea type="text" {...register("description", {required:true})} defaultValue={feel.description}rows="4" cols="50" maxLength="200"/>
                        <DatePicker
                            placeholderText='Select date'
                            onChange={(date) => setnewDate(date)}
                            selected={!newDate ? new window.Date(feel.date.split('T')[0]) : newDate}
                        />
                        <input type="submit" value="Edit feel" />
                    </form>
                </div>
                </Popup>
                <Note>{feel.note}/10</Note>
                <Mood>{feel.mood.name}</Mood>
                <Description>{feel.description}</Description>
                <Date>{feel.date.substr(0, 10)}</Date>
            </Container2>
        );
    } else {
        const feel = props.data.feel;
        return(
            <Container onClick={()=>{}}>
                <Note>{feel.note}/10</Note>
                <Mood>{feel.mood.name}</Mood>
                <Date>{feel.date.substr(0, 10)}</Date>
                <div>
                    <Button onClick={()=>{naviguate(`/feel/${feel.id}`)}}>See this feel</Button>
                </div>
            </Container>
        ) ;
    }
    
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid #9c39d6;
    border-radius: 5px;
    height: fit-content;
    width: 200px;
    margin: 10px;
    `
const Container2 = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    height: fit-content;

    margin: 10px;
`
const Button = styled.button`
    background-color: #9c39d6;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px;
    margin: 5px;
    cursor: pointer;
    `
const Note = styled.p`
    font-size: 1.5em;
    font-weight: bold;
`
const Mood = styled.p`
    font-size: 1.9em;`

const Description = styled.p`
    font-size: 1.3em;
`
const Date = styled.p`
    font-size: 1.3em;
`


export default Feel;
