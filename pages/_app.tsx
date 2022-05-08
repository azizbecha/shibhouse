import React from 'react'
import { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css'
import AuthProvider from '../auth/AuthContext';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <ToastContainer
                position="top-center"
                autoClose={5000}
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