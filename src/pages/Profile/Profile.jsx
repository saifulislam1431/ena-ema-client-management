import React from 'react';
import { Link, useNavigation } from 'react-router-dom';
import Loading from '../Loading/Loading';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const Profile = () => {
    const navigation = useNavigation();
    if (navigation.state === "loading") {
        return <Loading></Loading>
    }
    const [axiosSecure] = useAxiosSecure();


    const { data: users = [], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users")
            return res.data;
        }
    })
    return (
       <div>
        {
            users.map(user=><div key={user._id} className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
              <img src={user.photo} className="w-96 h-80 rounded-lg shadow-2xl" />
              <div>
                <h1 className="text-4xl font-bold brandFont">{user.name}</h1>
                <p className="py-4 font-semibold">{user.email}</p>
                <p className='mb-4 font-medium'>{user.message}</p>
                <Link to="/dashboard/manageUsers">
        <button className="myBtn">Go To Dashboard</button>
        </Link>
              </div>
            </div>
          </div>)
        }
       </div>
    );
};

export default Profile;