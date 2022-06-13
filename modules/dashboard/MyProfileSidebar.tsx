import Link from "next/link"

import { FaSignOutAlt } from "react-icons/fa"
import Divider from "../../components/Divider"

import { useAuth } from "../../auth/AuthContext"
import { logOut } from "../../lib/signOut"
import { useMediaQuery } from "react-responsive"
import { numberFormatter } from "../../lib/numberFormatter"

const MyProfileSidebar = () => {

    const { currentUserData } = useAuth();
    const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 });
    
    return (
        <nav className={`w-full h-full bg-darker rounded-lg ${isTabletOrMobile ? 'hidden' : 'flex'}`}>
            <div className="flex mx-auto p-4 rounded-md container">
                <div className="w-full h-full py-4 items-start justify-left text-white text-xl rounded-md">
                    <div className="flex space-x-45">
                        <div className="flex space-x-20 w-full">
                            <div className="flex-1 min-w-0">
                                <h1 className="font-bold text-2xl font-inter">My profile</h1>
                            </div>
                            <div className="inline-flex text-green items-end text-base">
                                <button onClick={logOut} className="bg-primary px-4 py-2 rounded-md text-sm font-medium text-white text-md">Log out</button>
                            </div>
                        </div>
                    </div>
                    <Divider />
                    <div className="max-w-sm mx-auto bg-gray rounded-lg shadow-md py-4">
                        <div className="flex flex-col container pb-10">
                            <Link href={'/me'}>
                                <div className="p-6 text-white text-2xl rounded-full mb-3 shadow-lg mx-auto cursor-pointer" style={{backgroundColor: currentUserData.avatarColor}}>
                                    {currentUserData.firstname[0]}{currentUserData.lastname[0]}
                                </div>
                            </Link>
                            <h5 className="mb-1 text-lg font-medium text-center cursor-pointer"><Link href={'/me'}><span>{currentUserData.firstname} {currentUserData.lastname}</span></Link></h5>
                            <span className="text-sm text-white text-center cursor-pointer"><Link href={'/me'}><span>@{currentUserData.username}</span></Link></span>
                            <span className="text-sm text-gray-500 text-center mt-3">{currentUserData.bio}</span>
                            <div className="flex space-x-3 mt-3 mx-auto">
                                <span className="justify-left text-sm font-bold text-white">{numberFormatter(currentUserData.followers.length)} <span className="font-normal">Follower{currentUserData.followers.length == 1 ? null : 's'}</span></span>
                                <span className="justify-left text-sm font-bold text-white">{numberFormatter(currentUserData.following.length)} <span className="font-normal">following</span></span>
                                <span className="justify-left text-sm font-bold text-white">{numberFormatter(currentUserData.claps)} <span className="font-normal">Claps</span></span>
                            </div>
                            <div className="flex mt-4 space-x-3 lg:mt-6">
                                <Link href="me" ><span className="flex justify-left py-2 px-5 text-sm font-medium text-white bg-primary rounded-lg hover:bg-secondary cursor-pointer">Edit profile</span></Link>
                            </div>
                            
                        </div>
                    </div>
                    
                </div>
            </div>
        </nav>
    )
}

export { MyProfileSidebar }