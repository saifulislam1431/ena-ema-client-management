import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/logo/EnaEma.png"

const SectionTitle = ({subTitle}) => {
    return (
        <section className='my-14 text-center'>
            <Link to="/" className='inline-flex items-center gap-2'>
    <img src={logo} alt="Ena Ema Technologies" className='w-10' />
    <p className='brandFont font-extrabold text-lg text-secondary'>Ena Ema Technologies</p>
  </Link>
            <div>
                <h1 className='brandFont text-2xl underline my-5'>{subTitle}</h1>
            </div>
        </section>
    );
};

export default SectionTitle;