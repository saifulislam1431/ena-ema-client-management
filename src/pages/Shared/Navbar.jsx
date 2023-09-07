import React from 'react';
import logo from "../../assets/logo/EnaEma.png"
import { Link, NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { IoLogOutOutline, IoLogInOutline } from "react-icons/io5";
import Swal from 'sweetalert2';

const Navbar = () => {
  const { user, logOut } = useAuth();
  // const user = true;
  const navigate = useNavigate();


  const handleOut = () => {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to access dashboard after logout!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm'
    }).then((result) => {
      if (result.isConfirmed) {

        logOut()
          .then(() => {
            Swal.fire(
              'Logout!',
              'Logout successful',
              'success'
            )
            navigate("/signIn")
          })
      }
    })
  }


  const logoContainer = <Link to="/" className='inline-flex items-center gap-2'>
    <img src={logo} alt="Ena Ema Technologies" className='w-10' />
    <p className='brandFont font-extrabold text-lg text-secondary'>Ena Ema Technologies</p>
  </Link>


  const navItems = <>

    {
      user ? <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </label>
        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          <li>
            <NavLink to="/profile" className={({ isActive }) => (isActive ? "navActive" : "navDefault")}>Profile</NavLink>
          </li>

          <button onClick={handleOut} className='navDefault inline-flex items-center gap-2'>Logout <IoLogOutOutline className='h-6 w-6' /></button>

        </ul>
      </div> : <Link to="/signIn">
      <button className='myBtn inline-flex items-center gap-2'>Sign In <IoLogInOutline className='h-6 w-6' /></button>
      </Link>
    }

  </>

  return (
    <section className='sticky top-0 z-50'>
      <div className="navbar bg-base-100 sticky top-0 border-b border-primary shadow">
        <Link to="/" className='navbar-start'>
          {logoContainer}
        </Link>


        <div className="navbar-end">
          <ul className="menu menu-horizontal px-1">
            {navItems}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Navbar;