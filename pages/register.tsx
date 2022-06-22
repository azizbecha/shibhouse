/* eslint-disable @next/next/no-img-element */
import Head from "next/head"

import ProtectedRoute from "../auth/ProtectedRoute"

import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { JoinForm } from "../forms/JoinForm"

import { Row, Col } from 'react-flexbox-grid/dist/react-flexbox-grid'
import SEO from "../utils/SEO"

const Register: React.FC = () => {

    return (
        <ProtectedRoute>
            <SEO title="Register - Shibhouse" description="Create a Shibhouse account now and start your trip with us !" />
            <Navbar />
                <div className="bg-dark py-16">
                    <div className="container">
                        <div className="">
                            <p className="text-white font-bold text-4xl font-inter mb-10">Register</p>
                            <Row>
                                <Col lg={8} md={12} sm={12} xs={12}>
                                    <JoinForm />
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
