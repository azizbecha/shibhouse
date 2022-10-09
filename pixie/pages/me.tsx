import React, { useContext, useEffect, useState } from "react"
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";

import { doc, updateDoc, query, collection, where, getDocs, limit, QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { getAuth, updateEmail } from "firebase/auth";

import { AuthContext } from "../auth/AuthContext";
import { fireStore } from "../auth/Firebase";
import PrivateRoute from "../auth/PrivateRoute";

import { toast } from "react-toastify";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { HexColorPicker } from "react-colorful";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Divider from "../components/Divider";

import { FaArrowLeft, FaLink, FaPen, FaSave } from "react-icons/fa";

import isEmail from "validator/lib/isEmail";
import { capitalizeWord } from "../lib/capitalize";
import { numberFormatter } from "../lib/numberFormatter";

import SEO from "../utils/SEO";

const Me: React.FC = () => {

    const router: NextRouter = useRouter();    
    const { currentUserData } = useContext(AuthContext);
    
    const [firstname, setFirstname] = useState<string>(currentUserData.firstname);
    const [lastname, setLastname] = useState<string>(currentUserData.lastname);
    const [email, setEmail] = useState<string>(currentUserData.email);
    const [bio, setBio] = useState<string>(currentUserData.bio);
    const [avatarColor, setAvatarColor] = useState<string>(currentUserData.avatarColor);

    const [isDisabled, setIsDisabled] = useState<boolean>(true);

    const [users, setUsers] = useState([]);
    
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

            toast.success('Profile updated successfully', {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            
            if (email !== currentUserData.email) {

                // If email has changed, check if it's valid then update it
                if (isEmail(email)) {
                    const auth = getAuth();

                    updateEmail(auth.currentUser, email).then(() => {
                        toast.success('Email updated successfully', {
                            position: "top-center",
                            autoClose: 4000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        router.push('/');
                    }).catch((error) => {
                        console.log(error);
                        toast.error('An error has been occured', {
                            position: "top-center",
                            autoClose: 4000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    });
                } else {
                    toast.warning('Please enter a valid email', {
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
            router.push('/');
        }
    }

    return (
        <PrivateRoute>
            <div className="h-screen">
                <Navbar />
                <SEO title={`${capitalizeWord(currentUserData.firstname)} ${capitalizeWord(currentUserData.lastname)} (@${currentUserData.username}) - Shibhouse`} description="My profile in Shibhouse.tv"  />
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
                                            <div className="mb-1 h-5 font-bold">{numberFormatter(currentUserData.followers.length)} <span className="font-normal">Follower{currentUserData.followers.length == 1 ? null : 's'}</span></div>
                                            <div className="mb-1 h-5 font-bold">{numberFormatter(currentUserData.following.length)} <span className="font-normal">Following</span></div>
                                            <div className="mb-1 h-5 font-bold ml-2">{numberFormatter(currentUserData.claps)} <span className="font-normal">Claps</span></div>
                                        </div>
                                        
                                        <div className="mb-1 mt-5 font-normal text-md w-10/12">
                                            {currentUserData.bio}
                                        </div>

                                        <div className="mb-1 mt-2 font-semibold text-md w-10/12">
                                            <CopyToClipboard text={window.location.host+'/user/'+currentUserData.username} onCopy={() => {
                                                toast.success('Link copied', {
                                                    position: "top-center",
                                                    autoClose: 4000,
                                                    hideProgressBar: false,
                                                    closeOnClick: true,
                                                    pauseOnHover: true,
                                                    draggable: true,
                                                    progress: undefined,
                                                });
                                                }}>
                                                <h4 className="text-sm font-semibold text-white flex mt-2 space-x-2 cursor-pointer"><FaLink size={13.5} className="mt-1 mr-1" />{window.location.host}/user/{currentUserData.username}</h4>
                                            </CopyToClipboard>
                                        </div>
                                    </div>
                                    <Divider />
                                    <form className="edit" method="post" onSubmit={updateProfile}>
                                        <h2 className="text-white font-semibold text-xl flex mb-3"><FaPen size={15} className="mt-2 mr-1" /> Edit profile</h2>

                                        <h1 className="font-normal text-md mb-1">Firstname <span className="text-primary">*</span></h1>
                                        <div className="flex mb-3">
                                            <input type="text" required={true} placeholder={"Please enter your first name"} minLength={3} maxLength={12} value={firstname} onChange={e => setFirstname(e.currentTarget.value)} className="md:w-4/12 sm:w-6/12 px-3 py-2 mb-1 text-white bg-dark rounded-md" />
                                        </div>

                                        <h1 className="font-normal text-md mb-1">Lastname <span className="text-primary">*</span></h1>
                                        <div className="flex mb-3">
                                            <input type="text" required={true} placeholder={"Please enter your last name"} minLength={3} maxLength={12} value={lastname} onChange={e => setLastname(e.currentTarget.value)} className="md:w-4/12 sm:w-6/12 px-3 py-2 mb-1 text-white bg-dark rounded-md" />
                                        </div>

                                        <h1 className="font-normal text-md mb-1">Email <span className="text-primary">*</span></h1>
                                        <div className="flex mb-3">
                                            <input type="email" required={true} placeholder={"Please enter your email address"} value={email} onChange={e => setEmail(e.currentTarget.value)} className="md:w-4/12 sm:w-6/12 px-3 py-2 mb-1 text-white bg-dark rounded-md" />
                                        </div>

                                        <h1 className="font-normal text-md mb-1">Bio</h1>
                                        <div className="flex mb-3">
                                            <textarea value={bio} onChange={e => setBio(e.currentTarget.value)} placeholder="Please enter your bio" className="w-9/12 px-3 py-2 mb-1 text-white bg-dark rounded-md" />
                                        </div>

                                        <h1 className="font-normal text-md mb-1">Avatar</h1>
                                        <div className="flex mb-3">
                                            <HexColorPicker color={avatarColor} onChange={setAvatarColor} />
                                        </div>
                                        
                                        <button type="submit" className={`bg-${isDisabled ? "gray" : "primary"} px-6 py-2 mt-5 rounded-md font-semibold text-sm flex`} disabled={isDisabled}><FaSave className="my-auto mr-1" /> Save changes</button>
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
                                                                <div className="p-4 text-white rounded-full" style={{backgroundColor: user.avatarColor}}>
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
        </PrivateRoute>
    ) 
}

export default Me