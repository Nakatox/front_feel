import React from 'react'
import { useForm} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { RegisterAPI } from '../Services/API';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Register = () => {

    let naviguate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data)=> {
        let response = await RegisterAPI(data)
        console.log(response);
        if(response.status >= 200 && response.status <= 299){
            toast.success('Your are registered !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            naviguate('/home')
        }else if (response.status >= 400 && response.status<=499 ){
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
        <div className="register">
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
                <input type="text" defaultValue="vincent.loron@sfr.fr" {...register("email", {required:true})} />
                <p>Password :</p>
                <input type="password" {...register("password", {required:true})}/>
                <p>Password Verif :</p>
                <input type="password" {...register("password_verif", {required:true})}/>
                <input type="submit" value="Register" />

                {errors.email && <span>This field is required</span>}
                {errors.password && <span>This field is required</span>}
                {errors.password_verif && <span>This field is required</span>}
            </form>
        </div>
    )
}

export default Register
