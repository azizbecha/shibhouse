import Link from "next/link";

const Footer = () => {
    return (
        <div>
            <footer className="text-center lg:text-left bg-darker text-gray-600">
                <div className="flex justify-center items-center lg:justify-between p-6 border-b border-gray-300">
                    <div className="mr-12 lg:block font-inter font-bold text-lg">
                        <span>Shibhouse</span>
                    </div>
                    <div className="flex justify-center space-x-4">
                        <Link href="report">
                            <span className="mx-6 text-gray-600 font-semibold">Report a bug</span>
                        </Link>
                        <Link href="privacy">
                            <span className="mx-6 text-gray-600 font-semibold">Privacy Policy</span>
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer