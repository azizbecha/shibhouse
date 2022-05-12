import { Fragment } from "react";
import Link from "next/link";

import { Disclosure, Menu, Transition } from "@headlessui/react";
import { FaBars, FaTimes } from "react-icons/fa";

const navigation = [
    { name: "Dashboard", href: "/dashboard", current: true },
    { name: "Rooms", href: "/dashboard", current: false },
    { name: "Profile", href: "/profile", current: false },
    { name: "Settings", href: "/settings", current: false },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
    return (
        <Disclosure as="nav" className="bg-dark">
            {({ open }) => (
                <>
                    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                        <div className="relative flex items-center justify-between h-16">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <FaTimes className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <FaBars className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex-shrink-0 flex items-center">
                                    <img
                                        className="block lg:hidden h-8 w-auto"
                                        src="shibhouse-logo-transparent.png"
                                        alt="Shibhouse logo"
                                    />
                                    <img
                                        className="hidden lg:block h-12 w-7 mr-1 mt-1"
                                        src="shibhouse-logo-transparent.png"
                                        alt="Shibhouse logo"
                                    />
                                    <h1 className="text-white font-medium text-lg">&nbsp;<Link href='/' passHref>Shibhouse</Link></h1>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <div className="hidden sm:block sm:ml-6">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                            >
                                                <span
                                                className={classNames(
                                                    item.current
                                                        ? "bg-primary"
                                                        : "text-white hover:bg-gray-700 hover:text-white",
                                                    "px-3 py-2 rounded-md text-sm font-medium text-white font-bold text-md"
                                                    )}
                                                    aria-current={item.current ? "page" : undefined}>

                                                {item.name}
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                                {/*<button
                                type="button"
                                className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                >
                                <span className="sr-only">View notifications</span>
                                
                                </button>*/}

                                {/* Profile dropdown */}
                                {/*<Menu as="div" className="ml-3 relative">
                                <div>
                                    <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                    <span className="sr-only">Open user menu</span>
                                    <img
                                        className="h-8 w-8 rounded-full"
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        alt=""
                                    />
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
                                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <Menu.Item>
                                        {({ active }) => (
                                        <a
                                            href="#"
                                            className={classNames(
                                            active ? "bg-gray-100" : "",
                                            "block px-4 py-2 text-sm text-gray-700"
                                            )}
                                        >
                                            Your Profile
                                        </a>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                        <a
                                            href="#"
                                            className={classNames(
                                            active ? "bg-gray-100" : "",
                                            "block px-4 py-2 text-sm text-gray-700"
                                            )}
                                        >
                                            Settings
                                        </a>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                        <a
                                            href="#"
                                            className={classNames(
                                            active ? "bg-gray-100" : "",
                                            "block px-4 py-2 text-sm text-gray-700"
                                            )}
                                        >
                                            Sign out
                                        </a>
                                        )}
                                    </Menu.Item>
                                    </Menu.Items>
                                </Transition>
                                </Menu>*/}
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
