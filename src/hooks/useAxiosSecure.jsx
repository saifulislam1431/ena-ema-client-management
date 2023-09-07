import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";





const axiosSecure = axios.create({
    baseURL: "https://ena-ema-server.vercel.app"
});

const useAxiosSecure = () => {

    const { logOut } = useAuth();
    const navigate = useNavigate();
    useEffect(()=>{
        axiosSecure.interceptors.request.use(
            (req)=>{
                const token = localStorage.getItem("access-token")
             if(token){
                req.headers.Authorization = `Bearer ${token}`
             }   
             return req;
            }
        );

        axiosSecure.interceptors.response.use((res)=>res,
        async(error)=>{
            if(error.res && (error.res.status === 401 || error.res.status === 403)){
                await logOut();
                navigate("/signIn")
            }
            return Promise.reject(error);
        });
    },[logOut , navigate])
    
    return [axiosSecure]
};

export default useAxiosSecure;