import Link from "next/link";
import { FaBug, FaLock } from "react-icons/fa";

const Footer: React.FC = () => {
    return (
        <div>
            <footer className="text-center lg:text-left bg-darker text-gray-600">
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
            </footer>
        </div>
    );
};

export default Footer