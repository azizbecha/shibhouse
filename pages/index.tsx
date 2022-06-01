import React, { useState, useRef } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link'
import Head from 'next/head'

import PasswordStrengthBar from "react-password-strength-bar";
import { toast } from 'react-toastify'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import ProtectedRoute from '../auth/ProtectedRoute'
import { createUser } from '../lib/createUser'
import { NewUser } from '../interfaces'

const IndexPage: React.FC = () => {

    const router = useRouter();

    const firstnameRef = useRef<any>();
    const lastnameRef = useRef<any>();
    const emailRef = useRef<any>();
    const usernameRef = useRef<any>();
    const passwordRef = useRef<any>();

    const [password, setPassword] = useState('')

    const addUser = (e) => {
        e.preventDefault();

        const userObject: NewUser = {
            firstname: firstnameRef.current.value,
            lastname: lastnameRef.current.value,
            email: emailRef.current.value,
            username: usernameRef.current.value,
            password: password
        }

        if (createUser(userObject)) {
            toast.success('Joined !', {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            router.push('/login');
        }
    }

    return (
        <ProtectedRoute>
            <Head>
                <title>Shibhouse</title>
                <meta name="description" content="Re-taking voice conversations to the moon 🚀" />
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://shibhouse.web.app/" />
                <meta property="og:title" content="Shibhouse" />
                <meta property="og:description" content="Re-taking voice conversations to the moon 🚀" />
                <meta property="og:image" content="cover.png" />

                <meta property="twitter:card" content="cover.png" />
                <meta property="twitter:url" content="https://shibhouse.web.app/" />
                <meta property="twitter:title" content="Shibhouse" />
                <meta property="twitter:description" content="Re-taking voice conversations to the moon 🚀" />
                <meta property="twitter:image" content="cover.png"></meta>
            </Head>
            <Navbar />
            <div className="relative bg-dark">
                <div className="container px-6 pt-8 md:px-12 lg:px-7">
                    <div className="flex items-center flex-wrap px-1 md:px-0">
                        <div className="relative lg:w-6/12 lg:py-10 xl:py-32">
                            <h1 className="font-bold text-4xl text-white md:text-5xl lg:w-10/12" data-aos='fade-right'>Re-taking voice conversations to the moon 🚀</h1>
                            <form onSubmit={addUser} className="w-full mt-12">
                                <div className="relative flex p-1 rounded-full shadow-md md:p-1 mb-5" data-aos='fade-left'>
                                    <input ref={firstnameRef} placeholder="First name" className="w-full p-4 rounded-full mr-4" type="text" />
                                    <input ref={lastnameRef} placeholder="Last name" className="w-full p-4 rounded-full" type="text" />
                                </div>
                                <div className="relative flex p-1 rounded-full shadow-md md:p-1 mb-5" data-aos='fade-left'>
                                    <input ref={emailRef} placeholder="Email" className="w-full p-4 rounded-full mr-4" type="email" />
                                    <input ref={usernameRef} placeholder="Username" className="w-full p-4 rounded-full" type="text" />
                                </div>
                                <div className="relative flex p-1 rounded-full shadow-md md:p-1 mb-5" data-aos='fade-left'>
                                    <input value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        setPassword(e.target.value)
                                    }} placeholder="Your password" className="w-full p-4 rounded-full" type="password" />
                                </div>
                                <PasswordStrengthBar
                                    minLength={8}
                                    password={password}
                                    barColors={[
                                        "#B83E26",
                                        "#FFB829",
                                        "#009200",
                                        "#009200",
                                        "#009200",
                                        "#009200"
                                    ]}
                                    className="mb-5 w-12/12"
                                />
                                <button type="submit" data-aos='fade-left' className="p-4 rounded-full hover:bg-secondary sm:w-full text-center transition bg-primary text-white md:px-12">
                                    <span className="text-white font-semibold md:block">Join now</span>
                                </button>
                            </form>
                            <p className="mt-8 text-white lg:w-10/12">By creating an account, you accept our Privacy Policy and Terms of Service.</p><br />
                            <p className="text-white lg:w-10/12">Already have an account ? Log in from <Link href='/login' passHref><span className="text-primary font-bold cursor-pointer">here</span></Link></p>
                        </div>
                        <div className="ml-auto -mb-25 lg:w-4/12" data-aos='flip-right'>
                            <img src="https://shibatoken.com/images/hero-shib.png" className="relative" alt="Shib hero" loading="lazy" width="3500" height="3500" />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </ProtectedRoute>
    )
}

export default IndexPage