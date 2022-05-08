import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

import { FaSearch } from "react-icons/fa"

import PrivateRoute from "../auth/PrivateRoute"
import { logOut } from "../lib/signOut"

const Dashboard = () => {
    return (
        <PrivateRoute>
            <div className="bg-dark text-white">
                <Navbar />
                    <div className="flex h-screen bg-dark">
                        <div className="flex-1 flex flex-col overflow-hidden">
                            <header className="flex justify-between items-center p-4">
                                <div className="flex font-bold">Hello user</div>
                                
                                <div className="flex" onClick={logOut}>Log out</div>
                            </header>
                            <div className="flex h-full">
                                <nav className="hidden w-100 h-full bg-darker md:flex rounded-xl">
                                    <div className="w-full flex mx-auto rounded-md">
                                        <div className="w-full h-full px-20 py-4 flex items-center justify-center text-gray-900 text-xl rounded-md">Sidebar</div>
                                    </div>
                                </nav>
                                <main className="flex flex-col w-full bg-white overflow-x-hidden overflow-y-auto mb-14">
                                    <div className="flex w-full mx-auto px-6 py-8">
                                        <div className="flex flex-col w-full h-full text-gray-900 text-xl border-4 border-gray-900 border-dashed">
                                            <div className="flex w-full h-60 items-center justify-center mx-auto bg-green-400 border-b border-gray-600">
                                                <input type="text" className="w-10/12 px-2 py-1 border rounded-md" />
                                                <span className="ml-2 bg-primary p-2 rounded-md text-white">
                                                    <FaSearch />
                                                </span>
                                            </div>


                                            <div className="flex w-full h-60 items-center justify-center mx-auto bg-green-400 border-b border-gray-600">Post</div>
                                            <div className="flex w-full h-60 items-center justify-center mx-auto bg-green-400 border-b border-gray-600">Post</div>
                                            <div className="flex w-full h-60 items-center justify-center mx-auto bg-green-400 border-b border-gray-600">Post</div>
                                            <div className="flex w-full h-60 items-center justify-center mx-auto bg-green-400 border-b border-gray-600">Post</div>
                                            <div className="flex w-full h-60 items-center justify-center mx-auto bg-green-400 border-b border-gray-600">Post</div>
                                        </div>
                                    </div>
                                </main>
                                <nav className="hidden w-72 h-full bg-yellow-400 md:flex">
                                    <div className="w-full flex mx-auto">
                                        <div className="w-full h-full px-20 py-8 flex items-center justify-center text-gray-900 text-xl border-4 border-gray-900 border-dashed">Rightbar</div>
                                    </div>
                                </nav>
                            </div>
                        </div>
                        </div>

                <Footer />
            </div>
        </PrivateRoute>
    )
}

export default Dashboard