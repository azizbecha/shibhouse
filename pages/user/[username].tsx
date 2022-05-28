import React, { useContext, useEffect, useState } from "react"
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { query, collection, limit, where, getDocs, orderBy, onSnapshot, doc, updateDoc } from "firebase/firestore";

import { AuthContext } from "../../auth/AuthContext";
import { fireStore } from "../../auth/Firebase";

import { toast } from "react-toastify";
import ReactTimeAgo from "react-time-ago";

import randomColor from 'randomcolor';
import { removeItem } from "../../lib/removeItemFromArray";

import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

import { FaArrowLeft } from "react-icons/fa";
import { capitalizeWord } from "../../lib/capitalize";

const User: React.FC = () => {

    const router = useRouter();
    
    const [userData, setUserData] = useState<any>({firstname: ' ', lastname: ' ', followers: [], following: []}) // adding default values to prevent showing undefined value error
    const [users, setUsers] = useState<any>([]);
    const [rooms, setRooms] = useState([]);

    const { username } = router.query;
    const { currentUserData } = useContext(AuthContext);

    const fetch = async () => {
        const q = query(collection(fireStore, "users"), where("username", "==", username), limit(1));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setUserData(doc.data())
            if (userData.username == currentUserData.username) {
                //router.push('/me'); // Redirect the user to his profile
            }
        });
    }

    const Unfollow = async () => {
        try {
            const followersRef = doc(fireStore, "users", userData.id);
            await updateDoc(followersRef, {
                followers: removeItem(userData.followers, currentUserData.username)
            });

            const followersRef2 = doc(fireStore, "users", currentUserData.id);
            await updateDoc(followersRef2, {
                following: removeItem(userData.followers, currentUserData.username)
            });
            
            fetch();

            toast.success(`Unfollowed ${userData.username}`, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        } catch (e) {
            toast.error(`An error has been occured`, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    const Follow = async () => {
        try {
            var followersArray = userData.followers
            followersArray.push(currentUserData.username)

            const followersRef = doc(fireStore, "users", userData.id);

            await updateDoc(followersRef, {
                followers: followersArray
            });

            const followersRef2 = doc(fireStore, "users", currentUserData.id);

            await updateDoc(followersRef2, {
                following: followersArray
            });

            fetch();

            toast.success(`Followed ${userData.username}`, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (e) {
            toast.error(`An error has been occured`, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    useEffect(() => {
        
        const getUsers = async () => {
            const q = query(collection(fireStore, "users"), limit(3), where('username', '!=', username));

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const users = querySnapshot.docs
                .map((doc) => ({ ...doc.data(), id: doc.id }));
                setUsers(users);
            });
        }

        const getRooms = async () => {
            const q = query(collection(fireStore, "rooms"), orderBy("createdAt", "desc"));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const rooms = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                    setRooms(rooms);
                });
            });
        }

        getUsers()
        getRooms()
        fetch()
    }, [username])

    return (
        <div className="h-screen">
            <Navbar />
            <Head>
                <title>{capitalizeWord(userData.firstname)} {capitalizeWord(userData.lastname)} (@{userData.username}) - Shibhouse</title>
            </Head>
            <div className="bg-dark pb-16">
                <div className="container">
                    <h1 className="pt-10 text-3xl text-white font-bold font-inter flex"><FaArrowLeft onClick={() => router.push('/dashboard')} size={26} className="mt-1 mr-2 cursor-pointer" /> Profile of {userData.firstname} {userData.lastname}</h1>
                    <div className="bg-dark flex space-x-3 pt-10">
                        
                        <div className="sm:w-12/12 xs:w-12/12 md:w-8/12 pb-32 xs:mx-auto">
                            <div className="w-full mt-10">
                                <div className="absolute -mt-14 ml-5">
                                    <div className="flex h-28 w-28 rounded-full border-primary border-4 shadow-md text-white text-center font-semibold" style={{backgroundColor: randomColor({luminosity: 'dark'})}}>
                                        <span className="my-auto mx-auto text-3xl font-inter font-bold">{userData.firstname[0].toUpperCase()}{userData.lastname[0].toUpperCase()}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-darker text-white rounded-lg pt-16 pb-12 px-8 flex flex-col">
                                <div className="mb-1 font-semibold text-2xl">{capitalizeWord(userData.firstname)} {capitalizeWord(userData.lastname)} <span className="text-lg">(@{userData.username})</span></div>
                                {/*<div className="mb-1 font-normal text-md">Joined <ReactTimeAgo date={new Date(userData.joinDate).getMilliseconds()} /></div>*/}
                                <div className="text-sm mt-2 text-gray-200">
                                    <div className="flex flex-row ml-auto space-x-3 items-center">
                                        <div className="mb-1 h-5 font-bold">{userData.followers.length} <span className="font-normal">Follower{userData.followers.length == 1 ? null : 's'}</span></div>
                                        <div className="mb-1 h-5 font-bold">{userData.following.length} <span className="font-normal">Following</span></div>
                                        <div className="mb-1 h-5 font-bold ml-2">{userData.claps} <span className="font-normal">Claps</span></div>
                                    </div>

                                    <div className="mb-3 mt-2 font-semibold text-md w-10/12">
                                        {userData.following.includes(currentUserData.username) && 'Follows you'}
                                    </div>

                                    <div className="mb-3 mt-5 font-normal text-md w-10/12">
                                        {userData.bio}
                                    </div>
                                </div>

                                <div className="text-sm mt-2 text-gray-200">
                                    <div className="flex flex-row ml-auto space-x-6 items-center">
                                        <div className="mb-1 h-5 w-20">{userData.followers.includes(currentUserData.username) ? <button onClick={Unfollow} className="bg-primary px-6 py-2 rounded-md font-semibold">Unfollow</button> : <button onClick={Follow} className="bg-primary px-6 py-2 rounded-md font-semibold">Follow</button>}</div>
                                        <div className="mb-1 h-5 w-20"><button className="bg-primary px-6 py-2 ml-3 rounded-md font-semibold">Block</button></div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="w-4/12 bg-darker rounded-lg mt-10">
                            <div className="container p-5">
                                <h1 className="text-white text-2xl font-inter font-bold">Discover</h1>
                                <ul role="list" className="divide-y divide-gray-200 overflow-auto no-scrollbar mt-3 space-y-2">
                                    {
                                        users.map((user) => {
                                            return (
                                                <Link href={user.username} passHref>
                                                    <li className="py-3 sm:py-4 rounded-lg bg-dark cursor-pointer">
                                                        <div className="flex items-center space-x-4 px-3">
                                                            <div className="p-4 text-white rounded-full" style={{backgroundColor: randomColor({luminosity: 'dark'})}}>
                                                                {user.firstname[0].toUpperCase()}{user.lastname[0].toUpperCase()}
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-sm font-medium text-gray-900 truncate text-white">
                                                                    {capitalizeWord(user.firstname)} {capitalizeWord(user.lastname)}
                                                                </p>
                                                                <p className="text-sm text-white truncate dark:text-gray-400">
                                                                    @{user.username}
                                                                </p>
                                                            </div>
                                                            <div className="inline-flex text-green items-center text-base">
                                                                {/*<FaCircle className="text-green" />*/}
                                                            </div>
                                                        </div>
                                                    </li>
                                                </Link>
                                            )
                                        })
                                    }
                                    
                                </ul>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    ) 
}

export default User