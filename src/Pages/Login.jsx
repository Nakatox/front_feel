import React, { useContext } from 'react'
import { useForm} from "react-hook-form";
import {useNavigate } from "react-router-dom";
import { LoginAPI } from '../Services/API';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    let naviguate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data)=> {
        let response = await LoginAPI(data)
        if(response.token){
            localStorage.setItem('token', response.token);
            naviguate('/')
            toast.success('You are loged on !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }else if (response.code >= 400 && response.code<=499 ){
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
    }
    return (
        <div className="login">
            <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            />
             <form onSubmit={handleSubmit(onSubmit)}>
                <p>Email :</p>
                <input type="text" defaultValue="root@root.fr" {...register("email", {required:true})} />
                <p>Password :</p>
                <input type="password" {...register("password", {required:true})}/>
                <input type="submit" value="Login" />

                {errors.email && <span>This field is required</span>}
                {errors.password && <span>This field is required</span>}
            </form>
        </div>
    )
}

export default Login
