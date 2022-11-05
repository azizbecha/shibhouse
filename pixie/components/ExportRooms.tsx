/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react"
import Link from "next/link";

import { collection, query, onSnapshot, orderBy, Query, DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { fireStore } from "../auth/Firebase";

import { FaUser, FaUsers } from 'react-icons/fa'
import { RiChat4Fill, RiChatOffFill } from "react-icons/ri";

const ExportRooms: React.FC = () => {

    const [data, setData] = useState([]);
    
    useEffect(() => {
        const q: Query<DocumentData> = query(collection(fireStore, "rooms"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
                const rooms = querySnapshot.docs
                .map((doc: QueryDocumentSnapshot<DocumentData>) => ({ ...doc.data(), id: doc.id }));
                setData(rooms);
            });
        });

    }, [])

    if (data.length < 1) {
        return (
            <div className="bg-dark p-5 rounded-lg">
                <img src="../images/musk-with-cybertruck-and-shiba.png" className="w-5/12 mx-auto" alt="" />
                <h1 className="text-center text-white font-medium">
                    There are no rooms actually
                </h1>
                <p className="text-center text-white font-normal text-sm mt-3 mb-3">
                    We did not find any running rooms actually, why not create your own room ?
                </p>
            </div>
        )
    } else {
        return (
            <ul role="list" id="roomsList">
                {
                    data.map((room, index: number) => {
                        const topics = room.topics;
                        return (
                            <li key={index} className="px-5 py-4 border-t-0 border-b-2 border-b-white bg-dark rounded-t-lg mb-5 shadow-lg">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-1 min-w-0">
                                        <Link href={`room/${room.id}`}>
                                            <span className="text-xg font-medium text-white mb-2 cursor-pointer">
                                                {room.title}
                                            </span>
                                        </Link>

                                        <p className="text-sm text-white mb-6">
                                            {room.description}
                                        </p>
                                        <p className="text-sm mb-4">
                                            {
                                                topics.map((topic, key: number) => {
                                                    return (
                                                        <span key={key} className="bg-darker text-white text-sm font-medium mr-2 px-2 py-1 rounded-lg">#{topic.text}</span>
                                                    )
                                                })
                                            }
                                        </p>
                                        <p className="text-sm text-white font-medium flex space-x-1 mb-1">
                                            {room.allowChat ? <RiChat4Fill size={18} className="my-auto mr-1 text-primary" /> : <RiChatOffFill className="my-auto mr-1 text-primary" /> } Chat {!room.allowChat && 'not'} allowed
                                        </p>
                                        <p className="text-sm text-white font-normal flex space-x-1">
                                            <FaUser size={18} className="my-auto mr-1 text-primary" /> With <Link href={`user/${room.createdBy}`}><span className="font-bold text-white text-sm cursor-pointer">@{room.createdBy}</span></Link>
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
        )
    }
    
}

export default ExportRooms