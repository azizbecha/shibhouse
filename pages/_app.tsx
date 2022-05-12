import React, { useEffect } from 'react'
import { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css'
import AuthProvider from '../auth/AuthContext';

import AOS from 'aos'
import "aos/dist/aos.css";

function MyApp({ Component, pageProps }: AppProps) {

    useEffect(() => {
        AOS.init();
        AOS.refresh();
    })

    return (
        <AuthProvider>
            <ToastContainer
                position="top-center"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Component {...pageProps} />
        </AuthProvider>
    )
}

export default MyApp;
