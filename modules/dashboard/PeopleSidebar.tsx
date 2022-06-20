import { collection, getDocs, limit, query } from "firebase/firestore"
import Link from "next/link"
import { Fragment, useEffect, useState } from "react"
import { useAuth } from "../../auth/AuthContext"
import { fireStore } from "../../auth/Firebase"
import { capitalizeWord } from "../../lib/capitalize"
import Divider from "../../components/Divider"
import $ from 'jquery'
import { useMediaQuery } from "react-responsive"
import { FaCompass } from "react-icons/fa"

const PeopleSidebar = () => {

    const [users, setUsers] = useState<any>([]);
    const { currentUserData } = useAuth();

    const getUsers = async () => {
        const q = query(collection(fireStore, "users"), limit(10));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const users = querySnapshot.docs
            .map((doc) => ({ ...doc.data(), id: doc.id }));
            setUsers(users);
        });
    }

    useEffect(() => {
        getUsers();
        
        $(document).ready(() => {
            $("#userSearchInput").on("keyup", function() {
                var value = $(this).val().toLowerCase();
                $("ul#usersList li").filter(function() {
                    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                });
            });
        })
    }, [])

    const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 });

    return (
        <Fragment>
            <nav className="w-full h-full bg-darker md:block rounded-lg hidden">
                <div className="flex mx-auto p-4 rounded-md container">
                    <div className="w-full py-4 items-start justify-left text-white text-xl rounded-md ">
                        <div className={`${isTabletOrMobile && 'hidden'}`}>
                            <div className="flex space-x-20 w-full">
                                <div className="flex-1 min-w-0">
                                    <h1 className="font-bold text-2xl font-inter">People</h1>
                                </div>
                                <div className="inline-flex items-end text-base">
                                    <button className="flex bg-primary px-4 py-2 rounded-md text-sm text-white font-semibold"><FaCompass className="my-auto mr-1" /> Discover</button>
                                </div>
                            </div>
                            <Divider />
                            <div className="relative text-gray-700 border-0 mb-5">
                                <input id="userSearchInput" className="w-full h-10 px-3 py-2 text-base placeholder-gray-600 rounded-lg bg-dark" type="search" placeholder="Search for a user on the moon 🚀"/>
                            </div>
                        </div>
                        <ul role="list" id="usersList" className="overflow-auto">
                            {
                                users.map((user, key) => {
                                    if (user.id != currentUserData.id) {
                                        return (
                                            <li className={`py-4 ${!isTabletOrMobile && 'border-t'} mx-auto`} key={key}>
                                                <div className="flex items-center space-x-4">
                                                    <Link href={`user/${user.username}`}>
                                                        <div className="flex-shrink-0 cursor-pointer">
                                                            <div className="p-4 text-white rounded-full" style={{backgroundColor: user.avatarColor}}>
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
                                                                <p className="text-sm text-white cursor-pointer">@{user.username}</p>
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
                    </div>
                </div>
            </nav>
        </Fragment>
    )
}

export { PeopleSidebar }