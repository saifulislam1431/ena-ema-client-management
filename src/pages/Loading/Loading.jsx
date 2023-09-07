import React from 'react';
import logo from "../../assets/logo/EnaEma.png"
import "./loading.css"

const Loading = () => {
    return (
        <div className='flex justify-center items-center min-h-[calc(100vh-68px)] lg:w-2/3 mx-auto relative'>
        
        <img src={logo} alt="Logo" className='w-60 rounded-lg'/>
        <div className='absolute spinner'></div>
        
            </div>
    );
};

export default Loading;