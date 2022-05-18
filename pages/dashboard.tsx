import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import Link from "next/link";

import randomColor from 'randomcolor'

import { collection, query, getDocs } from "firebase/firestore";

import { fireStore } from "../auth/Firebase";
import generateId from "../lib/generateId"
import PrivateRoute from "../auth/PrivateRoute"

import getCurrentUserData from "../lib/getCurrentUserData"
import getUserData from "../lib/getUserData"
import createRoom from "../lib/createRoom"
import { logOut } from "../lib/signOut"

import { NewRoom } from "../interfaces"

import ExportRooms from "../components/ExportRooms"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

import Divider from "../components/Divider"
import { toast } from "react-toastify"

import { FaHome, FaCircle, FaSearch, FaSignOutAlt } from "react-icons/fa"

const Dashboard = () => {

    const router = useRouter();
    const [users, setUsers] = useState<any>([])

    const [showModal, setShowModal] = useState(false);

    const [userData, setUserData] = useState<any>({firstname: '', lastname: ''}) // adding default values to prevent showing undefined value error
    
    const roomTitleRef = useRef<any>();
    const roomDescriptionRef = useRef<any>();
    const roomPinnedLinkRef = useRef<any>();
    const roomTopicsRef = useRef<any>();
    
    useEffect(() => {
        const fetch = async () => {
            const user: any = await getCurrentUserData();
            setUserData(await getUserData(user.uid))
        }
        const getUsers = async () => {
            const q = query(collection(fireStore, "users"));

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const users = querySnapshot.docs
                .map((doc) => ({ ...doc.data(), id: doc.id }));
                setUsers(users);
            });
        }

        fetch();
        getUsers();
    }, [])

    const createNewRoom = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const roomId = generateId(10);
        const data: NewRoom = {
            id: roomId,
            createdBy: userData.username,
            title: roomTitleRef.current.value,
            description: roomDescriptionRef.current.value,
            pinnedLink: roomPinnedLinkRef.current.value,
            topics: roomTopicsRef.current.value,
            speakers: [userData.username]
        }
        
        if (roomTitleRef.current.value !== "" && roomDescriptionRef.current.value !== "" && roomTopicsRef.current.value !== "") {
            try {
                await createRoom(data);
                toast.success('Room created successfully', {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                router.push(`/room/${roomId}`)
            } catch (e) {
                toast.error('An error has been occured', {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
    }

    const myAvatarColor = randomColor({luminosity: 'dark'})

    return (
        <PrivateRoute>
            <Head>
                <title>Dashboard - Shibhouse</title>
            </Head>
            <div className="bg-dark text-white">
                {showModal ? (
                    <>
                        <div data-aos='zoom-in' className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    {/*header*/}
                                    <div className="flex items-start justify-between bg-gray p-5 border-b border-solid border-slate-200 rounded-t">
                                        <span className="text-2xl font-semibold">
                                            Create room
                                        </span>
                                    </div>
                                    {/*body*/}
                                    <form onSubmit={createNewRoom}>
                                        <div className="relative p-4 flex-auto bg-gray">
                                            <div className="my-4 text-slate-500 text-md leading-relaxed">
                                                <label htmlFor="">Room title <span className="text-primary font-bold">*</span></label><br />
                                                <input ref={roomTitleRef} type="text" className="w-8/12 rounded-sm mb-4 px-2 py-1 text-black" required /><br />

                                                <label htmlFor="">Room description <span className="text-primary font-bold">*</span></label><br />
                                                <textarea ref={roomDescriptionRef} className="w-8/12 rounded-sm px-2 py-1 mb-4 text-black" /><br />

                                                <label htmlFor="">Topics <span className="text-primary font-bold">*</span></label><br />
                                                <input ref={roomTopicsRef} type="text" className="w-8/12 rounded-sm mb-4 px-2 py-1 text-black" /><br />

                                                <label htmlFor="">Pinned link</label><br />
                                                <input ref={roomPinnedLinkRef} type="text" className="w-8/12 rounded-sm mb-4 px-2 py-1 text-black" /><br />

                                                <span className="mt-5">By creating a room, everyone on shibhouse can join, listen, chat and request to talk with you.</span>
                                            </div>
                                        </div>
                                        {/*footer*/}
                                        <div className="flex items-center justify-end bg-gray p-6 border-t border-solid border-slate-200 rounded-b">
                                            <button
                                                className="bg-dark font-bold px-6 py-3 rounded-lg text-sm mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => setShowModal(false)}
                                            >
                                                Close
                                            </button>
                                            <button
                                                className="bg-primary font-bold px-6 py-3 rounded-lg text-sm mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="submit"
                                            >
                                                Create
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null}
                <Navbar />
                    <div className="flex h-screen bg-dark">
                        <div className="w-full mx-5 flex align-center justify-center mb-10">
                            <div className="flex-1 flex flex-col overflow-hidden">
                                <div className="flex h-full">
                                    <nav className="hidden w-3/12 h-full bg-darker md:flex rounded-lg">
                                        <div className="flex mx-auto p-4 rounded-md container">
                                            
                                            <div className="w-full h-full py-4 items-start justify-left text-white text-xl rounded-md">
                                                <div className="flex space-x-45">
                                                    <div className="flex space-x-20 w-full">
                                                        <div className="flex-1 min-w-0">
                                                            <h1 className="font-bold text-2xl font-inter">People</h1>
                                                        </div>
                                                        <div className="inline-flex text-green items-end text-base">
                                                            <button className="bg-primary px-4 py-2 rounded-md text-sm text-white font-medium text-md">Discover</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Divider />
                                                <ul role="list" className="divide-y divide-gray-200">
                                                    <li className="py-3 sm:py-4 border-b">
                                                        <div className="flex items-center space-x-4">
                                                            <div className="p-4 text-white rounded-full" style={{backgroundColor: myAvatarColor}}>
                                                                {userData.firstname[0]}{userData.lastname[0]}
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                                    {userData.firstname} {userData.lastname}
                                                                </p>
                                                                <p className="text-sm text-white truncate dark:text-gray-400">
                                                                    @{userData.username}
                                                                </p>
                                                            </div>
                                                            <div className="inline-flex text-green items-center text-base">
                                                                <FaCircle className="text-green" />
                                                            </div>
                                                        </div>
                                                    </li>
                                                    {
                                                        users.map((user) => {
                                                            if (user.id != userData.id) {
                                                                return (
                                                                    <li className="py-3 sm:py-4 border-b" data-aos='fade-up'>
                                                                        <div className="flex items-center space-x-4">
                                                                            <div className="flex-shrink-0">
                                                                                <div className="p-4 text-white rounded-full" style={{backgroundColor: randomColor({luminosity: 'dark'})}}>
                                                                                    {user.firstname[0].toUpperCase()}{user.lastname[0].toUpperCase()}
                                                                                </div>
                                                                                {/*<img className="w-8 h-8 rounded-full" src="https://shibatoken.com/images/shib-logo.svg" alt="Shiba image" />*/}
                                                                            </div>
                                                                            <div className="flex-1 min-w-0">
                                                                                <Link href={`user/${user.username}`}>
                                                                                    <div className="cursor-pointer">
                                                                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                                                            {user.firstname} {user.lastname}
                                                                                        </p>
                                                                                        <p className="text-sm text-white cursor-pointer">@{user.username}</p>
                                                                                    </div>
                                                                                </Link>
                                                                            </div>
                                                                            <div className="inline-flex text-green items-center text-base">
                                                                                <FaCircle className="text-green" />
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
                                    <main className="flex flex-col md:w-6/12 sm:w-12/12 bg-darker overflow-x-hidden overflow-y-auto rounded-lg mb-14 mx-2">
                                        <div className="flex w-full mx-auto px-4 py-8">
                                            <div className="flex flex-col w-full h-full text-gray-900 text-xl">
                                                <div className="flex space-x-45">
                                                    <div className="flex space-x-20 w-full">
                                                        <div className="flex-1 min-w-0">
                                                            <h1 className="font-bold text-2xl font-inter">Feed</h1>
                                                        </div>
                                                        <div className="inline-flex items-end text-base">
                                                            <button onClick={() => setShowModal(true)} className="bg-primary px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-secondary hover:shadow" type="button">Create room</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Divider />
                                                <div className="relative text-gray-700 mb-5 border-0">
                                                    <input className="w-full h-10 pl-3 pr-8 text-base placeholder-gray-600 rounded-lg bg-dark" type="text" placeholder="Search for something on the moon 🚀"/>
                                                    <button className="absolute border border-dark inset-y-0 right-0 flex items-center px-4 font-bold text-white bg-primary rounded-r-lg">
                                                        <FaSearch size={15} />
                                                    </button>
                                                </div>
                                                <h1 className="font-bold text-xl flex font-inter mb-4"><FaHome size={20} className="mr-2 mt-1" /> Current rooms</h1>
                                                <ExportRooms />
                                            </div>
                                        </div>
                                    </main>
                                    <nav className="hidden w-3/12 h-full bg-darker md:flex rounded-lg">
                                        <div className="flex mx-auto p-4 rounded-md container">
                                            
                                            <div className="w-full h-full py-4 items-start justify-left text-white text-xl rounded-md">
                                                <div className="flex space-x-45">
                                                    <div className="flex space-x-20 w-full">
                                                        <div className="flex-1 min-w-0">
                                                            <h1 className="font-bold text-2xl font-inter">My profile</h1>
                                                        </div>
                                                        <div className="inline-flex text-green items-end text-base">
                                                            <button className="bg-primary px-4 py-2 rounded-md text-sm font-medium text-white text-md">Settings</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Divider />
                                                <div className="max-w-sm bg-gray rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                                                    <div className="flex justify-end px-4 pt-4">
                                                        <button onClick={logOut} className="hidden sm:inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
                                                            <FaSignOutAlt />
                                                        </button>
                                                        
                                                    </div>
                                                    <div className="flex flex-col container pb-10">
                                                        <div className="p-6 text-white text-2xl rounded-full mb-3 shadow-lg mx-auto" style={{backgroundColor: myAvatarColor}}>
                                                            {userData.firstname[0]}{userData.lastname[0]}
                                                        </div>
                                                        <h5 className="mb-1 text-lg font-medium text-center">{userData.firstname} {userData.lastname}</h5>
                                                        <span className="text-sm text-white text-center">@{userData.username}</span>
                                                        <span className="text-sm text-gray-500 dark:text-gray-400 mt-3">A dummy text to see user bio preview bla bla bla some talking goes here.</span>
                                                        <div className="flex space-x-3 mt-3">
                                                            <span className="flex justify-left text-sm font-bold text-white">{userData.followers}&nbsp;<span className="font-normal">followers</span></span>
                                                            <span className="flex justify-left text-sm font-bold text-white">{userData.following}&nbsp;<span className="font-normal">following</span></span>
                                                            <span className="flex justify-left text-sm font-bold text-white">{userData.claps}&nbsp;<span className="font-normal">claps</span></span>
                                                        </div>
                                                        <div className="flex mt-4 space-x-3 lg:mt-6">
                                                            <a href="#" className="flex justify-left py-2 px-4 text-sm font-medium text-white bg-primary rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit profile</a>
                                                            {/*<a href="#" className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-primary rounded-lg  hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Message</a>*/}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                <Footer />
            </div>
        </PrivateRoute>
    )
}

export default Dashboard