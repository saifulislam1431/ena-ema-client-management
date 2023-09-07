import React from 'react';
import Lottie from "lottie-react"
import animation from "../../../public/dashboard.json"
import { Link } from 'react-router-dom';
import useAdmin from '../../hooks/useAdmin';
const Home = () => {
    const [isAdmin] = useAdmin()
    return (
<div className="hero min-h-screen bg-white">
  <div className="hero-content flex-col lg:flex-row">
   <div>
    <Lottie animationData={animation} loop={true} />
   </div>
    <div>
      <h1 className="text-5xl font-bold">Hello Dev!</h1>
      <p className="py-6">Welcome to the Admin Dashboard, your central hub for managing and controlling the various aspects of your system. From user management to data analysis, this page provides you with the tools and insights you need to keep your platform running smoothly and efficiently. Explore the menu options and take charge of your admin responsibilities with ease.</p>
      {
        isAdmin ? <Link to="/dashboard/manageUsers">
        <button className="myBtnSec">Go To Dashboard</button>
        </Link> : <Link to="/signIn">
      <button className="myBtnSec">Get Started</button>
      </Link>
      }
    </div>
  </div>
</div>
    );
};

export default Home;