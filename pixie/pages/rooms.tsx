/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react"

import { collection, query, onSnapshot, orderBy, Query, DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { Unsubscribe } from "firebase/auth";

import { fireStore } from "../auth/Firebase";
import PrivateRoute from "../auth/PrivateRoute"

import $ from 'jquery'

import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

import { FaHome } from 'react-icons/fa'

import SEO from "../utils/SEO";
import ExportRooms from "../components/ExportRooms";

const Rooms: React.FC = () => {
    const [data, setData] = useState([]);
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        const q: Query<DocumentData> = query(collection(fireStore, "rooms"), orderBy("createdAt", "desc"));
        const getRooms: Unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
                const rooms = querySnapshot.docs
                .map((doc: QueryDocumentSnapshot<DocumentData>) => ({ ...doc.data(), id: doc.id }));
                setCount(rooms.length);
                setData(rooms);
            });
        });

    }, [data])

    useEffect(() => {
        $(document).ready(() => {
            $("#roomSearchInput").on("keyup", function() {
                var value = $(this).val().toLowerCase();
                $(".roomList .roomElement").filter(function() {
                    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                });
            });
        })
    }, [])
    return (
        <>
            <SEO title="Rooms | Shibhouse" description="Discover various rooms playing now at Shibhouse"/>
            <PrivateRoute>
                <Navbar />
                    <div className="bg-dark py-10">
                        <div className="container">
                            <h1 className="text-white font-bold text-4xl flex space-x-2"><FaHome className="my-auto" /> <span>Current rooms <span className="text-md">({count})</span></span></h1>
                            <div className="relative text-white border-0 my-5">
                                <input id="roomSearchInput" className="w-full h-10 px-3 py-2 text-base placeholder-gray-600 rounded-lg bg-darker" type="search" placeholder="Search for a room on the moon 🚀"/>
                            </div>
                            <div className="bg-darker p-4 rounded-lg mt-5">
                                <ExportRooms />
                            </div>
                        </div>
                    </div>
                <Footer />
            </PrivateRoute>
        </>
    )
}

export default Rooms