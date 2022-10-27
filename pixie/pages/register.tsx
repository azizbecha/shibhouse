import { useRef, useState } from "react"
import { NextPage } from "next"
import Link from "next/link"

import ProtectedRoute from "../auth/ProtectedRoute"
import { hCaptchaConfig } from "../auth/config"
import SEO from "../utils/SEO"

import { useMediaQuery } from "react-responsive"

import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

import HCaptcha from "@hcaptcha/react-hcaptcha"
import { Row, Col } from 'react-flexbox-grid/dist/react-flexbox-grid'
import { createUser } from "../lib/createUser"
import { NewUser } from "../interfaces"

const Register: NextPage = () => {

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const captchaRef = useRef(null);

    const isTabletOrMobile: boolean = useMediaQuery({ maxWidth: 1224 });

    const verify = async () => {
        const user: NewUser = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            username: username,
            password: password,
            confirmpassword: confirmPassword
        }

        createUser(user);
    }

    return (
        <>
            <SEO title="Register | ShibHouse" description="Create a Shibhouse account now and start your trip with us !" />
            <ProtectedRoute>
                <Navbar />
                    <div className="bg-dark py-10 vh-100">
                        <div className="relative">
                            <div className={`p-9 ${isTabletOrMobile ? 'w-11/12' : 'w-8/12'} mx-auto rounded-lg bg-darker text-white mb-7`}>
                                <div className="mb-6">
                                    <h2 className="text-white font-semibold text-4xl">
                                        Welcome
                                    </h2>
                                    <p className="text-white text-sm mt-2">We are glad seeing you joining us</p>
                                </div>

                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    captchaRef.current.execute();
                                }} method="post">
                                    <Row>
                                        <Col sm={6}>
                                            <div className="mb-4">
                                                <span className="font-medium">Firstname <span className="text-primary">*</span></span>
                                                <input value={firstname} onChange={e => setFirstname(e.currentTarget.value)} type="text" className="w-full px-2 py-2 rounded-md mt-1 bg-dark" placeholder="Please enter your firstname" required />
                                            </div>
                                        </Col>

                                        <Col sm={6}>
                                            <div className="mb-4">
                                                <span className="font-medium">Lastname <span className="text-primary">*</span></span>
                                                <input value={lastname} onChange={e => setLastname(e.currentTarget.value)} type="text" className="w-full px-2 py-2 rounded-md mt-1 bg-dark" placeholder="Please enter your lastname" required />
                                            </div>
                                        </Col>

                                        <Col sm={6}>
                                            <div className="mb-4">
                                                <span className="font-medium">Email <span className="text-primary">*</span></span>
                                                <input value={email} onChange={e => setEmail(e.currentTarget.value)} type="email" className="w-full px-2 py-2 rounded-md mt-1 bg-dark" placeholder="Please enter your email" required />
                                            </div>
                                        </Col>

                                        <Col sm={6}>
                                            <div className="mb-4">
                                                <span className="font-medium">Username <span className="text-primary">*</span></span>
                                                <input value={username} onChange={e => setUsername(e.currentTarget.value)} type="text" className="w-full px-2 py-2 rounded-md mt-1 bg-dark" placeholder="Please enter your username" required />
                                            </div>
                                        </Col>

                                        <Col sm={6}>
                                            <div className="mb-4">
                                                <span className="font-medium">Password <span className="text-primary">*</span></span>
                                                <input minLength={8} value={password} onChange={e => setPassword(e.currentTarget.value)} type="password" className="w-full px-2 py-2 rounded-md mt-1 bg-dark" placeholder="Please enter your password" required />
                                            </div>
                                        </Col>

                                        <Col sm={6}>
                                            <div className="mb-4">
                                                <span className="font-medium">Confirm password <span className="text-primary">*</span></span>
                                                <input minLength={8} value={confirmPassword} onChange={e => setConfirmPassword(e.currentTarget.value)} type="password" className="w-full px-2 py-2 rounded-md mt-1 bg-dark" placeholder="Please confirm your password" required />
                                            </div>
                                        </Col>

                                        <HCaptcha
                                            sitekey={window.location.hostname == "localhost" ? hCaptchaConfig.devKey : hCaptchaConfig.siteKey}
                                            onVerify={() => verify()}
                                            size="invisible"
                                            ref={captchaRef}
                                        />

                                        <button type="submit" className={`bg-primary mt-2 w-full rounded-lg text-white font-semibold py-2`}>Join</button>

                                        <p className="text-white text-sm font-medium mt-4">Already have an account ? <Link href="login"><span className="cursor-pointer">Login now</span></Link></p>
                                    </Row>
                                </form>
                            </div>
                        </div>
                    </div>
                <Footer />
            </ProtectedRoute>
        </>
    )
}

export default Register