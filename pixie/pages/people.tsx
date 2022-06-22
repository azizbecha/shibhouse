import { Fragment, useEffect, useState } from "react"
import Head from "next/head"
import Link from "next/link"

import { collection, doc, onSnapshot, query, updateDoc } from "firebase/firestore"
import { useAuth } from "../auth/AuthContext"
import { fireStore } from "../auth/Firebase"
import PrivateRoute from "../auth/PrivateRoute"

import { capitalizeWord } from "../lib/capitalize"
import { removeItem } from "../lib/removeItemFromArray"

import $ from "jquery"

import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { Row, Col } from 'react-flexbox-grid/dist/react-flexbox-grid'

import { toast } from "react-toastify"
import { FaPlus, FaTimes, FaUsers } from "react-icons/fa"
import SEO from "../utils/SEO"

const People: React.FC = () => {

    const [users, setUsers] = useState<any>([]);
    const { currentUserData } = useAuth();

    const getUsers = async () => {
        const q = query(collection(fireStore, "users"));

        const fetch = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const messages = querySnapshot.docs
                .map((doc) => ({ ...doc.data(), id: doc.id }));
                setUsers(messages);
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
                followers: removeItem(userData.followers, currentUserData.username)
            });

            const followersRef2 = doc(fireStore, "users", currentUserData.id);
            await updateDoc(followersRef2, {
                following: removeItem(userData.followers, currentUserData.username)
            });
            

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

    const Follow = async (userData) => {
        try {
            var followersArray = userData.followers;
            var followingArray = currentUserData.following;

            followersArray.push(currentUserData.username);
            followingArray.push(userData.username);

            const followersRef = doc(fireStore, "users", currentUserData.id);

            await updateDoc(followersRef, {
                following: followingArray
            });

            const followersRef2 = doc(fireStore, "users", userData.id);

            await updateDoc(followersRef2, {
                followers: followersArray
            });


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

    return (
        <Fragment>
            <SEO title="People - Shibhouse" description="Check out some random users in Shibhouse" />
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
                                                        <div className="flex items-center space-x-4">
                                                            <Link href={`user/${user.username}`}>
                                                                <div className="flex-shrink-0 cursor-pointer">
                                                                    <div className="p-4 text-white rounded-full" style={{backgroundColor: user.avatarColor}}>
                                                                        {user.firstname[0].toUpperCase()}{user.lastname[0].toUpperCase()}
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                            
                                                            <div className="cursor-pointer">
                                                                <Link href={`user/${user.username}`}>
                                                                    <div>
                                                                        <h2 className="text-white font-semibold text-xl">{capitalizeWord(user.firstname)} {capitalizeWord(user.lastname)}</h2>
                                                                        <h3 className="text-white font-normald text-md">@{user.username}</h3>
                                                                    </div>
                                                                </Link>
                                                                <div className="text-sm mt-2 text-gray-200">
                                                                    <div className="flex flex-row ml-auto space-x-6 items-center">
                                                                        <div className="mb-1 h-5 w-20">{user.followers.includes(currentUserData.username) ? <button onClick={() => Unfollow(user)} className="bg-primary text-white px-4 py-2 rounded-md font-semibold flex"><FaTimes className="my-auto mr-1" /> Unfollow</button> : <button onClick={() => Follow(user)} className="bg-primary text-white px-4 py-2 rounded-md font-semibold flex"><FaPlus className="my-auto mr-1" /> Follow</button>}</div>
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
        </Fragment>
    )
}

export default People