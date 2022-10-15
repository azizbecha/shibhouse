import React, { useEffect } from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'

import NextNProgress from "nextjs-progressbar"

import AuthProvider from '../auth/AuthContext'

import { Toaster } from 'react-hot-toast'

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
        <>
            <AuthProvider>
                <NextNProgress color='#fa2f2f' height={5} />
                <Toaster />
                <Component {...pageProps} />
            </AuthProvider>
        </>
    )
}

export default MyApp;