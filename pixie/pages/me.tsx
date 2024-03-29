import React, { Fragment, useContext, useEffect, useRef, useState } from "react"
import { NextPage } from "next";
import { NextRouter, useRouter } from "next/router";
import Link from "next/link";

import { doc, updateDoc, query, collection, where, getDocs, limit, QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { getAuth, sendPasswordResetEmail, updateEmail } from "firebase/auth";

import { AuthContext } from "../auth/AuthContext";
import { auth, fireStore } from "../auth/Firebase";
import PrivateRoute from "../auth/PrivateRoute";

import toast from "react-hot-toast";
import { Dialog, Transition } from "@headlessui/react";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { HexColorPicker } from "react-colorful";
import { Row, Col } from 'react-flexbox-grid/dist/react-flexbox-grid'

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Divider from "../components/Divider";

import { FaArrowLeft, FaLink, FaPen, FaSave } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";

import isEmail from "validator/lib/isEmail";
import { capitalizeWord } from "../lib/capitalize";
import { numberFormatter } from "../lib/numberFormatter";

import SEO from "../utils/SEO";

const Me: NextPage = () => {

    const router: NextRouter = useRouter();    
    const { currentUserData } = useContext(AuthContext);
    
    const [firstname, setFirstname] = useState<string>(currentUserData.firstname);
    const [lastname, setLastname] = useState<string>(currentUserData.lastname);
    const [email, setEmail] = useState<string>(currentUserData.email);
    const [bio, setBio] = useState<string>(currentUserData.bio);
    const [avatarColor, setAvatarColor] = useState<string>(currentUserData.avatarColor);

    const [isDisabled, setIsDisabled] = useState<boolean>(true);

    const [users, setUsers] = useState([]);

    const [showFollowersModal, setShowFollowersModal] = useState(false);
    const [showFollowingModal, setShowFollowingModal] = useState(false);
    const cancelButtonRef = useRef(null);
    
    useEffect(() => {
        const getUsers = async () => {
            const q = query(collection(fireStore, "users"), limit(10), where('username', '!=', currentUserData.username));
    
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const users = querySnapshot.docs
                .map((doc: QueryDocumentSnapshot<DocumentData>) => ({ ...doc.data(), id: doc.id }));
                setUsers(users);
            });
        }
        setFirstname(currentUserData.firstname);
        setLastname(currentUserData.lastname);
        setEmail(currentUserData.email);
        setBio(currentUserData.bio);
        setAvatarColor(currentUserData.avatarColor);
        getUsers();

    }, [currentUserData.avatarColor, currentUserData.bio, currentUserData.email, currentUserData.firstname, currentUserData.lastname, currentUserData.username])

    useEffect(() => {
        if (firstname !== currentUserData.firstname || lastname !== currentUserData.lastname || email !== currentUserData.email || bio !== currentUserData.bio || avatarColor !== currentUserData.avatarColor) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [firstname, lastname, email, bio, avatarColor, currentUserData.firstname, currentUserData.lastname, currentUserData.email, currentUserData.bio, currentUserData.avatarColor])


    const updateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (firstname !== currentUserData.firstname || lastname !== currentUserData.lastname || email !== currentUserData.email || bio !== currentUserData.bio || avatarColor !== currentUserData.avatarColor) {

            // If something has changed
            const userRef = doc(fireStore, "users", currentUserData.id);
            await updateDoc(userRef, {
                firstname: firstname,
                lastname: lastname,
                email: email,
                bio: bio,
                avatarColor: avatarColor
            });

            setFirstname(currentUserData.firstname);
            setLastname(currentUserData.lastname);
            setEmail(currentUserData.email);
            setBio(currentUserData.bio);
            setAvatarColor(currentUserData.avatarColor);

            toast.success('Profile updated successfully');
            
            if (email !== currentUserData.email) {

                // If email has changed, check if it's valid then update it
                if (isEmail(email)) {
                    const auth = getAuth();

                    updateEmail(auth.currentUser, email).then(() => {
                        toast.success('Email updated successfully');
                        router.push('/');
                    }).catch((error) => {
                        console.log(error);
                        toast.error('An error has been occured');
                    });
                } else {
                    toast.error('Please enter a valid email');
                }
            }
            router.push('/');
        }
    }

    const resetPassword = () => {
        sendPasswordResetEmail(auth, currentUserData.email)
        .then(() => {
            toast.success("Password reset link sent to your mail");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            console.log(errorMessage);
            
            toast.error("An error has been occured");
        });
    }

    return (
        <PrivateRoute>

            {/* Start followers modal */}
            <Transition.Root show={showFollowersModal} as={Fragment}>
                <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={setShowFollowersModal}>
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
                                    <div className="sm:items-start bg-darker px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                        <h1 className="text-white font-bold text-2xl">Followers ({currentUserData.followers.length})</h1>
                                                <Divider />

                                        <Row>
                                            <div className="h-48 overflow-y-auto w-full">
                                                {
                                                    currentUserData.followers.map((follower, key) => {
                                                        console.log(follower);
                                                        return (
                                                            <Col sm={12} key={key}>
                                                                <Link href={`../user/${follower}`}>
                                                                    <div className="bg-dark cursor-pointer rounded-lg text-white px-2 py-2 mb-2 font-semibold">
                                                                        @{follower}
                                                                    </div>
                                                                </Link>
                                                            </Col>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </Row>
                                    </div>
                                    <div className="bg-gray-50 pb-2 sm:px-6 sm:flex sm:flex-row-reverse">
                                        <button
                                            type="button"
                                            className="mt-3 mb-3 w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={() => setShowFollowersModal(false)}
                                            ref={cancelButtonRef}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
            {/* End followers modal */}

            {/* Start followers modal */}
            <Transition.Root show={showFollowingModal} as={Fragment}>
                <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={setShowFollowingModal}>
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
                                    <div className="sm:items-start bg-darker px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                        <h1 className="text-white font-bold text-2xl">Following ({currentUserData.following.length})</h1>
                                        <Divider />

                                        <Row>
                                            <div className="h-48 overflow-y-auto w-full">
                                                {
                                                    currentUserData.following.map((follower, key) => {
                                                        console.log(follower);
                                                        return (
                                                            <Col sm={12} key={key}>
                                                                <Link href={`../user/${follower}`}>
                                                                    <div className="bg-dark cursor-pointer rounded-lg text-white px-2 py-2 mb-2 font-semibold">
                                                                        @{follower}
                                                                    </div>
                                                                </Link>
                                                            </Col>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </Row>
                                    </div>
                                    <div className="bg-gray-50 pb-2 sm:px-6 sm:flex sm:flex-row-reverse">
                                        <button
                                            type="button"
                                            className="mt-3 mb-3 w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={() => setShowFollowingModal(false)}
                                            ref={cancelButtonRef}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
            {/* End followers modal */}

            <div className="h-screen">
                <Navbar />
                <SEO title={`${capitalizeWord(currentUserData.firstname)} ${capitalizeWord(currentUserData.lastname)} (@${currentUserData.username}) | Shibhouse`} description="My profile in Shibhouse.tv"  />
                <div className="bg-dark pb-16">
                    <div className="container">
                        <h1 className="pt-10 text-3xl text-white font-bold font-inter flex mb-3"><FaArrowLeft onClick={() => router.push('/dashboard')} size={26} className="mt-1 mr-2 cursor-pointer" /> My profile</h1>
                        <div className="bg-dark flex space-x-3 pt-10">
                            <div className="sm:w-12/12 xs:w-12/12 md:w-8/12 pb-32 xs:mx-auto">
                                <div className="w-full mt-10">
                                    <div className="absolute -mt-14 ml-5">
                                        <div className="flex h-28 w-28 rounded-full shadow-md text-white text-center font-semibold" style={{backgroundColor: avatarColor}}>
                                            <span className="my-auto mx-auto text-3xl font-inter font-bold">{currentUserData.firstname[0].toUpperCase()}{currentUserData.lastname[0].toUpperCase()}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-darker text-white rounded-lg pt-16 pb-7 px-8 flex flex-col">
                                    <div className="mb-1 font-semibold text-2xl mt-3">{capitalizeWord(currentUserData.firstname)} {capitalizeWord(currentUserData.lastname)} <span className="text-lg">(@{currentUserData.username})</span></div>
                                    <div className="text-sm mt-2 text-gray-200">
                                        <div className="flex flex-row ml-auto space-x-3 items-center">
                                            <div className="mb-1 h-5 font-bold cursor-pointer" onClick={() => setShowFollowersModal(true)}>{numberFormatter(currentUserData.followers.length)} <span className="font-normal">Follower{currentUserData.followers.length == 1 ? null : 's'}</span></div>
                                            <div className="mb-1 h-5 font-bold cursor-pointer" onClick={() => setShowFollowingModal(true)}>{numberFormatter(currentUserData.following.length)} <span className="font-normal">Following</span></div>
                                            <div className="mb-1 h-5 font-bold ml-2">{numberFormatter(currentUserData.claps)} <span className="font-normal">Claps</span></div>
                                        </div>
                                        
                                        <div className="mb-1 mt-5 font-normal text-md w-10/12">
                                            {currentUserData.bio}
                                        </div>

                                        <div className="mb-1 mt-2 font-semibold text-md w-10/12">
                                            <CopyToClipboard
                                                text={window.location.host+'/user/'+currentUserData.username}
                                                onCopy={() => {
                                                    toast.success('Link copied');
                                                }}>
                                                <h4 className="text-sm font-semibold text-white flex mt-2 space-x-2 cursor-pointer"><FaLink size={13.5} className="mt-1 mr-1" />{window.location.host}/user/{currentUserData.username}</h4>
                                            </CopyToClipboard>
                                        </div>
                                    </div>
                                    <Divider />
                                    <form className="edit" method="post" onSubmit={updateProfile}>
                                        <h2 className="text-white font-semibold text-xl flex mb-3"><FaPen size={15} className="mt-2 mr-1" /> Edit profile</h2>

                                        <h1 className="font-semibold text-md mb-1">Firstname <span className="text-primary">*</span></h1>
                                        <div className="flex mb-3">
                                            <input type="text" required={true} placeholder={"Please enter your first name"} minLength={3} maxLength={12} value={firstname} onChange={e => setFirstname(e.currentTarget.value)} className="md:w-4/12 sm:w-6/12 px-3 py-2 mb-1 text-white bg-dark rounded-md" />
                                        </div>

                                        <h1 className="font-semibold text-md mb-1">Lastname <span className="text-primary">*</span></h1>
                                        <div className="flex mb-3">
                                            <input type="text" required={true} placeholder={"Please enter your last name"} minLength={3} maxLength={12} value={lastname} onChange={e => setLastname(e.currentTarget.value)} className="md:w-4/12 sm:w-6/12 px-3 py-2 mb-1 text-white bg-dark rounded-md" />
                                        </div>

                                        <h1 className="font-semibold text-md mb-1">Email <span className="text-primary">*</span></h1>
                                        <div className="flex mb-3">
                                            <input type="email" required={true} placeholder={"Please enter your email address"} value={email} onChange={e => setEmail(e.currentTarget.value)} className="md:w-4/12 sm:w-6/12 px-3 py-2 mb-1 text-white bg-dark rounded-md" />
                                        </div>

                                        <h1 className="font-semibold text-md mb-1">Bio</h1>
                                        <div className="flex mb-3">
                                            <textarea value={bio} onChange={e => setBio(e.currentTarget.value)} placeholder="Please enter your bio" className="w-9/12 px-3 py-2 mb-1 text-white bg-dark rounded-md" />
                                        </div>

                                        <h1 className="font-semibold text-md mb-1">Avatar</h1>
                                        <div className="flex mb-3">
                                            <HexColorPicker color={avatarColor} onChange={setAvatarColor} />
                                        </div>
                                        
                                        <div className="flex space-x-3">
                                            <button type="submit" className={`bg-${isDisabled ? "gray" : "primary"} px-6 py-2 mt-5 rounded-md font-semibold text-sm flex`} disabled={isDisabled}><FaSave className="my-auto mr-1" /> Save changes</button>
                                            <button onClick={resetPassword} className={`bg-primary px-4 py-2 mt-5 rounded-md font-semibold text-sm flex`}><MdRefresh size={18} className="my-auto mr-1" /> Send password reset link</button>
                                        </div>
                                    </form>

                                </div>
                            </div>
                            <div className="w-4/12 bg-darker rounded-lg mt-10 hidden md:block lg:block xl:block">
                                <div className="container p-5">
                                    <h1 className="text-white text-2xl font-inter font-bold">Discover</h1>
                                    <ul role="list" className="divide-y divide-gray-200 overflow-auto no-scrollbar mt-3 space-y-2">
                                        {
                                            users.map((user, key) => {
                                                return (
                                                    <Link href={`user/${user.username}`} key={key} passHref>
                                                        <li className="py-3 sm:py-4 rounded-lg bg-dark cursor-pointer" key={key}>
                                                            <div className="flex items-center space-x-4 px-3">
                                                                <div className="p-4 text-white font-bold rounded-full" style={{backgroundColor: user.avatarColor}}>
                                                                    {user.firstname[0].toUpperCase()}{user.lastname[0].toUpperCase()}
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <p className="text-sm font-medium text-gray-900 truncate text-white">
                                                                        {capitalizeWord(user.firstname)} {capitalizeWord(user.lastname)}
                                                                    </p>
                                                                    <p className="text-sm font-medium text-white truncate dark:text-gray-400">
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
        </PrivateRoute>
    ) 
}

export default Me