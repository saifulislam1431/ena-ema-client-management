import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Link, useLocation, useNavigate, useNavigation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Loading from '../Loading/Loading';
import logo from "../../assets/logo/EnaEma.png"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Helmet } from 'react-helmet-async';
import Lottie from "lottie-react";
import animation from "../../../public/login.json"
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import axios from 'axios';


const SignIn = () => {
    const {logOut} = useAuth()
    const [axiosSecure] = useAxiosSecure();

    const navigation = useNavigation();
    if (navigation.state === "loading") {
        return <Loading></Loading>
    }
    const { signIn } = useAuth();
    const [type, setType] = useState("password");
    const [IsShow, setIsShow] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/"
    const { register, formState: { errors }, handleSubmit } = useForm();


    const onSubmit = async(data) => {


        const response = await axios.get(`https://ena-ema-server.vercel.app/check/admin/${data?.email}`);
        if(response.data.admin){
            signIn(data?.email, data?.password)
            .then(async (res) => {
                const loggedUser = res.user;
                navigate("/dashboard/manageClients")
                Swal.fire({
                    title: 'Success!',
                    text: 'Sign In Successful',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
              
            })
            .catch(error => {
                Swal.fire({
                    title: 'Error!',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'Cool'
                })

            })
        }else{
            navigate("/")
            Swal.fire({
                title: 'Error!',
                text: 'Your not an approved admin. Please wait for other admin approval',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
        
    };


    const handleShow = () => {
        setType("text")
    }

    const handleHide = () => {
        setType("password")
    }


    return (
        <section className='flex items-center justify-center min-h-[calc(100vh-100px)]'>
            <Helmet>
                <title>Sign In | Ena Ema Technologies</title>
            </Helmet>
            <div>
                <div className='text-center my-10'>
                    <Link to="/" className='inline-flex items-center gap-2'>
                        <img src={logo} alt="Ena Ema Technologies" className='w-10' />
                        <p className='brandFont font-extrabold text-lg text-secondary'>Ena Ema Technologies</p>
                    </Link>

                </div>
                <div className='flex gap-14 flex-col lg:flex-row items-center justify-center'>
                    <div className='lg:w-2/4'>
                        <Lottie animationData={animation} loop={true} />
                    </div>
                    <div>
                        <h1 className='text-center mb-10 brandFont text-primary text-3xl font-bold'>Sign In</h1>
                        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-4'>
                            <input type='email' placeholder='Enter Your Email'
                                {...register("email", { required: true })}
                                aria-invalid={errors.email ? "true" : "false"}
                                className='inputField' />
                            {errors.email?.type === 'required' && <p role="alert" className='text-error font-medium'>Email is required</p>}

                            <div className='inline-flex items-center'>
                                <input type={type} placeholder='Enter Your Password'
                                    {...register("password", { required: "Password is required" })}
                                    aria-invalid={errors.password ? "true" : "false"}
                                    className='inputField' />
                                <div className='relative right-8 cursor-pointer' onClick={() => setIsShow(!IsShow)}>
                                    {
                                        IsShow ? <FaEyeSlash className='h-5 w-5 text-primary' onClick={handleHide} /> : <FaEye className='h-5 w-5 text-primary' onClick={handleShow} />
                                    }
                                </div>
                            </div>
                            {errors.password && <p role="alert" className='text-error font-medium'>{errors.password?.message}</p>}

                            <input type="submit" value="Sign In" className='myBtn' />
                        </form>

                        <div className='mt-5'>
                            <h1 className='font-medium'>Want to an admin of Ena Ema Technologies? <Link className='font-semibold text-secondary underline' to="/signUp">Sign Up</Link></h1>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignIn;