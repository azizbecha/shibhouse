/* eslint-disable @next/next/no-img-element */
import ProtectedRoute from "../auth/ProtectedRoute"
import SEO from "../utils/SEO"

import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { JoinForm } from "../forms/JoinForm"

import { Row, Col } from 'react-flexbox-grid/dist/react-flexbox-grid'

const Register: React.FC = () => {

    return (
        <ProtectedRoute>
            <SEO title="Register - Shibhouse" description="Create a Shibhouse account now and start your trip with us !" />
            <Navbar />
                <div className="bg-dark py-16 min-h-screen">
                    <div className="container">
                        <div className="">
                            <p className="text-white font-bold text-4xl font-inter mb-10">Register</p>
                            <Row>
                                <Col lg={7} md={12} sm={12} xs={12}>
                                    <JoinForm />
                                </Col>
                                <Col lg={5} md={12} sm={12} xs={12}>
                                    <img src="../images/cute-shiba-inu-with-flying-rocket.png" className="relative w-10/12 mx-auto mb-3" alt="Shib hero" loading="lazy" />
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            <Footer />
        </ProtectedRoute>
    )
}

export default Register
