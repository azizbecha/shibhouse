import { useState } from "react"
import Link from "next/link";

import { collection, query, getDocs, doc, getDoc } from "firebase/firestore";
import { fireStore } from "../auth/Firebase";

import TimeAgo from "../lib/timeAgo";

import { FaUsers } from 'react-icons/fa'
import { GoClock } from "react-icons/go"
import getUserData from "../lib/getUserData";

const ExportRooms = () => {

    const [data, setData] = useState([]);
    const [creatorData, setCreatorData] = useState<any>()
    
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
    return (
        <ul role="list" className="divide-y divide-gray-200">
            {
                data.map((room, index) => {
                    const topics = room.topics.split(" ")
                    var user: any
                    const getUsername = async () => {
                        user = await getUserData(room.createdBy)
                    }
                    getUsername()
                    console.log(user)
                    return (
                        <li key={index} className="px-5 sm:py-4 border-b-2 bg-gray rounded-t-lg">
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
                                        <GoClock size={18} className="mt-0.5 text-primary" />&nbsp;Started {TimeAgo(room.createdAt)}.
                                    </p>
                                </div>
                                <div className="inline-flex items-center text-base">
                                    12&nbsp;<FaUsers className="text-green" size={20} />
                                </div>
                            </div>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default ExportRooms