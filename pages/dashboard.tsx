import React from "react"
import Head from "next/head"

import PrivateRoute from "../auth/PrivateRoute"

import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { PeopleSidebar } from "../modules/dashboard/PeopleSidebar";
import { MyProfileSidebar } from "../modules/dashboard/MyProfileSidebar";
import { FeedComponent } from "../modules/dashboard/FeedComponent";
import { Row, Col } from 'react-flexbox-grid/dist/react-flexbox-grid'

const Dashboard: React.FC = () => {

    return (
        <PrivateRoute>
            <Head>
                <title>Dashboard - Shibhouse</title>
            </Head>
            <div className="bg-dark text-white">
                <Navbar />
                    <div className="mx-auto" style={{width: '98%'}}>
                        <Row>
                            <Col xs={12} sm={3} md={2} lg={3}>
                                <PeopleSidebar />
                            </Col>
                            <Col xs={12} sm={3} md={10} lg={6}>
                                <FeedComponent />
                            </Col>
                            <Col xs={12} sm={3} md={2} lg={3}>
                                <MyProfileSidebar />
                            </Col>
                        </Row>
                    </div>
                <Footer />
            </div>
        </PrivateRoute>
    )
}

export default Dashboard