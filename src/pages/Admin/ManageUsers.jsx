import React from 'react';
import { useNavigation } from 'react-router-dom';
import Loading from '../Loading/Loading';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../components/SectionTitle';
import { HiOutlineTrash } from 'react-icons/hi2';
import useUsers from '../../hooks/useUsers';


const ManageUsers = () => {
    const [users , refetch] = useUsers();

    const navigation = useNavigation();
    if (navigation.state === "loading") {
        return <Loading></Loading>
    }


    const handleAdmin = async (user) => {

        const res = await axiosSecure.patch(`/users/admin/${user?._id}`);
        if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
                title: 'Success!',
                text: `${user?.name} is an Admin Now!`,
                icon: 'success',
                confirmButtonText: 'Cool'
            })
        }
    }

    const handleDelete = async (user) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "He won't be able to access the admin panel!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then(async(result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/users/admin/delete/${user?._id}`);
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire(
                        'Deleted!',
                        'Successfully delete from admin panel!',
                        'success'
                      )
                }
              
            }
          })

        
        
    }

    return (
        <section>
            <Helmet>
                <title>Manage Users | Ena Ema Technologies</title>
            </Helmet>
            <SectionTitle
                subTitle="Manage Users"
            ></SectionTitle>

            <div className='lg:mx-10'>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th className='text-center'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users?.map(user => <tr key={user._id}>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={user?.photo} alt="User" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{user?.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='font-semibold'>
                                        {user?.email}
                                    </td>
                                    <td className='font-bold px-2 py-1 text-green-500'>{user?.role}</td>
                                    <th className='inline-flex gap-3 items-center'>
                                        <button className="myBtn" onClick={() => handleAdmin(user)} disabled={user?.role === "admin" ? true : false}>Make Admin</button>
                                        <button onClick={()=>handleDelete(user)} className="bg-error px-2 py-1 border border-error text-white hover:bg-transparent hover:text-error  rounded transition-all duration-500 "><HiOutlineTrash className='w-7 h-7' /></button>
                                    </th>
                                </tr>)
                            }


                        </tbody>


                    </table>
                </div>
            </div>
            
        </section>
    );
};

export default ManageUsers;