import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';
import Lottie from "lottie-react";
import animation from "../../../public/login.json"
import logo from "../../assets/logo/EnaEma.png"
import { FaEye, FaEyeSlash } from "react-icons/fa";
const token = import.meta.env.VITE_IMAGE_TOKEN;
const SignUp = () => {

    const [url,setUrl] = useState("")
    const { updateUser, signUp, logOut } = useAuth();
    const [type, setType] = useState("password");
    const [IsShow, setIsShow] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const hosting_url = `https://api.imgbb.com/1/upload?key=${token}`
    const { register, formState: { errors }, handleSubmit } = useForm();


    const onSubmit = (data) => {

        const image = data.photo;
        // console.log(image[0]);
        const formData = new FormData();
        formData.append("image", image[0])

        const password = data.password;
        const confirmPassword = data.confirmPassword;
        const email = data.email;
        const favourite = data.favourite
        const message= data.message
        const name= data.name

        if (password.length < 6) {
            setError("Password must be six characters in length")
        }
        if (password !== confirmPassword) {
            return setError("Password doesn't match")
        }
        if (!/(?=.*?[A-Z])/.test(password)) {
            return setError("At least one upper case include in your password")
        }
        if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
            return setError("At least one special character include in your password")
        }
        console.log(data);

        fetch(hosting_url, {
            method: "POST",
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data){
                console.log(data);
                setUrl(data.data.display_url);
                const newData ={
                    email,
                    favourite,
                    name,
                    message,
                    photo: data.data.display_url,
                    role: "Pending"
                }
                signUp(email, password)
                .then(res => {
                    
                    console.log(newData);
                    const loggedUser = res.user;
                    updateUser(loggedUser, data?.name, data.data.display_url)
                        .then(() => {
                            fetch("https://ena-ema-server.vercel.app/users", {
                                method: "POST",
                                headers: {
                                    "content-type": "application/json"
                                },
                                body: JSON.stringify(newData)
                            })
                                .then(res => res.json())
                                .then(data => {
                                    if (data.insertedId) {
                                        logOut()
                                            .then(() => {
                                                navigate("/signIn")
                                                Swal.fire({
                                                    title: 'Success!',
                                                    text: 'Sign Up Successful. Please login!',
                                                    icon: 'success',
                                                    confirmButtonText: 'Ok'
                                                })
                                            })
                                    }
                                })
                        })
                })
                .catch(error => {
                    console.log(error);
                    Swal.fire({
                        title: 'Error!',
                        text: error.message,
                        icon: 'error',
                        confirmButtonText: 'Cool'
                    })
    
                })
            }
        })


    }


    const handleShow = () => {
        setType("text")
    }

    const handleHide = () => {
        setType("password")
    }

    return (
        <section className='flex items-center justify-center min-h-[calc(100vh-100px)]'>
            <Helmet>
                <title>Sign Up | Ena Ema Technologies</title>
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
                        <h1 className='text-center mb-10 brandFont text-primary text-3xl font-bold'>Sign Up</h1>
                        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-3'>

                        <label className='font-bold brandFont'>Name<sup className='text-error'>*</sup></label>
                            <input type='text' placeholder='Enter Your Name'
                                {...register("name", { required: true })}
                                aria-invalid={errors.name ? "true" : "false"}
                                className='inputField' />
                            {errors.name?.type === 'required' && <p role="alert" className='text-error font-medium'>Name is required</p>}


                            <label className='font-bold brandFont'>Email<sup className='text-error'>*</sup></label>
                            <input type='email' placeholder='Enter Your Email'
                                {...register("email", { required: true })}
                                aria-invalid={errors.email ? "true" : "false"}
                                className='inputField' />
                            {errors.email?.type === 'required' && <p role="alert" className='text-error font-medium'>Email is required</p>}

                            <label className='font-bold brandFont'>Password<sup className='text-error'>*</sup></label>
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

                            <label className='font-bold brandFont'>Confirm Password<sup className='text-error'>*</sup></label>
                            <div className='inline-flex items-center'>
                                <input type="password" placeholder='Confirm Password'
                                    {...register("confirmPassword", { required: "Confirm Password is required" })}
                                    aria-invalid={errors.confirmPassword ? "true" : "false"}
                                    className='inputField' />
                            </div>
                            {errors.confirmPassword && <p role="alert" className='text-error font-medium'>{errors.confirmPassword?.message}</p>}


                            <label className='font-bold brandFont'>Favourite Food Or Animal<sup className='text-error'>*</sup></label>
                            <input type='text' placeholder='Your favourite food or animal'
                                {...register("favourite", { required: true })}
                                aria-invalid={errors.favourite ? "true" : "false"}
                                className='inputField' />
                            {errors.favourite?.type === 'required' && <p role="alert" className='text-error font-medium'>This is required</p>}


                            <label className='font-bold brandFont'>Photo<sup className='text-error'>*</sup></label>
                            <input type='file' placeholder='Enter Your Photo Url'
                                {...register("photo", { required: true })}
                                aria-invalid={errors.photo ? "true" : "false"}
                                className='file-input file-input-bordered file-input-primary w-full' />
                            {errors.photo?.type === 'required' && <p role="alert" className='text-error font-medium'>Photo is required</p>}

                            <label className='font-bold brandFont'>Tell About Your Self<sup className='text-error'>*</sup></label>
                                <textarea rows="5" cols="10" maxLength="250" placeholder='Tell About Your Self'
                                    {...register("message", { required: true })}
                                    aria-invalid={errors.message ? "true" : "false"}
                                    className='inputField' />
                                {errors.message?.type === 'required' && <p role="alert" className='text-error font-medium'>Details is required</p>}


                            <p className='my-3 font-semibold text-red-600'>{error}</p>




                            <input type="submit" value="Sign Up" className='myBtn' />
                        </form>

                        <div className='my-7'>
                            <h1 className='font-medium'>Are you already an admin?? <Link className='font-semibold text-secondary underline' to="/signIn">Sign In</Link></h1>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignUp;