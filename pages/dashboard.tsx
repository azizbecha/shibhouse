import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/router"
import Head from "next/head"

import $ from 'jquery'

import { onAuthStateChanged, getAuth } from "firebase/auth";

import { toast } from "react-toastify"
import { Ticker } from "react-ts-tradingview-widgets";
import { FaHome, FaDollarSign } from "react-icons/fa"

import PrivateRoute from "../auth/PrivateRoute"

import generateId from "../lib/generateId"
import getUserData from "../lib/getUserData"
import createRoom from "../lib/createRoom"
import { NewRoom } from "../interfaces"

import ExportRooms from "../components/ExportRooms"

import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Divider from "../components/Divider"
import { PeopleSidebar } from "../modules/dashboard/PeopleSidebar";
import { MyProfileSidebar } from "../modules/dashboard/MyProfileSidebar";
import { FeedComponent } from "../modules/dashboard/FeedComponent";
import { Grid, Row, Col } from 'react-flexbox-grid/dist/react-flexbox-grid'
import { useScreenType } from "../lib/useScreenType";
const Dashboard = () => {

    const router = useRouter();

    const [showModal, setShowModal] = useState(false);

    const [userData, setUserData] = useState<any>({firstname: ' ', lastname: ' ', followers: [], following: []}) // adding default values to prevent showing undefined value error
    
    const screenType = useScreenType()
    
    
    useEffect(() => {
        const fetch = async () => {
            const auth = getAuth();
            onAuthStateChanged(auth, async (user) => {
            if (user) {
                const uid = user.uid;
                setUserData(await getUserData(uid))
                
            } else {

            }
            });
        }

        

        fetch();
    }, [])

    

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