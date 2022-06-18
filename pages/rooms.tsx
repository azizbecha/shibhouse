/* eslint-disable @next/next/no-img-element */
import PrivateRoute from "../auth/PrivateRoute"
import ExportRooms from "../components/ExportRooms"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { useEffect, useState } from "react"
import Link from "next/link";

import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { fireStore } from "../auth/Firebase";

import { FaHome, FaUsers } from 'react-icons/fa'
import { GoClock } from "react-icons/go"
import { RiChat4Fill, RiChatOffFill } from "react-icons/ri"
import Head from "next/head"

const Rooms: React.FC = () => {
    const [data, setData] = useState([]);
    const [count, setCount] = useState(0)

    useEffect(() => {
        const q = query(collection(fireStore, "rooms"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                
                const rooms = querySnapshot.docs
                .map((doc) => ({ ...doc.data(), id: doc.id }));
                setCount(rooms.length)
                setData(rooms);

            });
        });

    }, [data])
    return (
        <PrivateRoute>
            <Head>
                <title>Rooms - Shibhouse</title>
            </Head>
            <Navbar />
                <div className="bg-dark py-10">
                    <div className="container">
                        <h1 className="text-white font-bold text-4xl flex space-x-2"><FaHome className="my-auto" /> <span>Current rooms <span className="text-md">({count})</span></span></h1>
                        <div className="bg-darker p-4 rounded-lg mt-5">
                            {
                                data.length > 0 ? (
                                    <>
                                        <ul role="list" id="roomsList">
                                            {
                                                data.map((room, index) => {
                                                    const topics = room.topics.split(" ");
                                                    return (
                                                        <li key={index} className="px-5 py-4 border-t-0 border-b-2 border-b-white bg-dark rounded-t-lg mb-5 shadow-lg">
                                                            <div className="flex items-center space-x-4">
                                                                <div className="flex-1 min-w-0">
                                                                    <Link href={`room/${room.id}`}>
                                                                        <p className="text-xg font-medium text-white mb-2 cursor-pointer">
                                                                            {room.title}
                                                                        </p>
                                                                    </Link>

                                                                    <p className="text-sm text-white mb-6">
                                                                        {room.description}
                                                                    </p>
                                                                    <p className="text-sm mb-4">
                                                                        {
                                                                            topics.map((word, key) => {
                                                                                return (
                                                                                    <span key={key} className="bg-darker text-white text-sm font-medium mr-2 px-2 py-1 rounded-lg">#{word}</span>
                                                                                )
                                                                            })
                                                                        }
                                                                    </p>
                                                                    <p className="text-sm text-white font-semibold flex space-x-1 mb-1">
                                                                        {room.allowChat ? <RiChat4Fill size={18} className="my-auto mr-1 text-primary" /> : <RiChatOffFill className="my-auto mr-1 text-primary" /> } Chat {!room.allowChat && 'not'} allowed
                                                                    </p>
                                                                    <p className="text-sm text-white font-normal flex space-x-1">
                                                                        <GoClock size={18} className="my-auto mr-1 text-primary" /> With <Link href={`user/${room.createdBy}`}><span className="font-bold text-white text-sm cursor-pointer">@{room.createdBy}</span></Link>
                                                                    </p>
                                                                </div>
                                                                <div className="flex font-bold">
                                                                    <div className="items-center flex space-x-1">
                                                                        <span className="text-sm text-white">{room.users}</span> <FaUsers className="text-primary" size={18} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </>
                                ) : (
                                    <div className="bg-dark p-5 rounded-lg">
                                        <img src="../musk-with-cybertruck-and-shiba.png" className="w-6/12 mx-auto" alt="" />
                                        <h1 className="text-center text-white font-inter text-3xl">
                                            There are no rooms actually
                                        </h1>
                                        <p className="text-center text-white font-normal text-lg mt-3 mb-3">
                                            We didn&apos;t find any running rooms actually, why not create your own room ?
                                        </p>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            <Footer />
        </PrivateRoute>
    )
}

export default Rooms