import React from 'react';
import SectionTitle from '../../components/SectionTitle';
import { useNavigation } from 'react-router-dom';
import Loading from '../Loading/Loading';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { HiMiniXMark } from 'react-icons/hi2';

const ManageClients = () => {
    
    const navigation = useNavigation();
    if (navigation.state === "loading") {
        return <Loading></Loading>
    }
    const [axiosSecure] = useAxiosSecure();


    const { data: messages = [], refetch } = useQuery({
        queryKey: ["messages"],
        queryFn: async () => {
            const res = await axiosSecure.get("/clients-message")
            return res.data;
        }
    })


    return (
        <section>
            <Helmet>
                <title>Manage Clients | Ena Ema Technologies</title>
            </Helmet>
            <SectionTitle
                subTitle="Manage Clients"
            ></SectionTitle>

            <div className='lg:mx-10'>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th className='text-center'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                messages.map(message => <tr key={message._id}>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div>
                                                <div className="font-bold">{message?.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='font-semibold'>
                                        {message?.email}
                                    </td>
                                    <td className='font-semibold'>
                                        {message?.number}
                                    </td>
                                    <th className='inline-flex gap-3 items-center'>
                                        <label htmlFor={message._id} className="myBtn">View Details</label>
                                    </th>

                                    <input type="checkbox" id={message._id} className="modal-toggle" />
<div className="modal">
  <div className="modal-box">
    <h3 className="brandFont font-bold text-lg">{message.service}</h3>
    <p className="py-4">{message.message}</p>
    <div className="modal-action">
      <label htmlFor={message._id} className="text-neutral hover:text-primary transition-all duration-500 absolute top-6 right-6 cursor-pointer"><HiMiniXMark className='h-7 w-7'/></label>
    </div>
  </div>
</div>
                                </tr>)

                            }


                        </tbody>


                    </table>

                </div>
            </div>
        </section>
    );
};

export default ManageClients;