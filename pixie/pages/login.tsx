/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from "react"
import { NextRouter, useRouter } from "next/router"

import { LogUser } from "../interfaces"
import { signUser } from "../lib/signUser"

import ProtectedRoute from "../auth/ProtectedRoute"

import { toast } from "react-toastify"

import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import SEO from "../utils/SEO"

const Login: React.FC = () => {

    const emailRef = useRef<any>();
    const passwordRef = useRef<any>();

    const router: NextRouter = useRouter();

    const [disabled, setDisabled] = useState<boolean>(false);

    const verify = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const userObject: LogUser = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
    
        try {
            toast.info('Please wait', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            setDisabled(true);

            await signUser(userObject);

            toast.success('Logged successfully !', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            
            setDisabled(false);
            router.push("/dashboard");

        } catch (e) {
            setDisabled(false)
            toast.error('Please verify your informations', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }
    return (
        <ProtectedRoute>
            <SEO title="Login - Shibhouse" description="Log to your account in Shibhouse.tv"  />
            <Navbar />
            <div className="relative bg-dark">
                <div className="container px-6 md:px-12 pb-5 lg:px-7">
                    <div className="flex items-center flex-wrap px-1 md:px-0">
                        <div className="relative lg:w-7/12 xl:py-32">
                            <h1 className="font-bold text-4xl text-white md:text-5xl lg:w-10/12">Login</h1>
                            <form onSubmit={verify}>
                                <h5 className="text-xl mt-10 text-white font-normal mb-3">Email</h5>
                                <input ref={emailRef} type="email" className="w-11/12 rounded-lg py-2 px-4" placeholder="Please enter your email" required/>

                                <h5 className="text-xl mt-4 text-white font-normal mb-3">Password</h5>
                                <input ref={passwordRef} type="password" className="w-11/12 rounded-lg py-2 px-4" placeholder="Please enter your password" required/>

                                <button type="submit" disabled={disabled} className="bg-primary w-11/12 mt-5 rounded-lg text-white font-semibold py-2">Login</button>
                                
                            </form>
                            <p className="mt-8 text-white lg:w-10/12 font-bold">By signing in, you will be able to join and create rooms ^_^</p>
                        </div>
                        <div className="ml-auto lg:w-5/12">
                            <img src="../images/cute-shiba-inu-with-flying-rocket.png" className="relative w-12/12 mx-auto my-auto" alt="Shib hero" loading="lazy" />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </ProtectedRoute>
    )
}

export default Login
