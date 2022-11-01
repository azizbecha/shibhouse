import { Fragment, useEffect, useState } from "react"
import Link from "next/link"

import { collection, DocumentData, getDocs, limit, orderBy, Query, query, QueryDocumentSnapshot, QuerySnapshot } from "firebase/firestore"
import { useAuth } from "../../auth/AuthContext"
import { fireStore } from "../../auth/Firebase"

import $ from 'jquery'
import { useMediaQuery } from "react-responsive"
import { capitalizeWord } from "../../lib/capitalize"

import Divider from "../../components/Divider"

import { FaCompass } from "react-icons/fa"

const PeopleSidebar: React.FC = () => {

    const [users, setUsers] = useState<any>([]);
    const { currentUserData } = useAuth();

    const getUsers = async () => {
        const q: Query<DocumentData> = query(collection(fireStore, "users"), limit(10), orderBy("joinDate", "desc"));

        const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
        querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
            const users = querySnapshot.docs
            .map((doc: QueryDocumentSnapshot<DocumentData>) => ({ ...doc.data(), id: doc.id }));
            setUsers(users);
        });
    }

    useEffect(() => {
        getUsers();
    }, [])

    const isTabletOrMobile: boolean = useMediaQuery({ maxWidth: 1224 });

    return (
        <Fragment>
            <nav className="w-full h-full bg-darker md:block rounded-lg hidden">
                <div className="flex mx-auto p-4 rounded-md container">
                    <div className="w-full py-2 items-start justify-left text-white text-xl rounded-md ">
                        <div className={`${isTabletOrMobile && 'hidden'}`}>
                            <div className="flex space-x-20 w-full">
                                <div className="flex-1 min-w-0">
                                    <h1 className="font-bold text-2xl font-inter">People</h1>
                                </div>
                                <div className="inline-flex items-end text-base">
                                    <Link href="/people">
                                        <button className="flex bg-primary px-4 py-2 rounded-md text-sm text-white font-semibold"><FaCompass className="my-auto mr-1" /> Discover</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <ul role="list" id="usersList" className="overflow-auto mt-5">
                            {
                                users.map((user, key) => {
                                    if (user.id != currentUserData.id) {
                                        return (
                                            <li className={`py-4 ${!isTabletOrMobile && 'border-t'} mx-auto`} key={key}>
                                                <div className="flex items-center space-x-4">
                                                    <Link href={`user/${user.username}`}>
                                                        <div className="flex-shrink-0 cursor-pointer">
                                                            <div className="p-4 text-white rounded-full font-bold" style={{backgroundColor: user.avatarColor}}>
                                                                {user.firstname[0].toUpperCase()}{user.lastname[0].toUpperCase()}
                                                            </div>
                                                        </div>
                                                    </Link>
                                                        
                                                    <div className={`${isTabletOrMobile ? 'hidden' : 'flex-1 min-w-0'}`}>
                                                        <Link href={`user/${user.username}`}>
                                                            <div className="cursor-pointer">
                                                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                                    {capitalizeWord(user.firstname)} {capitalizeWord(user.lastname)}
                                                                </p>
                                                                <p className="text-sm font-medium text-white cursor-pointer">@{user.username}</p>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    }
                                })
                            }
                        </ul>
                        <Link href={'people'}>
                            <button className="bg-primary w-full text-sm font-medium px-4 py-1 mt-2 rounded-md">See more</button>
                        </Link>
                    </div>
                </div>
            </nav>
        </Fragment>
    )
}

export { PeopleSidebar }