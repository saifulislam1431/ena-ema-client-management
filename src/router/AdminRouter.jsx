import React from 'react';
import useAdmin from '../hooks/useAdmin';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Loading from '../pages/Loading/Loading';

const AdminRouter = ({children}) => {
    const[isAdmin , isAdminLoading] = useAdmin()
    const{user,loading} = useAuth();
    const navigate = useNavigate();

    if(loading || isAdminLoading){
        return <Loading></Loading>
    }
    if(user && isAdmin){
        return children;
    }
    return navigate("/")
};

export default AdminRouter;