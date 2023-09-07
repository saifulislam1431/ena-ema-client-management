import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Main from '../layouts/Main';
import SignUp from '../pages/SignUp/SignUp';
import SignIn from '../pages/SignIn/SignIn';
import Dashboard from '../pages/Dashboard/Dashboard';
import ManageUsers from '../pages/Admin/ManageUsers';
import ManageClients from '../pages/Admin/ManageClients';
import Home from '../pages/Home/Home';

const router = createBrowserRouter([
    {
        path:"/",
        errorElement: <h1>Error</h1>,
        element:<Main />,
        children:[
            {
                path:"/",
                element:<Home />
            },
            {
                path:"/signIn",
                element:<SignIn />
            },
            {
                path: "/signUp",
                element:<SignUp />
            },
            {
                path:"/dashboard",
                element:<Dashboard />,
                children:[
                    {
                        path:"manageUsers",
                        element:<ManageUsers />
                    },
                    {
                        path:"manageClients",
                        element:<ManageClients />
                    }
                ]
            }
        ]
    }
])

export default router;