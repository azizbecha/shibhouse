/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link'

import PasswordStrengthBar from "react-password-strength-bar";
import { toast } from 'react-toastify'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import SEO from '../components/SEO';
import ProtectedRoute from '../auth/ProtectedRoute'

import { createUser } from '../lib/createUser'
import { NewUser } from '../interfaces'

import { Row, Col } from 'react-flexbox-grid/dist/react-flexbox-grid'


const IndexPage: React.FC<{props: any}> = ({props}) => {

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
        <>
            <SEO 
                title={props.title}
                description={props.description}
                image={props.image}
            />
            <ProtectedRoute>
                <Navbar />
                <div className="relative bg-dark">
                    {/*<div className="container px-6 pt-8 md:px-12 lg:px-7">
                        <div className="flex items-center flex-wrap px-1 md:px-0">
                            <div className="relative lg:w-6/12 lg:py-10 xl:py-32">
                                <h1 className="font-bold text-4xl text-white md:text-5xl lg:w-10/12" data-aos='fade-right'>Re-taking voice conversations to the moon 🚀</h1>
                                <form onSubmit={addUser} className="w-full mt-12">
                                    <div className="relative flex p-1 rounded-full shadow-md md:p-1 mb-5" data-aos='fade-left'>
                                        <input ref={firstnameRef} placeholder="First name" className="w-full p-4 rounded-full mr-4" type="text" required/>
                                        <input ref={lastnameRef} placeholder="Last name" className="w-full p-4 rounded-full" type="text" required/>
                                    </div>
                                    <div className="relative flex p-1 rounded-full shadow-md md:p-1 mb-5" data-aos='fade-left'>
                                        <input ref={emailRef} placeholder="Email" className="w-full p-4 rounded-full mr-4" type="email" required/>
                                        <input ref={usernameRef} placeholder="Username" className="w-full p-4 rounded-full" type="text" required/>
                                    </div>
                                    <div className="relative flex p-1 rounded-full shadow-md md:p-1 mb-5">
                                        <input value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            setPassword(e.target.value)
                                        }} placeholder="Your password" className="w-full p-4 rounded-full" type="password" required />
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
                                    </div>*/}

                    <section className="px-2 py-16 bg-dark text-white md:px-0">
                        <div className="container items-center max-w-6xl px-8 mx-auto xl:px-5">
                            <div className="flex flex-wrap items-center sm:-mx-3">
                                <div className="w-full md:w-1/2 md:px-3">
                                    <div className="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0">
                                        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
                                            <span className="block xl:inline">Re-taking voice conversations to the moon 🚀</span>
                                        </h1>
                                        <p className="mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl"></p>
                                        <div className="relative flex flex-col sm:flex-row sm:space-x-4">
                                            <a href="#_" className="flex items-center w-full px-6 py-3 mb-3 text-lg text-white font-semibold bg-primary rounded-md sm:mb-0 sm:w-auto">
                                                Join now
                                            </a>
                                            <a href="#_" className="flex items-center w-full px-6 py-3 mb-3 text-lg text-white font-semibold bg-primary rounded-md sm:mb-0 sm:w-auto">
                                                Log in
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full md:w-1/2">
                                    <div className="w-full h-auto overflow-hidden rounded-md sm:rounded-xl flex">
                                        <img src="shibhouse-logo-transparent.png" style={{width: '25%'}} className="flex mx-auto" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    <div className='container text-white text-justify'>
                        <span className="text-4xl font-bold">
                            About
                        </span><br /><br />
                        <span className="text-lg font-normal font-inter">
                            ShibHouse is an Opensource project created as a Joke where people can create rooms or join existing ones, listen to the speakers and participate in Chat. 
                            The main goal of this project is to make podcasts easier for everyone so we can share the culture of cryptocurrencies between our users and provide them a better place for sharing knowledge.
                        </span>
                    </div>
                </div>
                <Footer />
            </ProtectedRoute>
        </>
    )
}

export async function getStaticProps() {
    
    const props = {
        title: "Shibhouse - Re-taking voice conversations to the moon",
        description: "Re-taking voice conversations to the moon",
        image: "https://shibhouse.tv/cover.png"
    }

    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            props,
        },
    }
}

export default IndexPage