import { useState, useRef, Fragment } from "react"
import { NextRouter, useRouter } from "next/router"

import { Dialog, Transition } from '@headlessui/react'

import PrivateRoute from "../auth/PrivateRoute"
import { useAuth } from "../auth/AuthContext"

import Switch from "react-switch"
import Hotkeys from 'react-hot-keys'
import { Ticker } from "react-ts-tradingview-widgets"
import { toast } from "react-toastify"
import { useMediaQuery } from "react-responsive"
import { Row, Col } from 'react-flexbox-grid/dist/react-flexbox-grid'

import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Divider from "../components/Divider"

import ExportRooms from "../components/ExportRooms"
import SEO from "../utils/SEO"

import { PeopleSidebar } from "../modules/dashboard/PeopleSidebar"
import { MyProfileSidebar } from "../modules/dashboard/MyProfileSidebar"

import { NewRoom } from "../interfaces"
import createRoom from "../lib/createRoom"
import generateId from "../lib/generateId"

import isEmpty from 'validator/lib/isEmpty'
import isURL from 'validator/lib/isURL'

import { AiFillHome } from "react-icons/ai"
import { FaDollarSign, FaHome } from "react-icons/fa"

const Dashboard: React.FC = () => {

    const router: NextRouter = useRouter();
    const { currentUserData } = useAuth();
    const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 });

    const [showModal, setShowModal] = useState<boolean>(false);
    const [allowChat, setAllowChat] = useState<boolean>(true);
    const cancelButtonRef = useRef(null);

    // const roomTitleRef = useRef<HTMLInputElement>();
    // const roomDescriptionRef = useRef<HTMLTextAreaElement>();
    // const roomPinnedLinkRef = useRef<HTMLInputElement>();
    // const roomTopicsRef = useRef<HTMLInputElement>();
    const [roomTitle, setRoomTitle] = useState('');
    const [roomDescription, setRoomDescription] = useState('');
    const [roomPinnedLink, setRoomPinnedLink] = useState('');
    const [roomTopics, setRoomTopics] = useState('');

    const createNewRoom = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const roomId = generateId(10);
        const data: NewRoom = {
            id: roomId,
            createdBy: currentUserData.username,
            title: roomTitle.trim(),
            description: roomDescription.trim(),
            pinnedLink: roomPinnedLink.trim(),
            topics: roomTopics.trim(),
            allowChat: allowChat,
            speakers: [currentUserData.username]
        }
        
        if (!isEmpty(roomTitle.trim()) && !isEmpty(roomDescription.trim()) && !isEmpty(roomTopics.trim())) {
            if (!isEmpty(roomPinnedLink.trim())) {
                if (isURL(roomPinnedLink.trim())) {
                    try {
                        setShowModal(false);
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
        
                        router.push(`/room/${roomId}`);
                    } catch (e) {
                        console.log(e);
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
            } else {
                try {
                    setShowModal(false);
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
    
                    router.push(`/room/${roomId}`);
                } catch (e) {
                    console.log(e)
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
        } else {
            toast.warning('Please fill all the fields', {
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

    return (
        <PrivateRoute>
            <SEO title="Dashboard - Shibhouse" description="Re-taking voice conversations to the moon"  />
            <Hotkeys 
                keyName="ctrl+y" 
                onKeyDown={() => setShowModal(!showModal)}
            ></Hotkeys>
            <Hotkeys 
                keyName="ctrl+m" 
                onKeyDown={() => router.push('/me')}
            ></Hotkeys>
            <div className={`bg-dark text-white ${isTabletOrMobile && 'h-screen'} pb-5`}>
                <Navbar />
                <div className="mx-auto" style={{width: '98%'}}>
                    <Row>
                        <Col xs={12} sm={3} md={2} lg={3}>
                            <PeopleSidebar />
                        </Col>
                        <Col xs={12} sm={3} md={10} lg={6}>
                            <main className="flex flex-col w-full bg-darker overflow-x-hidden overflow-y-auto rounded-lg mb-14">
                                <Transition.Root show={showModal} as={Fragment}>
                                    <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={setShowModal}>
                                        <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                        >
                                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity bg-dark" />
                                        </Transition.Child>

                                        <div className="fixed z-10 inset-0 overflow-y-auto m-auto">
                                            <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0 text-white">
                                                <Transition.Child
                                                as={Fragment}
                                                enter="ease-out duration-300"
                                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                                leave="ease-in duration-200"
                                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                                >
                                                    <Dialog.Panel className="relative bg-darker rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                                                    <form onSubmit={createNewRoom}>
                                                            <div className="bg-darker px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                                                <div className="sm:flex sm:items-start">
                                                                    <div className="m-auto bg-primary flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                                        <AiFillHome className="h-6 w-6 text-white" aria-hidden="true" />
                                                                    </div>
                                                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                                                            Create room
                                                                        </Dialog.Title>
                                                                        <div className="mt-2">
                                                                            <p className="text-sm text-white font-normal">
                                                                                By creating a room, everyone in Shibhouse can join, chat and listen to the speakers.
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <Divider />
                                                                <span className="font-semibold">Room title <span className="text-primary font-extrabold">*</span></span><br />
                                                                <input className="rounded w-full py-2 px-2 text-white bg-dark mt-1 mb-4" placeholder="Please enter the room title here" value={roomTitle} onChange={(e) => {setRoomTitle(e.target.value)}} type="text" required />

                                                                <span className="font-semibold">Description <span className="text-primary font-extrabold">*</span></span><br />
                                                                <textarea className="rounded w-full py-1 px-2 mb-4 text-white bg-dark mt-1" placeholder="Please enter the room description here" value={roomDescription} onChange={(e) => {setRoomDescription(e.target.value)}} required /><br />

                                                                <span className="font-semibold">Topics <span className="text-primary font-extrabold">*</span></span><br />
                                                                <input className="rounded w-full py-2 px-2 mb-4 text-white bg-dark mt-1" placeholder="Please enter the room topics here (splitted by space)" type="text" value={roomTopics} onChange={(e) => {setRoomTopics(e.target.value)}} required /><br />
                                                                
                                                                <span className="font-semibold">Pinned link (optional)</span><br />
                                                                <input className="rounded w-full py-2 px-2 mb-4 text-white bg-dark mt-1" placeholder="Please enter the room pinned link here" value={roomPinnedLink} onChange={(e) => {setRoomPinnedLink(e.target.value)}} type="link" /><br />
                                                                
                                                                <div className="font-semibold flex space-x-2"><span>Allow chat:</span> <Switch onChange={setAllowChat} checked={allowChat} width={53} offColor='#151A21' onColor="#fa2f2f" /> </div>
                                                            </div>
                                                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                                                <button
                                                                    type="submit"
                                                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                                                >
                                                                    Create
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="mt-3 w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-dark text-base font-medium text-white hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                                                    onClick={() => setShowModal(false)}
                                                                    ref={cancelButtonRef}
                                                                >
                                                                    Cancel
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </Dialog.Panel>
                                                </Transition.Child>
                                            </div>
                                        </div>
                                    </Dialog>
                                </Transition.Root>
                                <div className="flex w-full mx-auto px-4 pt-8 pb-8">
                                    <div className="flex flex-col w-full h-full text-gray-900 text-xl">
                                        <div className="flex space-x-45">
                                            <div className="flex space-x-20 w-full">
                                                <div className="flex-1 min-w-0">
                                                    <h1 className="font-bold text-2xl font-inter">Feed</h1>
                                                </div>
                                                <div className="inline-flex items-end text-base">
                                                    <button onClick={() => setShowModal(true)} className="flex bg-primary px-4 py-2 rounded-md text-sm font-semibold text-white hover:bg-secondary hover:shadow" type="button"><AiFillHome className="my-auto mr-1" /> Create room</button>
                                                </div>
                                            </div>
                                        </div>
                                        <Divider />
                                        <div className="relative text-gray-700 mb-5 border-0">
                                            <input type="search" id="roomSearchInput" className="w-full h-10 px-3 py-2 text-base placeholder-gray-600 rounded-lg bg-dark" placeholder="Search for a room on the moon 🚀"/>
                                        </div>
                                        <h1 className="font-bold text-xl flex font-inter mb-4"><FaDollarSign size={20} className="mr-1 mt-1" /> Crypto prices</h1>
                                        <div className="bg-dark p-4 rounded-lg mb-5">
                                            <Ticker isTransparent={true} locale={"en"} symbols={[
                                                {
                                                    "proName": "BINANCE:SHIBUSDT",
                                                    "title": "SHIB/USDT"
                                                },
                                                {
                                                    "proName": "BINANCE:BTCUSDT",
                                                    "title": "BTC/USDT"
                                                }
                                            ]} colorTheme="dark"></Ticker>
                                        </div>
                                        <h1 className="font-bold text-xl flex font-inter mb-4"><FaHome size={20} className="mr-2 mt-1" /> Current rooms</h1>
                                        <ExportRooms />
                                    </div>
                                </div>
                            </main>
                        </Col>
                        <Col xs={12} sm={3} md={2} lg={3}>
                            <MyProfileSidebar />
                        </Col>
                    </Row>
                </div>
            </div>
            <Footer />
        </PrivateRoute>
    )
}

export default Dashboard