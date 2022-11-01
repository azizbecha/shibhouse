import { useEffect, useState } from "react"
import { NextPage } from "next"
import Link from "next/link"

import { arrayRemove, arrayUnion, collection, doc, DocumentData, onSnapshot, orderBy, Query, query, QueryDocumentSnapshot, updateDoc } from "firebase/firestore"
import { Unsubscribe } from "firebase/auth"

import { useAuth } from "../auth/AuthContext"
import { fireStore } from "../auth/Firebase"
import PrivateRoute from "../auth/PrivateRoute"

import { createNotification } from "../lib/createNotification"
import { capitalizeWord } from "../lib/capitalize"
import SEO from "../utils/SEO"

import $ from "jquery"

import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { Row, Col } from 'react-flexbox-grid/dist/react-flexbox-grid'

import toast from "react-hot-toast";
import { FaPlus, FaTimes, FaUsers } from "react-icons/fa"

const People: NextPage = () => {

    const [users, setUsers] = useState([]);
    const { currentUserData } = useAuth();

    const getUsers = async () => {
        const q: Query<DocumentData> = query(collection(fireStore, "users"), orderBy('joinDate', 'desc'));

        const fetch: Unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
                const fetchedUsers = querySnapshot.docs
                .map((doc: QueryDocumentSnapshot<DocumentData>) => ({ ...doc.data(), id: doc.id }));
                setUsers(fetchedUsers);
            });
        });
    }

    useEffect(() => {
        getUsers();
        
        $(document).ready(() => {
            $("#userSearchInput").on("keyup", function() {
                var value = $(this).val().toLowerCase();
                $(".usersList .userElement").filter(function() {
                    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                });
            });
        })
    }, [])

    const Unfollow = async (userData) => {
        try {
            const followersRef = doc(fireStore, "users", userData.id);
            await updateDoc(followersRef, {
                followers: arrayRemove(currentUserData.username) ,
            });

            const followersRef2 = doc(fireStore, "users", currentUserData.id);
            await updateDoc(followersRef2, {
                following: arrayRemove(currentUserData.username)
            });
            

            toast.success(`Unfollowed ${userData.username}`);

        } catch (e) {
            toast.error(`An error has been occured`);
        }
    }

    const Follow = async (userData) => {
        try {
            const followersRef = doc(fireStore, "users", currentUserData.id);

            await updateDoc(followersRef, {
                following: arrayUnion(userData.username)
            });

            const followersRef2 = doc(fireStore, "users", userData.id);

            await updateDoc(followersRef2, {
                followers: arrayUnion(currentUserData.username)
            });

            createNotification(`@${currentUserData.username} started following @${userData.username}`);

            toast.success(`Followed ${userData.username}`);
        } catch (e) {
            toast.error(`An error has been occured`);
        }
    }

    return (
        <>
            <SEO title="People | ShibHouse" description="Check out some random users in ShibHouse" />
            <PrivateRoute>
                <Navbar />
                    <div className="bg-dark py-6 min-h-screen">
                        <div className="container">
                            <h1 className="text-4xl font-bold text-white flex mb-8"><FaUsers className='mt-1.5 mr-2' /> People <span className="text-2xl ml-1.5 mt-1">({users.length})</span></h1>
                            <div className="relative text-white border-0 mb-5">
                                <input id="userSearchInput" className="w-full h-10 px-3 py-2 text-base placeholder-gray-600 rounded-lg bg-darker" type="search" placeholder="Search for a user on the moon 🚀"/>
                            </div>
                            <Row className="usersList">
                                {
                                    users.map((user, key) => {
                                        if (user.username !== currentUserData.username) {
                                            return (
                                                <Col xs={12} sm={6} md={4} lg={4} key={key} className="userElement">
                                                    <div className="bg-darker px-4 py-6 rounded-md shadow-lg mb-3 justify-start items-center flex">
                                                        <div className="flex items-center space-x-4 py-2">
                                                            <Link href={`user/${user.username}`}>
                                                                <div className="flex-shrink-0 cursor-pointer">
                                                                    <div className="p-4 text-white rounded-full font-bold" style={{backgroundColor: user.avatarColor}}>
                                                                        {user.firstname[0].toUpperCase()}{user.lastname[0].toUpperCase()}
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                            
                                                            <div className="cursor-pointer -mt-3">
                                                                <Link href={`user/${user.username}`}>
                                                                    <div>
                                                                        <h2 className="text-white font-semibold text-xl">{capitalizeWord(user.firstname)} {capitalizeWord(user.lastname)}</h2>
                                                                        <h3 className="text-white font-medium text-md">@{user.username}</h3>
                                                                    </div>
                                                                </Link>
                                                                <div className="text-sm mt-3.5 text-gray-200">
                                                                    <div className="flex flex-row ml-auto space-x-6 items-center">
                                                                        <div className="mb-1 h-5 w-20">{user.followers.includes(currentUserData.username) ? <button onClick={(e) => { e.currentTarget.disabled = true;Unfollow(user); e.currentTarget.disabled = false}} className="bg-primary text-white px-4 py-2 rounded-md font-semibold flex"><FaTimes className="my-auto mr-1" /> Unfollow</button> : <button onClick={(e) => {e.currentTarget.disabled = true; Follow(user); e.currentTarget.disabled = false;}} className="bg-primary text-white px-4 py-2 rounded-md font-semibold flex"><FaPlus className="my-auto mr-1" /> Follow</button>}</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>
                                            )
                                        }
                                    })
                                }
                            </Row>
                        </div>
                    </div>
                <Footer />
            </PrivateRoute>
        </>
    )
}

export default People