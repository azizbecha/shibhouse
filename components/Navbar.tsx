import { Fragment, useEffect, useState } from "react";
import Link from "next/link";

import { useAuth } from "../auth/AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../auth/Firebase";
import { logOut } from '../lib/signOut'

import { Disclosure, Menu, Transition } from "@headlessui/react";
import { FaBars, FaTimes } from "react-icons/fa";

const navigation = [
    { name: "Dashboard", href: "/dashboard", current: false },
    { name: "Rooms", href: "/dashboard", current: false },
    { name: "Profile", href: "/profile", current: false },
    { name: "Settings", href: "/settings", current: false },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Navbar() {

    const logoLink = "https://cdn.shibhouse.tv/images/shibhouse-logo-transparent.png";

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
                <>
                    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                        <div className="relative flex items-center justify-between h-16">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden focus:outline-none">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none">
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
                                            <>
                                                <Link href={'/login'}>
                                                    <span className={"px-3 bg-gray py-2 rounded-md text-sm font-medium text-white text-md cursor-pointer"}>
                                                        Log in
                                                    </span>
                                                </Link>

                                                <Link href={'/'}>
                                                    <span className={"px-3 bg-gray py-2 rounded-md text-sm font-medium text-white text-md cursor-pointer"}>
                                                        Register
                                                    </span>
                                                </Link>
                                            </>
                                        ) : (
                                            <>
                                                <Link href={'/dashboard'}>
                                                    <span className={"px-3 bg-gray py-2 rounded-md text-sm font-medium text-white text-md cursor-pointer"}>
                                                        Dashboard
                                                    </span>
                                                </Link>

                                                <Link href={'/rooms'}>
                                                    <span className={"px-3 bg-gray py-2 rounded-md text-sm font-medium text-white text-md cursor-pointer"}>
                                                        Rooms
                                                    </span>
                                                </Link>

                                                <Link href={'/people'}>
                                                    <span className={"px-3 bg-gray py-2 rounded-md text-sm font-medium text-white text-md cursor-pointer"}>
                                                        People
                                                    </span>
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Profile dropdown */}
                                {
                                    isLoggedIn && currentUserData !== undefined && (
                                        <>
                                            <Menu as="div" className="ml-3 relative">
                                                <div>
                                                    <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none">
                                                    <span className="sr-only">Open user menu</span>
                                                    
                                                    <div className="p-3 text-white text-md font-bold rounded-full shadow-lg mx-auto cursor-pointer" style={{backgroundColor: currentUserData.avatarColor}}>
                                                        {currentUserData.firstname[0].toUpperCase()}{currentUserData.lastname[0].toUpperCase()}
                                                    </div>
                                                    </Menu.Button>
                                                </div>
                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Menu.Items className="origin-top-right bg-gray absolute z-50 right-0 mt-2 w-48 rounded-md shadow-lg py-1 px-1 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        <Menu.Item>
                                                            <Link href={'/me'}>
                                                                <span className={"block px-4 py-3 text-sm text-white bg-gray cursor-pointer border-b-2 mb-2"}>Profile</span>
                                                            </Link>
                                                        </Menu.Item>

                                                        <Menu.Item>
                                                            <Link href={'/settings'}>
                                                                <span className={"block px-4 py-2 text-sm text-white bg-gray cursor-pointer border-b-2 mb-2"}>Settings</span>
                                                            </Link>
                                                        </Menu.Item>
                                                        
                                                        <Menu.Item>
                                                            <span onClick={logOut} className={"block px-4 py-2 w-100 border-b-2 text-sm text-white bg-gray cursor-pointer"}>Log out</span>
                                                        </Menu.Item>

                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                key={item.name}
                                as="a"
                                href={item.href}
                                className={classNames(
                                    item.current
                                    ? "bg-primary"
                                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                    "block px-3 py-2 rounded-md text-base font-medium text-white"
                                )}
                                aria-current={item.current ? "page" : undefined}
                                >
                                {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}
