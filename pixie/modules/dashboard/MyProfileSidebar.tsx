import Link from "next/link"

import { useMediaQuery } from "react-responsive"

import { FaSignOutAlt } from "react-icons/fa"
import { RiPencilFill } from "react-icons/ri"

import Divider from "../../components/Divider"

import { useAuth } from "../../auth/AuthContext"
import { logOut } from "../../lib/signOut"
import { numberFormatter } from "../../lib/numberFormatter"

const MyProfileSidebar: React.FC = () => {

    const { currentUserData } = useAuth();
    const isTabletOrMobile: boolean = useMediaQuery({ maxWidth: 1224 });

    return (
        <nav className={`w-full h-full bg-darker rounded-lg ${isTabletOrMobile ? 'hidden' : 'flex'}`}>
            <div className="flex mx-auto p-4 rounded-md container">
                <div className="w-full h-full py-2 items-center justify-center text-white text-xl rounded-md">
                    <div className="flex space-x-45">
                        <div className="flex space-x-20 w-full">
                            <div className="flex-1 min-w-0">
                                <h1 className="font-bold text-2xl font-inter">Profile</h1>
                            </div>
                            <div className="inline-flex items-end text-base">
                                <button onClick={logOut} className="flex bg-primary px-4 py-2 rounded-md text-sm font-semibold text-white text-md"><FaSignOutAlt className="my-auto mr-1" /> Log out</button>
                            </div>
                        </div>
                    </div>
                    <Divider />
                    <div className="mx-auto bg-gray rounded-lg shadow-md py-2 border-2 border-white">
                        <div className="flex flex-col container py-5 justify-center align-center">
                            <Link href={'/me'}>
                                <div className="p-6 text-white text-2xl font-semibold rounded-full mb-3 shadow-lg mx-auto cursor-pointer" style={{backgroundColor: currentUserData.avatarColor}}>
                                    {currentUserData.firstname[0]}{currentUserData.lastname[0]}
                                </div>
                            </Link>
                            <h5 className="mb-1 text-xl font-medium text-center cursor-pointer"><Link href={'/me'}><span>{currentUserData.firstname} {currentUserData.lastname}</span></Link></h5>
                            <span className="text-sm text-white text-center cursor-pointer"><Link href={'/me'}><span>@{currentUserData.username}</span></Link></span>
                            <span className="text-sm text-gray-500 text-center mt-5">{currentUserData.bio}</span>
                            <div className="flex space-x-3 mt-2 justify-center">
                                <span className="justify-left text-sm font-bold text-white">{numberFormatter(currentUserData.followers.length)} <span className="font-normal">Follower{currentUserData.followers.length == 1 ? null : 's'}</span></span>
                                <span className="justify-left text-sm font-bold text-white">{numberFormatter(currentUserData.following.length)} <span className="font-normal">following</span></span>
                                {/*<span className="justify-left text-sm font-bold text-white">{numberFormatter(currentUserData.claps)} <span className="font-normal">Claps</span></span>*/}
                            </div>
                            <div className="flex mt-6 space-x-3 lg:mt-6 justify-center">
                                <Link href="me"><span className="flex justify-center w-full text-center py-2 px-4 text-sm font-medium text-white bg-primary rounded-lg hover:bg-secondary cursor-pointer"><RiPencilFill size={18} className="my-auto mr-1" /> Edit profile</span></Link>
                            </div>
                            
                        </div>
                    </div>
                    
                </div>

                
            </div>
        </nav>
    )
}

export { MyProfileSidebar }