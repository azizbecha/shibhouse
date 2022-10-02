import React, { useEffect } from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'

import NextNProgress from "nextjs-progressbar"

import AuthProvider from '../auth/AuthContext'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import AOS from 'aos'
import "aos/dist/aos.css"

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import 'react-flexbox-grid/dist/react-flexbox-grid.css'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
    
    useEffect(() => {
        TimeAgo.addDefaultLocale(en);
        TimeAgo.addLocale(en);

        AOS.init();
        AOS.refresh();
    }, [])

    return (
        <AuthProvider>
            <NextNProgress color='#fa2f2f' height={5} />
            <Head>
                <link rel="shortcut icon" href="../images/icon.ico" type="image/x-icon" />
                <meta name="theme-color" content="#fa2f2f" />
                <title>Shibhouse - Re-taking voice conversations to the moon</title>
            </Head>
            <ToastContainer
                position="top-center"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={true}
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