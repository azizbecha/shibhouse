/* eslint-disable @next/next/no-img-element */
import { Fragment, useEffect, useState } from "react";
import Link from "next/link";

import { useAuth } from "../auth/AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../auth/Firebase";
import { logOut } from '../lib/signOut'

import { Disclosure, Menu, Transition } from "@headlessui/react";
import { FaBars, FaBug, FaHome, FaSignInAlt, FaSignOutAlt, FaTimes, FaUserAlt, FaUserPlus } from "react-icons/fa";
import { AiFillDashboard } from "react-icons/ai";
import { ImUsers } from 'react-icons/im'

const navigation = [
    { name: "Dashboard", href: "/dashboard", current: false },
    { name: "Rooms", href: "/dashboard", current: false },
    { name: "Profile", href: "/profile", current: false },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Navbar() {

    const logoLink = "../../../../shibhouse-logo-transparent.png";

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const { currentUserData } = useAuth();

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                setIsLoggedIn(true)
            } else {
                setIsLoggedIn(false)
            }
        })
    }, [])

    return (
        <Disclosure as="nav" className="bg-dark">
            {({ open }) => (
                <Fragment>
                    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                        <div className="relative flex items-center justify-between h-16">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden focus:outline-none">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-darker focus:outline-none">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <FaTimes className="block h-6 w-6 text-white" aria-hidden="true" />
                                    ) : (
                                        <FaBars className="block h-6 w-6 text-white" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex-shrink-0 flex items-center">
                                    <img
                                        className="block lg:hidden h-8 w-auto"
                                        src={logoLink}
                                        alt="Shibhouse logo"
                                    />
                                    <img
                                        className="hidden lg:block h-12 w-7 mr-1 mt-1"
                                        src={logoLink}
                                        alt="Shibhouse logo"
                                    />
                                    <h1 className="text-white font-medium text-lg">&nbsp;<Link href='/' passHref>Shibhouse</Link></h1>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <div className="hidden sm:block sm:ml-6">
                                    <div className="flex space-x-4">
                                        {!isLoggedIn ? (
                                            <Fragment>
                                                <Link href={'/login'}>
                                                    <span className={"flex justify-center px-3 bg-gray hover:bg-primary py-2 rounded-md font-medium text-white text-md cursor-pointer"}>
                                                        <FaSignInAlt className="my-auto mr-1" /> Login
                                                    </span>
                                                </Link>

                                                <Link href={'/register'}>
                                                    <span className={"flex justify-center px-3 bg-gray hover:bg-primary py-2 rounded-md font-medium text-white text-md cursor-pointer"}>
                                                        <FaUserPlus className="my-auto mr-1" /> Register
                                                    </span>
                                                </Link>
                                            </Fragment>
                                        ) : (
                                            <Fragment>
                                                <Link href={'/dashboard'}>
                                                    <span className={"flex px-3 bg-gray hover:bg-primary py-2 rounded-md text-sm font-medium text-white cursor-pointer"}>
                                                        <AiFillDashboard className="my-auto mr-1" /> Dashboard
                                                    </span>
                                                </Link>

                                                <Link href={'/rooms'}>
                                                    <span className={"flex px-3 bg-gray hover:bg-primary py-2 rounded-md text-sm font-medium text-white cursor-pointer"}>
                                                        <FaHome className="my-auto mr-1" /> Rooms
                                                    </span>
                                                </Link>

                                                <Link href={'/people'}>
                                                    <span className={"flex px-3 bg-gray hover:bg-primary py-2 rounded-md text-sm font-medium text-white cursor-pointer"}>
                                                        <ImUsers className="my-auto mr-1" /> People
                                                    </span>
                                                </Link>
                                            </Fragment>
                                        )}
                                    </div>
                                </div>

                                {/* Profile dropdown */}
                                {
                                    isLoggedIn && currentUserData !== undefined && (
                                        <Fragment>
                                            <Menu as="div" className="ml-3 relative">
                                                <Fragment>
                                                    <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none">
                                                    <span className="sr-only">Open user menu</span>
                                                    
                                                    <div className="p-3 text-white text-md font-bold rounded-full shadow-lg mx-auto cursor-pointer" style={{backgroundColor: currentUserData.avatarColor}}>
                                                        {currentUserData.firstname[0].toUpperCase()}{currentUserData.lastname[0].toUpperCase()}
                                                    </div>
                                                    </Menu.Button>
                                                </Fragment>
                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Menu.Items className="origin-top-right bg-dark absolute z-50 right-0 mt-2 w-48 rounded-lg p-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        <Menu.Item>
                                                            <Link href={'/me'}>
                                                                <span className={"flex px-2 py-3 text-sm text-white font-semibold bg-dark cursor-pointer border-b mb-1"}><FaUserAlt className="my-auto mr-1.5" /> Profile</span>
                                                            </Link>
                                                        </Menu.Item>

                                                        <Menu.Item>
                                                            <a href="https://github.com/azizbecha/shibhouse/issues" target={'_blank'} rel="noreferrer" className={"flex px-2 py-3 text-sm text-white font-semibold bg-dark cursor-pointer border-b mb-1"}><FaBug className="my-auto mr-1.5" /> Report A Bug</a>
                                                        </Menu.Item>

                                                        <Menu.Item>
                                                            <span onClick={logOut} className={"flex px-2 py-3 text-sm text-white font-semibold bg-dark cursor-pointer border-b mb-1"}><FaSignOutAlt className="my-auto mr-1.5" /> Log out</span>
                                                        </Menu.Item>

                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </Fragment>
                                    )
                                }
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-2">
                            {
                                isLoggedIn && currentUserData !== undefined ? (
                                    <Fragment>
                                        <Link href={'/dashboard'}>
                                            <span className={"flex justify-center px-3 bg-gray hover:bg-primary py-2 rounded-md font-medium text-white text-md cursor-pointer"}>
                                                <AiFillDashboard className="my-auto mr-1" /> Dashboard
                                            </span>
                                        </Link>

                                        <Link href={'/rooms'}>
                                            <span className={"flex justify-center px-3 bg-gray hover:bg-primary py-2 rounded-md font-medium text-white text-md cursor-pointer"}>
                                                <FaHome className="my-auto mr-1" /> Rooms
                                            </span>
                                        </Link>

                                        <Link href={'/people'}>
                                            <span className={"flex justify-center px-3 bg-gray hover:bg-primary py-2 rounded-md font-medium text-white text-md cursor-pointer"}>
                                                <ImUsers className="my-auto mr-1" /> People
                                            </span>
                                        </Link>
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        <Link href={'/login'}>
                                            <span className={"flex justify-center px-3 bg-gray hover:bg-primary py-2 rounded-md font-medium text-white text-md cursor-pointer"}>
                                                <FaSignInAlt className="my-auto mr-1" /> Login
                                            </span>
                                        </Link>

                                        <Link href={'/register'}>
                                            <span className={"flex justify-center px-3 bg-gray hover:bg-primary py-2 rounded-md font-medium text-white text-md cursor-pointer"}>
                                                <FaUserPlus className="my-auto mr-1" /> Register
                                            </span>
                                        </Link>
                                    </Fragment>
                                )
                            }
                        </div>
                    </Disclosure.Panel>
                </Fragment>
            )}
        </Disclosure>
    );
}
