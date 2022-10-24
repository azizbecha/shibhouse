import React, { useCallback, useContext, useEffect, useState } from "react"
import { useRouter } from "next/router";
import { NextPage } from "next";
import Link from "next/link";

import { query, collection, limit, where, getDocs, doc, updateDoc, DocumentReference, DocumentData, QuerySnapshot, QueryDocumentSnapshot, arrayRemove, arrayUnion } from "firebase/firestore";

import PrivateRoute from "../../auth/PrivateRoute";
import { AuthContext } from "../../auth/AuthContext";
import { fireStore } from "../../auth/Firebase";

import { Row, Col } from 'react-flexbox-grid/dist/react-flexbox-grid'
import toast from "react-hot-toast";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

import { FaArrowLeft, FaBan, FaPlus, FaTimes } from "react-icons/fa";

import { capitalizeWord } from "../../lib/capitalize";
import { numberFormatter } from "../../lib/numberFormatter";
import { createNotification } from "../../lib/createNotification";

import SEO from "../../utils/SEO";

const User: NextPage = () => {

    const router = useRouter();
    
    const [userData, setUserData] = useState<any>({firstname: ' ', lastname: ' ', followers: [], following: []}) // adding default values to prevent showing undefined value error
    const [users, setUsers] = useState<any>([]);

    const { username } = router.query;
    const { currentUserData } = useContext(AuthContext);

    const fetch = useCallback(async () => {
        const q = query(collection(fireStore, "users"), where("username", "==", username), limit(1));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setUserData(doc.data())
            if (userData.username == currentUserData.username) {
                router.push('/me'); // Redirect the user to his profile
            }
        });
    }, [currentUserData.username, router, userData.username, username])

    const Unfollow = async () => {
        try {
            const followersRef = doc(fireStore, "users", userData.id);
            await updateDoc(followersRef, {
                followers: arrayRemove(currentUserData.username)
            });

            const followersRef2 = doc(fireStore, "users", currentUserData.id);
            await updateDoc(followersRef2, {
                following: arrayRemove(currentUserData.username)
            });
            
            fetch();

            toast.success(`Unfollowed ${userData.username}`);

        } catch (e) {
            toast.error(`An error has been occured`);
        }
    }

    const Follow = async () => {
        try {

            const followersRef: DocumentReference<DocumentData> = doc(fireStore, "users", currentUserData.id);

            await updateDoc(followersRef, {
                following: arrayUnion(userData.username)
            });

            const followersRef2: DocumentReference<DocumentData> = doc(fireStore, "users", userData.id);

            await updateDoc(followersRef2, {
                followers: arrayUnion(currentUserData.username)
            });

            fetch();
            createNotification(`@${currentUserData.username} started following @${userData.username}`);
            toast.success(`Followed ${userData.username}`);
        } catch (e) {
            toast.error(`An error has been occured`);
        }
    }

    useEffect(() => {
        
        const getUsers = async () => {
            const q = query(collection(fireStore, "users"), limit(3), where('username', '!=', username));

            const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
            querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
                const users = querySnapshot.docs
                .map((doc) => ({ ...doc.data(), id: doc.id }));
                setUsers(users);
            });
        }

        getUsers();
        fetch();
    }, [username, fetch])

    const FollowStatus = () => {
        if (currentUserData.followers.includes(userData.username) && userData.followers.includes(currentUserData.username)) {
            return <span>You are following each other</span>
        }
        
        else if (currentUserData.followers.includes(userData.username) && !userData.followers.includes(currentUserData.username)) {
            return <span>Follows you</span>
        }
        
        else if (!currentUserData.followers.includes(userData.username) && userData.followers.includes(currentUserData.username)) {
            return <span>You are following this account</span>
        }
        
        else if (!currentUserData.followers.includes(userData.username) && !userData.followers.includes(currentUserData.username)) {
            return <span>You are not following each other</span>
        }
        
        return <></>
    }

    return (
        <PrivateRoute>
            <Navbar />
            <SEO title={`${capitalizeWord(userData.firstname)} ${capitalizeWord(userData.lastname)} (@${userData.username}) | Shibhouse`} description={`@${userData.username})'s profile on Shibhouse`} />
            <div className="bg-dark h-screen">
                <div className="container">                    
                    <Row>
                        <Col xs={12} sm={12} md={12} lg={8}>
                            <h1 className="pt-10 sm:text-3xl text-2xl text-white font-bold font-inter flex"><FaArrowLeft onClick={() => router.push('/dashboard')} size={26} className="mt-1 mr-2 cursor-pointer" /> Profile of {userData.firstname} {userData.lastname}</h1>
                            <div className="mt-20">
                                <div className="absolute -mt-16 ml-5">
                                    <div className="flex h-28 w-28 rounded-full shadow-md text-white text-center font-semibold" style={{backgroundColor: userData.avatarColor}}>
                                        <span className="my-auto mx-auto text-3xl font-inter font-bold">{userData.firstname[0].toUpperCase()}{userData.lastname[0].toUpperCase()}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-darker text-white rounded-lg pt-16 pb-12 px-9 flex flex-col">
                                <div className="mb-1 font-semibold text-2xl">{capitalizeWord(userData.firstname)} {capitalizeWord(userData.lastname)} <span className="text-lg">(@{userData.username})</span></div>
                                <div className="text-sm mt-2 text-gray-200">
                                    <div className="flex flex-row ml-auto space-x-3 items-center">
                                        <div className="mb-1 h-5 font-bold">{numberFormatter(userData.followers.length)} <span className="font-normal">Follower{userData.followers.length == 1 ? null : 's'}</span></div>
                                        <div className="mb-1 h-5 font-bold">{numberFormatter(userData.following.length)} <span className="font-normal">Following</span></div>
                                        <div className="mb-1 h-5 font-bold ml-2">{numberFormatter(userData.claps)} <span className="font-normal">Claps</span></div>
                                    </div>

                                    <div className="mb-3 mt-2 font-semibold text-md w-10/12">
                                        <FollowStatus />
                                    </div>

                                    <div className="mb-3 mt-5 font-normal text-md w-10/12">
                                        {userData.bio}
                                    </div>
                                </div>

                                <div className="text-sm mt-2 text-gray-200">
                                    <div className="flex flex-row ml-auto space-x-6 items-center">
                                        <div className="mb-1 h-5 w-20">{userData.followers.includes(currentUserData.username) ? <button onClick={Unfollow} className="bg-primary px-4 py-2 rounded-md font-semibold flex"><FaTimes className="my-auto mr-1" /> Unfollow</button> : <button onClick={Follow} className="bg-primary px-4 py-2 rounded-md font-semibold flex"><FaPlus className="my-auto mr-1" /> Follow</button>}</div>
                                        <div className="mb-1 h-5 w-20"><button className="bg-primary px-5 py-2 ml-3 rounded-md font-semibold flex"><FaBan className="my-auto mr-1" /> Block</button></div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={4}>
                            <div className="container p-5 bg-darker rounded-lg mt-12">
                                <h1 className="text-white text-2xl font-inter font-bold">Discover</h1>
                                <ul role="list" className="divide-y divide-gray-200 overflow-auto no-scrollbar mt-3 space-y-2">
                                    {
                                        users.map((user, key) => {
                                            return (
                                                <Link href={user.username} key={key} passHref>
                                                    <li className="py-3 sm:py-4 rounded-lg bg-dark cursor-pointer">
                                                        <div className="flex items-center space-x-4 px-3">
                                                            <div className="p-4 text-white rounded-full" style={{backgroundColor: user.avatarColor}}>
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
                                                        </div>
                                                    </li>
                                                </Link>
                                            )
                                        })
                                    }
                                    
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
            <Footer />
        </PrivateRoute>
    ) 
}

export default User