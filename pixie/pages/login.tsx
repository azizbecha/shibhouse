/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from "react"
import { NextPage } from "next"
import { NextRouter, useRouter } from "next/router"
import Link from "next/link"

import HCaptcha from '@hcaptcha/react-hcaptcha';
import { useMediaQuery } from "react-responsive"
import toast from "react-hot-toast";

import { LogUser } from "../interfaces"
import { signUser } from "../lib/signUser"

import ProtectedRoute from "../auth/ProtectedRoute"
import { hCaptchaConfig } from "../auth/config"

import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import SEO from "../utils/SEO"

import isEmpty from 'validator/lib/isEmpty'

const Login: NextPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const captchaRef = useRef(null);

    const router: NextRouter = useRouter();
    const isTabletOrMobile: boolean = useMediaQuery({ maxWidth: 1224 });

    const verify = async () => {

        // If email and password are not empty
        if (!isEmpty(email) && !isEmpty(password)) {

            const userObject: LogUser = {
                email: email,
                password: password
            }
        
            try {
                await signUser(userObject);
    
                toast.success('Welcome back !');
                
                router.push("/dashboard");
    
            } catch (e) {
                toast.error('Please verify your informations');
            }
        } else {
            toast.error("Please fill all the inputs");
        }
    }

    return (
        <div className="bg-dark text-white h-screen">
            <SEO title="Login | ShibHouse" description="Log to your account in Shibhouse.tv"  />
            <ProtectedRoute>
                <Navbar />
                <div className="relative">
                    <div className={`p-9 ${isTabletOrMobile ? 'w-11/12' : 'w-4/12'} mx-auto rounded-lg bg-darker mb-7`}>
                        <div className="mb-6">
                            <h2 className="text-white font-semibold text-4xl">
                                Welcome
                            </h2>
                            <p className="text-white text-sm mt-2">We are happy seeing you coming back</p>
                        </div>

                        <form onSubmit={(e) => {
                            e.preventDefault();
                            captchaRef.current.execute();
                        }} method="post">
                            <div className="mb-4">
                                <span className="font-medium">Email <span className="text-primary">*</span></span>
                                <input value={email} onChange={e => setEmail(e.currentTarget.value)} type="email" className="w-full px-2 py-2 rounded-md mt-1 bg-dark" placeholder="Please enter your email" required />
                            </div>

                            <div className="mb-4">
                                <span className="font-medium">Password <span className="text-primary">*</span></span>
                                <input value={password} onChange={e => setPassword(e.currentTarget.value)} type="password" className="w-full px-2 py-2 rounded-md mt-1 bg-dark" placeholder="Please enter your password" required />
                                <Link href="forgot-password"><p className="cursor-pointer text-white text-xs font-medium mt-2">Forgot password ?</p></Link>

                            </div>

                            <HCaptcha
                                sitekey={window.location.hostname == "localhost" ? hCaptchaConfig.devKey : hCaptchaConfig.siteKey}
                                onVerify={() => verify()}
                                size="invisible"
                                ref={captchaRef}
                            />

                            <button type="submit" className={`bg-primary mt-2 w-full rounded-lg text-white font-semibold py-2`}>Login</button>

                            <p className="text-white text-sm font-medium mt-4">Don't have an account ? <Link href="register"><span className="cursor-pointer">Register now</span></Link></p>
                        </form>
                    </div>
                </div>
                <Footer />
            </ProtectedRoute>
        </div>
    )
}

export default Login
