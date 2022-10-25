import Link from "next/link";
import { FaBug, FaGithub, FaTwitter } from "react-icons/fa";

const Footer: React.FC = () => {
    return (
        <footer className="p-8 bg-darker text-white shadow md:px-5 md:py-3">
            <div className="sm:flex sm:items-center sm:justify-between">
                <Link href="/">
                    <span className="flex items-center mb-4 sm:mb-0">
                        <img src="../images/shibhouse-logo-transparent.png" className="mr-3 h-10 w-6" alt="ShibHouse Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">ShibHouse</span>
                    </span>
                </Link>
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
    );
};

export default Footer