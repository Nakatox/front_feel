import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select'
import { toast } from 'react-toastify';
import Feel from '../Components/Feel';
import { createFeelAPI, getFeelsAPI, getMoodsAPI } from '../Services/API';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import styled from 'styled-components';


const Feels = () => {

    const [feels, setfeels] = useState([]);
    const [moods, setmoods] = useState([]);
    const [idmood, setidmood] = useState([])
    const [isLoaded, setisLoaded] = useState(false);
    const [option, setoption] = useState([]);
    const [formData, setformData] = useState([]);
    const [newDate, setnewDate] = useState(new Date());
    const [isCustom, setisCustom] = useState(false);

    const getFeels = async () => {
        const data =  await getFeelsAPI()
        const moods = await getMoodsAPI() 
         
        setfeels([...data]) 
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

    const { register, handleSubmit } = useForm();
    const onSubmit = async (data)=> {
        if (!isNaN(data.note) && (data.note <10 || data.note >0)){
            let response = await createFeelAPI({"description":data.description, "note":data.note,"mood":idmood, "newDate":newDate.toISOString().split('T')[0], "isCustom":isCustom})
            setformData(data)
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

    useEffect(async () => {
        let loadData = await getFeels()
    }, [isLoaded, formData])

    if (feels && moods) {
        return (
            <div>
                <div>
                    <input type="checkbox" name="" id="isCustom" onChange={()=>{setisCustom(!isCustom)}}/>
                    <label got="isCustom">Set a custom date ?</label>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <p>note :</p>
                        <input type="number" min="0" max="10" {...register("note", {required:true})} />
                        <Select options={option} onChange={(e)=>{setidmood(e.value)}}/>
                        <p>description :</p>
                        <input type="text" {...register("description", {required:true})}/>
                        <div style={{display: isCustom ? "block" : "none"}}>
                            <DatePicker
                                placeholderText='Select date'
                                onChange={(date) => setnewDate(date)}
                                selected={newDate}
                            />
                        </div>
                        <input type="submit" value="Add feel" />
                    </form>
                </div>
                <Container>
                    {feels.map(feel => (
                        <Feel id={feel.id} data={{feel}} isBig={false} />
                    ))}
                </Container>
            </div>
        )
    } else {
        return (
            <div>
                <h1>Loading</h1>
            </div>
        )
    }
};


const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    `

export default Feels;
