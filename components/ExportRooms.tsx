import { useEffect, useState } from "react"
import Link from "next/link";

import { collection, query, getDocs, doc, getDoc } from "firebase/firestore";
import { fireStore } from "../auth/Firebase";

import ReactTimeAgo from 'react-time-ago'

import { FaUsers } from 'react-icons/fa'
import { GoClock } from "react-icons/go"
const ExportRooms = () => {

    const [data, setData] = useState([]);
    const [creatorData, setCreatorData] = useState<any>()
    
    useEffect(() => {
        const getRooms = async () => {
            const q = query(collection(fireStore, "rooms"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const rooms = querySnapshot.docs
                .map((doc) => ({ ...doc.data(), id: doc.id }));
                setData(rooms);
            });
        }
        getRooms()
    }, [])


    if (data.length < 1) {
        return (
            <div className="bg-dark p-5 rounded-lg">
                <img src="musk-with-cybertruck-and-shiba.png" className="w-6/12 mx-auto" alt="" />
                <h1 className="text-center text-white font-medium">
                    There are no rooms actually
                </h1>
                <p className="text-center text-white font-normal text-sm mt-3 mb-3">
                    We didn't find any running rooms actually, why not create your own room ?
                </p>
            </div>
        )
    } else {return (
        <ul role="list">
            {
                data.map((room, index) => {
                    const topics = room.topics.split(" ");
                    return (
                        <li key={index} className="px-5 py-4 border-t-0 border-b-2 border-b-white bg-gray rounded-t-lg mb-5" data-aos="zoom-in">
                            <div className="flex items-center space-x-4">
                                <div className="flex-1 min-w-0">
                                    <Link href={`room/${room.id}`}>
                                        <p className="text-xg font-medium text-gray-900 truncate dark:text-white mb-2 cursor-pointer">
                                            {room.title}
                                        </p>
                                    </Link>
                                    <p className="text-sm dark:text-gray-400 mb-6">
                                        {room.description}
                                    </p>
                                    <p className="text-sm mb-4">
                                        {
                                            topics.map((word) => {
                                                return (
                                                    <span className="bg-dark text-white text-sm font-medium mr-2 px-2 py-1 rounded-lg">#{word}</span>
                                                )
                                            })
                                        }
                                    </p>
                                    <p className="text-sm font-normal flex">
                                        <GoClock size={18} className="mt-0.5 text-primary" />&nbsp;Started&nbsp;{<ReactTimeAgo tooltip={true} date={Number(room.createdAt)} locale="en-US"/>}.
                                    </p>
                                </div>
                                <div className="inline-flex items-center text-base">
                                    {room.users}&nbsp;<FaUsers className="text-green" size={20} />
                                </div>
                            </div>
                        </li>
                    )
                })
            }
        </ul>
    )}
    
}

export default ExportRooms