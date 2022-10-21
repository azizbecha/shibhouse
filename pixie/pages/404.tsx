import { NextPage } from "next"
import Link from "next/link"

import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

import SEO from "../utils/SEO"

import { FaArrowLeft } from "react-icons/fa"

const NotFound: NextPage = () => {
    
    return (
        <>
            <SEO title="Page not found | Shibhouse" description="We didn't find this page in our website Shibhouse.tv"  />
            <Navbar />
            <div
                className="
                    flex
                    items-center
                    justify-center
                    w-screen
                    h-screen
                    bg-dark
                "
                >
                <div className="px-28 py-14 bg-darker text-white rounded-md shadow-xl">
                    <div className="flex flex-col items-center">
                    <h1 className="font-bold text-white text-8xl">404</h1>

                    <h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
                        Oops ! Page not found
                    </h6>

                    <p className="mb-6 text-center text-gray-500 md:text-lg">
                        The page you’re looking for doesn’t exist.
                    </p>

                    <Link href="/">
                        <button className="bg-primary px-6 py-2 text-white font-semibold rounded-lg flex">
                            <FaArrowLeft className="my-auto mr-1" /> Go back
                        </button>
                    </Link>
                    
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default NotFound