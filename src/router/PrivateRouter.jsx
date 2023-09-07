import React from 'react';
import useAuth from '../hooks/useAuth';
import { useLocation } from 'react-router-dom';
import Loading from '../pages/Loading/Loading';
import Swal from 'sweetalert2';

const PrivateRouter = ({children}) => {
    const {user , loading} = useAuth();
    const location = useLocation()
    if(loading){
        return <Loading></Loading>
    }
    if(!user){
        Swal.fire({
            title: 'Alert!',
            text: "You have to sign in first",
            icon: 'error',
            confirmButtonText: 'Cool'
          })
          return <Navigate to="/signIn" state={{from : location}} replace/>
    }
    if(user){
        return children;
    }
};

export default PrivateRouter;