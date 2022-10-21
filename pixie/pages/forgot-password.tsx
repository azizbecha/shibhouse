import { useState } from "react"
import { NextPage } from "next"
import Link from "next/link"

import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "../auth/Firebase"
import ProtectedRoute from "../auth/ProtectedRoute"

import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

import { toast } from "react-hot-toast"

import SEO from "../utils/SEO"
import isEmail from 'validator/lib/isEmail'

import { MdRefresh } from "react-icons/md"
import { useMediaQuery } from "react-responsive"

const ForgotPassword: NextPage = () => {

    const isTabletOrMobile: boolean = useMediaQuery({ maxWidth: 768 });
    const [sent, setSent] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");

    const sendResetLink = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        
        if(isEmail(email)){
            sendPasswordResetEmail(auth, email)
            .then(() => {
                setSent(true);
                toast.success("Success");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                console.log(errorMessage);
                
                if (errorMessage == "Firebase: Error (auth/user-not-found).") {
                    toast.error("User not found");
                }
            });
        } else {
            toast.error("Please enter a valid email");
        }
    }

    return (
        <ProtectedRoute>
            <SEO title="Forgot password | Shibhouse" description="Reset your forgotten password from here" />
            <Navbar />
            <div className="bg-dark h-screen">
                <div className="container p-8">
                    <h1 className="text-white font-bold text-4xl">Forgot password ?</h1>

                    <h3 className="text-white font-medium mt-3 text-md">Don't worry ! Let's fix this together.</h3>

                    {
                        sent ? (
                            <div className="py-10">
                                <img src="../images/shiba-inu-with-rocket.png" className={`justify-center mx-auto mb-5 ${isTabletOrMobile ? 'w-8/12' : 'w-3/12'}`} alt="" />
                                <h2 className="text-white text-center font-normal text-2xl">
                                    Reset password link has been successfully sent to <span className="font-bold">{email}</span>
                                </h2>
                                <h3 className="text-white text-center font-normal text-2xl">
                                    Please check your email
                                </h3>

                                <Link href="login">
                                    <button className={`${isTabletOrMobile ? 'w-full' : 'w-6/12'} mt-6 bg-primary py-2 text-white text-center font-medium rounded mx-auto justify-center flex`}>Go to login</button>
                                </Link>
                            </div>
                        ) : (
                            <>
                                <img src="../images/shiba-inu-with-rocket.png" className={`mx-auto mt-8 mb-6 ${isTabletOrMobile ? 'w-8/12' : 'w-3/12'}`} alt="" />
                                <form className="py-2" onSubmit={sendResetLink}>
                                    <input type="email" value={email} onChange={e => setEmail(e.currentTarget.value)} placeholder="Please enter your email here" className={`rounded-lg py-2 px-4 mx-auto justify-center flex ${isTabletOrMobile ? 'w-full' : 'w-6/12'}`} required /><br />

                                    <button className={`${isTabletOrMobile ? 'w-full' : 'w-6/12'} bg-primary py-2 text-white text-center font-medium rounded mx-auto justify-center flex`}><MdRefresh size={20} className="mr-1 my-auto" /> Reset my password</button>
                                </form>
                            </>
                        )
                    }
                </div>
            </div>
            <Footer />
        </ProtectedRoute>
    )
}

export default ForgotPassword