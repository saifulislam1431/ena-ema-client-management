import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import router from './router/router.jsx'
import Auth from './Auth/Auth.jsx'
import { HelmetProvider } from 'react-helmet-async'
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <div className='max-w-7xl mx-auto'>
    <React.StrictMode>
      <HelmetProvider>
        <Auth>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </Auth>
      </HelmetProvider>
    </React.StrictMode>
  </div>
)
