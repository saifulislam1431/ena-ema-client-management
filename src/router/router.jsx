import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Main from '../layouts/Main';
import SignUp from '../pages/SignUp/SignUp';
import SignIn from '../pages/SignIn/SignIn';
import Dashboard from '../pages/Dashboard/Dashboard';
import ManageUsers from '../pages/Admin/ManageUsers';
import ManageClients from '../pages/Admin/ManageClients';
import Home from '../pages/Home/Home';
import PrivateRouter from './PrivateRouter';
import AdminRouter from './AdminRouter';

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
                element:<PrivateRouter><AdminRouter><Dashboard /></AdminRouter></PrivateRouter>,
                children:[
                    {
                        path:"manageUsers",
                        element:<PrivateRouter><AdminRouter><ManageUsers /></AdminRouter></PrivateRouter>
                    },
                    {
                        path:"manageClients",
                        element:<PrivateRouter><AdminRouter><ManageClients /></AdminRouter></PrivateRouter>
                    }
                ]
            }
        ]
    }
])

export default router;