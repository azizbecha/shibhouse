import { useState } from "react"
import { collection, query, where, getDocs } from "firebase/firestore";

import { FaUsers } from 'react-icons/fa'
import { GoClock } from "react-icons/go"
import { fireStore } from "../auth/Firebase";
import TimeAgo from "../lib/timeAgo";

const ExportRooms = () => {

    const [data, setData] = useState([]);
    const q = query(collection(fireStore, "rooms"));

    const getRooms = async () => {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            const newUserDataArray = querySnapshot.docs
            .map((doc) => ({ ...doc.data(), id: doc.id }));

            setData(newUserDataArray);
        });
        console.log(data)
    }

    getRooms()
    return (
        <ul role="list" className="divide-y divide-gray-200">
            {
                data.map((room, index) => {
                    const topics = room.topics.split(" ")
                    return (
                        <li className="px-5 sm:py-4 border-b-2 bg-gray rounded-t-lg">
                            <div className="flex items-center space-x-4">
                                <div className="flex-1 min-w-0">
                                    <p className="text-xg font-medium text-gray-900 truncate dark:text-white mb-2 cursor-pointer">
                                        {room.title}
                                    </p>
                                    {/*<p className="text-sm truncate dark:text-gray-400 mb-6">
                                        Aziz & 2 more speakers.
                                    </p>*/}
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