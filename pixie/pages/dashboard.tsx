import { useState, useRef, Fragment, useEffect } from "react"
import { NextPage } from "next"
import { NextRouter, useRouter } from "next/router"
import Link from "next/link"

import { Dialog, Transition } from '@headlessui/react'

import { collection, DocumentData, onSnapshot, orderBy, query, Query, where } from "firebase/firestore"
import { fireStore } from "../auth/Firebase"
import PrivateRoute from "../auth/PrivateRoute"
import { useAuth } from "../auth/AuthContext"

import axios from "axios"
import moment from 'moment';
import Switch from "react-switch"
import Hotkeys from 'react-hot-keys'
import toast from "react-hot-toast";
import { WithContext as ReactTags } from 'react-tag-input'
import { useMediaQuery } from "react-responsive"
import { Row, Col } from 'react-flexbox-grid/dist/react-flexbox-grid'

import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Divider from "../components/Divider"

import ExportRooms from "../components/ExportRooms"
import SEO from "../utils/SEO"

import { PeopleSidebar } from "../modules/dashboard/PeopleSidebar"
import { MyProfileSidebar } from "../modules/dashboard/MyProfileSidebar"

import { NewRoom, ScheduledRoomProps } from "../interfaces"
import createRoom from "../lib/createRoom"
import generateId from "../lib/generateId"
import { requestNotificationPermission } from "../lib/requestNotificationPermission"
import { scheduleRoom } from "../lib/scheduleRoom"

import isEmpty from 'validator/lib/isEmpty'
import isURL from 'validator/lib/isURL'

import { AiFillHome } from "react-icons/ai"
import { FaHome, FaCalendarAlt, FaCalendarPlus, FaUserPlus } from "react-icons/fa"
import { BsFillEmojiSunglassesFill } from "react-icons/bs"
import { joinPrivateRoom } from "../lib/joinPrivateRoom"

const Dashboard: NextPage = () => {

    const router: NextRouter = useRouter();
    const { currentUserData } = useAuth();
    const isTabletOrMobile: boolean = useMediaQuery({ maxWidth: 1224 });

    const [scheduledRooms, setScheduledRooms] = useState([]);
    const [joke, setJoke] = useState<{question: string, punchline: string}>({question: '', punchline: ''});

    const [roomTitle, setRoomTitle] = useState('');
    const [roomDescription, setRoomDescription] = useState('');
    const [roomPinnedLink, setRoomPinnedLink] = useState('');
    const [roomTopics, setRoomTopics] = useState<Array<{id: string, text: string}>>([]);
    const [roomVisibility, setRoomVisibility] = useState<string>("public");
    
    const [scheduledRoomTitle, setScheduledRoomTitle] = useState<string>('');
    const [scheduledRoomDate, setScheduledRoomDate] = useState<string>('');
    const [scheduledRoomTime, setScheduledRoomTime] = useState<string>('');

    const [showCreateRoomModal, setShowCreateRoomModal] = useState<boolean>(false);
    const [showScheduleRoomModal, setShowScheduleRoomModal] = useState<boolean>(false);
    const [allowChat, setAllowChat] = useState<boolean>(true);
    const cancelButtonRef = useRef(null);

    const [privateRoomID, setPrivateRoomID] = useState<string>("");

    const KeyCodes = {
        comma: 188,
        enter: 13,
        space: 32
    };

    // Delimiters to use when parsing tags
    const delimiters: number[] = [KeyCodes.comma, KeyCodes.enter, KeyCodes.space];

    const handleDelete = (i: number) => {
        setRoomTopics(roomTopics.filter((tag, index) => index !== i));
    };

    const handleAddition = (tag: {id: string, text: string}) => {
        roomTopics.length < 8 ? setRoomTopics([...roomTopics, tag]) : (
            toast.error("You can't add more than 8 tags")
        )
    };

    const handleDrag = (tag: {id: string, text: string}, currPos: number, newPos: number) => {
        const newTags = roomTopics.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        setRoomTopics(newTags);
    };

    const handleTagClick = (index: number) => {
        console.log('The tag at index ' + index + ' was clicked');
    };
    
    const createNewRoom = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const roomId: string = generateId(10);
        const data: NewRoom = {
            id: roomId,
            createdBy: currentUserData.username,
            title: roomTitle.trim(),
            description: roomDescription.trim(),
            pinnedLink: roomPinnedLink.trim(),
            topics: roomTopics,
            allowChat: allowChat,
            speakers: [currentUserData.username],
            isPublic: roomVisibility === "public"
        }
        
        if (!isEmpty(roomTitle.trim()) || !isEmpty(roomDescription.trim())) {
            if (!isEmpty(roomPinnedLink.trim())) {
                if (isURL(roomPinnedLink.trim())) {
                    try {
                        setShowCreateRoomModal(false);
                        await createRoom(data);
                        toast.success('Room created successfully');
        
                        router.push(`/room/${roomId}`);
                    } catch (e) {
                        console.log(e);
                        toast.error('An error has been occured');
                    }
                }
            } else {
                try {
                    setShowCreateRoomModal(false);
                    await createRoom(data);
                    toast.success('Room created successfully');
    
                    router.push(`/room/${roomId}`);
                } catch (e) {
                    console.log(e)
                    toast.error('An error has been occured');
                }
            }
        } else {
            toast.error('Please fill all the fields');
        }
    }

    const submitScheduledRoom = (e) => {

        e.preventDefault();
        const data: ScheduledRoomProps = {
            title: scheduledRoomTitle,
            date: scheduledRoomDate,
            time: scheduledRoomTime,
            createdBy: currentUserData.username
        }

        // Close modal
        setShowScheduleRoomModal(false);

        // Schedule Room
        scheduleRoom(data);

        // Empty inputs
        setScheduledRoomDate('');
        setScheduledRoomTime('');
        setScheduledRoomTitle('');
    }

    const randomJoke = () => {
        axios.get('https://backend-omega-seven.vercel.app/api/getjoke')
        .then(function (response) {
            setJoke(response.data[0])
        })
    }

    const fetchScheduledRooms = async () => {    
        const q: Query<DocumentData> = query(collection(fireStore, "scheduledRooms"), where('date', '>', new Date()), orderBy("date", "asc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const rooms = querySnapshot.docs
                .map((doc) => ({ ...doc.data(), id: doc.id }));
                setScheduledRooms(rooms);
            });
        });
    }

    useEffect(() => {
        fetchScheduledRooms();
        randomJoke();
        requestNotificationPermission();
    }, [])

    return (
        <>
            <SEO title="Dashboard | ShibHouse" description="Re-taking voice conversations to the moon"  />
            <PrivateRoute>
                
                <Hotkeys keyName="ctrl+y" onKeyDown={() => setShowCreateRoomModal(!showCreateRoomModal)}></Hotkeys>
                <Hotkeys keyName="ctrl+m" onKeyDown={() => router.push('/me')}></Hotkeys>

                <Navbar />
                <div className={`bg-dark text-white pb-5`}>
                    <div className="mx-auto" style={{width: '98%'}}>
                        <Row>
                            <Col xs={12} sm={3} md={2} lg={3}>
                                <PeopleSidebar />
                            </Col>
                            <Col xs={12} sm={3} md={10} lg={6}>
                                <main className="flex h-full flex-col w-full bg-darker overflow-x-hidden overflow-y-auto rounded-lg mb-14">
                                    
                                    {/* Start Create Room Modal */}
                                    <Transition.Root show={showCreateRoomModal} as={Fragment}>
                                        <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={setShowCreateRoomModal}>
                                            <Transition.Child
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                            >
                                                <div className="fixed inset-0 bg-opacity-75 transition-opacity bg-dark" />
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
                                                                    <input className="rounded-lg w-full py-2 px-2 text-white bg-dark mt-1 mb-4" placeholder="Please enter the room title here" value={roomTitle} onChange={(e) => {setRoomTitle(e.target.value)}} type="text" required />

                                                                    <span className="font-semibold">Description <span className="text-primary font-extrabold">*</span></span><br />
                                                                    <textarea className="rounded-lg w-full py-1 px-2 mb-2 text-white bg-dark mt-1" placeholder="Please enter the room description here" value={roomDescription} onChange={(e) => {setRoomDescription(e.target.value)}} required /><br />

                                                                    <span className="font-semibold">Topics</span><br />
                                                                    <div className="mb-3">
                                                                        <ReactTags
                                                                            tags={roomTopics}
                                                                            delimiters={delimiters}
                                                                            handleDelete={handleDelete}
                                                                            handleAddition={handleAddition}
                                                                            handleDrag={handleDrag}
                                                                            handleTagClick={handleTagClick}
                                                                            inputFieldPosition="bottom"
                                                                        />
                                                                    </div>
                                                                    
                                                                    <Row>
                                                                        <Col sm={6}>
                                                                            <label className="block text-base font-medium text-gray-900 dark:text-gray-400">Visibility <span className="text-primary font-extrabold">*</span></label>
                                                                            <select value={roomVisibility} onChange={e => setRoomVisibility(e.currentTarget.value)}  id="large" className="block mt-1 py-3 px-2 w-full text-base text-gray-900 bg-dark rounded-lg">
                                                                                <option selected value="public">Public</option>
                                                                                <option value="private">Private</option>
                                                                            </select>
                                                                        </Col>
                                                                        <Col sm={6}>
                                                                            <span className="font-semibold">Pinned link</span><br />
                                                                            <input className="rounded-lg w-full py-2 px-2 mb-4 text-white bg-dark mt-1" placeholder="Please enter the room pinned link here" value={roomPinnedLink} onChange={(e) => {setRoomPinnedLink(e.target.value)}} type="link" /><br />
                                                                        </Col>
                                                                    </Row>
                                                                    
                                                                    <div className="font-semibold flex space-x-2"><span>Allow chat:</span> <Switch onChange={setAllowChat} checked={allowChat} width={53} offColor='#151A21' onColor="#fa2f2f" /></div>
                                                                </div>
                                                                <div className="bg-gray-50 px-4 py-2 sm:px-6 sm:flex sm:flex-row-reverse">
                                                                    <button
                                                                        type="submit"
                                                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                                                    >
                                                                        Create
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        className="mt-3 w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-dark text-base font-medium text-white hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                                                        onClick={() => setShowCreateRoomModal(false)}
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
                                    {/* End Create Room Modal */}

                                    {/* Start Schedule Room Modal */}
                                    <Transition.Root show={showScheduleRoomModal} as={Fragment}>
                                        <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={setShowScheduleRoomModal}>
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
                                                        <form onSubmit={submitScheduledRoom}>
                                                                <div className="bg-darker px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                                                    <div className="sm:flex sm:items-start">
                                                                        <div className="m-auto bg-primary flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                                            <FaCalendarAlt size={20} className="text-white" aria-hidden="true" />
                                                                        </div>
                                                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                                            <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                                                                Schedule room
                                                                            </Dialog.Title>
                                                                            <div className="mt-1">
                                                                                <p className="text-sm text-white font-normal">
                                                                                    Pre-Inform your audience that you are going to give a speech
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <Divider />
                                                                    <span className="font-semibold">Room title <span className="text-primary font-extrabold">*</span></span><br />
                                                                    <input className="rounded w-full py-2 px-2 text-white bg-dark mt-1 mb-4" placeholder="Please enter the room title here" value={scheduledRoomTitle} onChange={(e) => setScheduledRoomTitle(e.target.value)} type="text" required />

                                                                    <Row>
                                                                        <Col sm={6}>
                                                                            <span className="font-semibold">Date <span className="text-primary font-extrabold">*</span></span><br />
                                                                            <input type="date" required value={scheduledRoomDate} onChange={(e) => setScheduledRoomDate(e.currentTarget.value)} className="bg-dark p-2 w-full rounded mt-1 text-white" />
                                                                        </Col>

                                                                        <Col sm={6}>
                                                                            <span className="font-semibold">Time <span className="text-primary font-extrabold">*</span></span><br />
                                                                            <input type="time" required value={scheduledRoomTime} onChange={(e) => setScheduledRoomTime(e.currentTarget.value)} className="bg-dark p-2 w-full rounded mt-1 text-white" />
                                                                        </Col>

                                                                    </Row>
                                                                </div>
                                                                <div className="bg-gray-50 px-4 pb-4 sm:px-6 sm:flex sm:flex-row-reverse">
                                                                    <button
                                                                        type="submit"
                                                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                                                    >
                                                                        Schedule
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        className="mt-3 w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-dark text-base font-medium text-white hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                                                        onClick={() => setShowScheduleRoomModal(false)}
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
                                    {/* End Schedule Room Modal */}
                                    
                                    <div className="flex w-full mx-auto px-4 pt-6 pb-8">
                                        <div className="flex flex-col w-full h-full text-gray-900 text-xl">
                                            <div className="flex space-x-45">
                                                <div className="flex space-x-20 w-full">
                                                    <div className="flex-1 min-w-0">
                                                        <h1 className="font-bold text-2xl font-inter">Feed</h1>
                                                    </div>
                                                    
                                                    <div className="inline-flex items-end text-base space-x-2">
                                                        <button onClick={() => setShowCreateRoomModal(true)} className="flex bg-primary px-4 py-2 rounded-md text-sm font-semibold text-white hover:bg-secondary hover:shadow" type="button"><AiFillHome className="my-auto mr-1" /> Create room</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <Divider />
                                            
                                            <Row className="flex">
                                                <Col sm={6} className="h-100">
                                                    <div className={`rounded-lg h-full bg-dark px-3 py-4 ${isTabletOrMobile && 'mb-2'}`}>
                                                        <div className="flex space-x-45 mb-3">
                                                            <div className="flex w-full">
                                                                <div className="flex-1 min-w-0">
                                                                    <h1 className="font-bold text-xl flex font-inter"><FaCalendarAlt size={20} className="mr-1 mt-1" /> Scheduled rooms</h1>
                                                                </div>
                                                                
                                                                <div className="inline-flex items-end text-base">
                                                                    <button onClick={() => setShowScheduleRoomModal(true)} className="flex bg-primary p-2 rounded-md text-sm font-semibold text-white hover:bg-primary hover:shadow" type="button"><FaCalendarPlus /></button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="h-40 overflow-auto">
                                                                {
                                                                    scheduledRooms.length == 0 ? (
                                                                        <div className="flex">
                                                                            <div className="mx-auto text-center">
                                                                                <img src="../images/shiba-sleeping.png" className="w-3/6 mt-1 mb-2 mx-auto" alt="" />
                                                                                <span className="text-xs font-medium mx-auto">There are no scheduled rooms at the moment</span>
                                                                            </div>
                                                                        </div>
                                                                    ) : (
                                                                        <ul className="list-disc ml-4">
                                                                            {
                                                                                scheduledRooms.map((room, key) => {
                                                                                    return (
                                                                                        <li className="text-sm font-medium mb-3" key={key}>
                                                                                            <span className="text-primary">{moment().month(new Date(room.day).getMonth()).format("MMM")}. {new Date(room.day).getDate().toString()} {room.time}</span><br />
                                                                                            <span className="text-sm">
                                                                                                {room.title}
                                                                                            </span> <br />
                                                                                            <span className="text-white font-normal text-xs">
                                                                                                By <Link href={`users/${room.createdBy}`}>
                                                                                                    <span className="cursor-pointer font-semibold">
                                                                                                        @{room.createdBy}
                                                                                                    </span>
                                                                                                </Link>
                                                                                            </span>
                                                                                        </li>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </ul>
                                                                    )
                                                                }
                                                        </div>
                                                    </div>
                                                </Col>

                                                <Col sm={6} className="h-100">
                                                    <div className={`rounded-lg bg-dark h-full px-3 py-4 ${isTabletOrMobile && 'mt-4'}`}>
                                                        <h1 className="font-bold text-lg flex font-inter mb-3"><BsFillEmojiSunglassesFill size={17} className="mr-2 my-auto" /> Random Programming Joke</h1>
                                                        
                                                        <ul className="list-disc ml-4">
                                                            <li className="font-medium text-base my-5">
                                                                Question: <span className="font-normal">{joke.question}</span>
                                                            </li>
                                                            <li className="font-medium text-base my-5">
                                                                Answer: <span className="font-normal">{joke.punchline}</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </Col>

                                            </Row>
                                            <Divider />
                                            
                                            <h1 className="font-bold text-xl flex font-inter mb-4"><FaHome size={20} className="mr-2 mt-1" /> Current rooms</h1>
                                            <form className="flex mb-2" onSubmit={(e) => {
                                                // Avoid refreshing the page
                                                e.preventDefault();

                                                // Passed router to the function to avoid re-initialization
                                                // which throws an error
                                                joinPrivateRoom(privateRoomID, router);
                                            }}>
                                                <div className="relative w-full">
                                                    <input type="search" value={privateRoomID} onChange={e => setPrivateRoomID(e.currentTarget.value)} className="block p-3 w-full z-20 text-sm bg-dark rounded-lg focus:outline-none" placeholder="Enter Room ID" required />
                                                    <button type="submit" className="absolute top-0 right-0 p-3 text-sm font-medium text-white bg-primary rounded-r-lg flex"><FaUserPlus className="my-auto mr-1" /> Join</button>
                                                </div>
                                            </form>
                                            <div className="relative text-gray-700 mb-2 border-0">
                                                <input type="search" id="roomSearchInput" className="w-full h-10 px-3 py-2 text-sm placeholder-gray-600 rounded-lg bg-dark focus:outline-none" placeholder="Search for a room on the moon 🚀"/>
                                            </div>
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
        </>
    )
}

export default Dashboard