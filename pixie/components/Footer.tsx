import Link from "next/link";
import { Fragment } from "react";
import { FaBug, FaGithub, FaLock, FaTwitter } from "react-icons/fa";

const Footer: React.FC = () => {
    return (
        <Fragment>
            {/* <footer className="text-center lg:text-left bg-darker bottom-0">
                <div className="flex justify-center items-center lg:justify-between p-6 border-b border-gray-300">
                    <div className="mr-10 lg:block font-inter font-bold text-lg text-white">
                        <span>Shibhouse</span>
                    </div>
                    <div className="flex justify-center space-x-3">
                        <a href="https://github.com/azizbecha/shibhouse/issues" className="mx-6 text-gray-600 font-semibold text-white flex space-x-1" target={"_blank"} rel="noreferrer">
                            <FaBug className="my-auto" /> <span>Report a bug</span>
                        </a>
                        <Link href="privacy">
                            <span className="mx-6 text-gray-600 font-semibold text-white flex space-x-1"><FaLock className="my-auto" /> <span>Privacy Policy</span></span>
                        </Link>
                    </div>
                </div>
            </footer> */}


<footer className="p-8 bg-darker text-white shadow md:px-5 md:py-3">
    <div className="sm:flex sm:items-center sm:justify-between">
        <a href="https://flowbite.com/" className="flex items-center mb-4 sm:mb-0">
            <img src="../images/shibhouse-logo-transparent.png" className="mr-3 h-10 w-6" alt="ShibHouse Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">ShibHouse</span>
        </a>
        <ul className="flex space-x-4 flex-wrap items-center mb-6 text-base font-medium text-white sm:mb-0">
            <li>
                <a href="https://github.com/azizbecha/shibhouse/issues" className="mr-6 md:mr-6 ">
                    <div className="flex mt-6">
                        <FaBug className="my-auto mr-1" /> Report Issue
                    </div>
                </a>
            </li>
            <li>
                <a href="https://twitter.com/azizbechaa" className="mr-6 md:mr-6 ">
                    <div className="flex mt-6">
                        <FaTwitter className="my-auto mr-1" /> Contact
                    </div>
                </a>
            </li>
            <li>
                <a href="https://github.com/azizbecha/shibhouse" className="mr-6 md:mr-6 ">
                    <div className="flex mt-6">
                        <FaGithub className="my-auto mr-1" /> GitHub
                    </div>
                </a>
            </li>
        </ul>
    </div>
</footer>


        </Fragment>
    );
};

export default Footer