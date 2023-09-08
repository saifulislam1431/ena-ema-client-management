import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useUsers = () => {
    const [axiosSecure] = useAxiosSecure();
    const {user,loading} = useAuth();


    const { data: users = [], refetch } = useQuery({
        queryKey: ["users",user],
        enabled: !loading && !!user,
        queryFn: async () => {
            const res = await axiosSecure.get("/users")
            return res.data;
        }
    })
    return [users,refetch]
};

export default useUsers;