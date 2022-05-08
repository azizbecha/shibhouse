import Navbar from "../../components/Navbar"

import { FaCog, FaHeadphones, FaMicrophone, FaUserPlus } from "react-icons/fa"
import { BsPeopleFill } from 'react-icons/bs'
import { HiPhoneMissedCall } from 'react-icons/hi'
import { IoMdChatboxes } from 'react-icons/io'
import { Audio } from "react-loader-spinner"

const Room = () => {
    return (
        <>
        <Navbar />
        <div className="bg-dark w-full flex items-center justify-center">
          <div className="bg-gray-800 flex-1 flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:space-x-10 sm:p-6 sm:my-2 sm:mx-4 sm:rounded-2xl">
            <div className="bg-dark px-2 lg:px-4 py-1 lg:py-5 sm:rounded-xl flex lg:flex-col justify-between">
              <nav className="flex items-center my-auto flex-row space-x-2 lg:space-x-0 lg:flex-col lg:space-y-2">
                <a className="text-white/50 p-4 inline-flex justify-center rounded-md hover:bg-gray-800 hover:text-white smooth-hover" href="#">
                  <FaMicrophone size={18} />
                </a>
                <a className="bg-gray-800 text-white p-4 inline-flex justify-center rounded-md" href="#">
                  <FaHeadphones size={18} />
                </a>
                <a className="text-white/50 p-4 inline-flex justify-center rounded-md hover:bg-gray-800 hover:text-white smooth-hover" href="#">
                  <FaUserPlus size={18} />
                </a>
                <a className="text-white/50 p-4 inline-flex justify-center rounded-md hover:bg-gray-800 hover:text-white smooth-hover" href="#">
                  <IoMdChatboxes size={20} />
                </a>
                <a className="text-white/50 p-4 inline-flex justify-center rounded-md hover:bg-gray-800 hover:text-white smooth-hover" href="#">
                  <HiPhoneMissedCall size={20} />
                </a>
                <a className="text-white/50 p-4 inline-flex justify-center rounded-md hover:bg-gray-800 hover:text-white smooth-hover" href="#">
                  <FaCog size={20} />
                </a>
              </nav>
            </div>
            <div className="flex-1 px-2 sm:px-0 w-100">
              <div className="flex justify-between items-center">
                <h3 className="text-3xl font-bold text-white flex"><span className="mt-2"><Audio color="white" width={30} height={25} /></span>&nbsp;How to start investing</h3>
                <div className="inline-flex items-center space-x-2">
                <h4 className="text-2xl font-extralight text-white/50 flex"><BsPeopleFill size={26} className="mt-1" />&nbsp;5</h4>
                  {/*<a className="bg-dark text-white/50 p-2 rounded-md hover:text-white smooth-hover" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </a>
                  <a className="bg-dark text-white/50 p-2 rounded-md hover:text-white smooth-hover" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                </a>*/}
                </div>
              </div>
              <div className="mb-10 sm:mb-0 mt-10 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <div className="group bg-dark/30 py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-dark/40 hover:smooth-hover">
                  <a className="bg-dark/70 text-white/50 group-hover:text-white group-hover:smooth-hover flex w-20 h-20 rounded-full items-center justify-center" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </a>
                  <a className="text-white/50 group-hover:text-white group-hover:smooth-hover text-center" href="#">Create group</a>
                </div>
                <div className="relative group bg-dark py-10 sm:py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-dark/80 hover:smooth-hover">
                  <img className="w-20 h-20 object-cover object-center rounded-full" src="https://images.unsplash.com/photo-1547592180-85f173990554?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80" alt="cuisine" />
                  <h4 className="text-white text-2xl font-bold capitalize text-center">Cuisine</h4>
                  <p className="text-white/50">55 members</p>
                  <p className="absolute top-2 text-white/20 inline-flex items-center text-xs">22 Online <span className="ml-2 w-2 h-2 block bg-green-500 rounded-full group-hover:animate-pulse"></span></p>
                </div>
                <div className="relative group bg-dark py-10 sm:py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-dark/80 hover:smooth-hover">
                  <img className="w-20 h-20 object-cover object-center rounded-full" src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1171&q=80" alt="art" />
                  <h4 className="text-white text-2xl font-bold capitalize text-center">Art</h4>
                  <p className="text-white/50">132 members</p>
                  <p className="absolute top-2 text-white/20 inline-flex items-center text-xs">4 Online <span className="ml-2 w-2 h-2 block bg-green-500 rounded-full group-hover:animate-pulse"></span></p>
                </div>
                <div className="relative group bg-dark py-10 sm:py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-dark/80 hover:smooth-hover">
                  <img className="w-20 h-20 object-cover object-center rounded-full" src="https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="gaming" />
                  <h4 className="text-white text-2xl font-bold capitalize text-center">Gaming</h4>
                  <p className="text-white/50">207 members</p>
                  <p className="absolute top-2 text-white/20 inline-flex items-center text-xs">0 Online <span className="ml-2 w-2 h-2 block bg-red-400 rounded-full group-hover:animate-pulse"></span></p>
                </div>
                <div className="relative group bg-dark py-10 sm:py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-dark/80 hover:smooth-hover">
                  <img className="w-20 h-20 object-cover object-center rounded-full" src="https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1159&q=80" alt="cinema" />
                  <h4 className="text-white text-2xl font-bold capitalize text-center">cinema</h4>
                  <p className="text-white/50">105 members</p>
                  <p className="absolute top-2 text-white/20 inline-flex items-center text-xs">12 Online <span className="ml-2 w-2 h-2 block bg-green-500 rounded-full group-hover:animate-pulse"></span></p>
                </div>
                <div className="relative group bg-dark py-10 sm:py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-dark/80 hover:smooth-hover">
                  <img className="w-20 h-20 object-cover object-center rounded-full" src="https://images.unsplash.com/photo-1484704849700-f032a568e944?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80" alt="song" />
                  <h4 className="text-white text-2xl font-bold capitalize text-center">Song</h4>
                  <p className="text-white/50">67 members</p>
                  <p className="absolute top-2 text-white/20 inline-flex items-center text-xs">3 Online <span className="ml-2 w-2 h-2 block bg-green-500 rounded-full group-hover:animate-pulse"></span></p>
                </div>
                <div className="relative group bg-dark py-10 sm:py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-dark/80 hover:smooth-hover">
                  <img className="w-20 h-20 object-cover object-center rounded-full" src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80" alt="code" />
                  <h4 className="text-white text-2xl font-bold capitalize text-center">Code</h4>
                  <p className="text-white/50">83 members</p>
                  <p className="absolute top-2 text-white/20 inline-flex items-center text-xs">43 Online <span className="ml-2 w-2 h-2 block bg-green-500 rounded-full group-hover:animate-pulse"></span></p>
                </div>
                <div className="relative group bg-dark py-10 sm:py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-dark/80 hover:smooth-hover">
                  <img className="w-20 h-20 object-cover object-center rounded-full" src="https://images.unsplash.com/photo-1533147670608-2a2f9775d3a4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80" alt="dancing" />
                  <h4 className="text-white text-2xl font-bold capitalize text-center">Dancing</h4>
                  <p className="text-white/50">108 members</p>
                  <p className="absolute top-2 text-white/20 inline-flex items-center text-xs">86 Online <span className="ml-2 w-2 h-2 block bg-green-500 rounded-full group-hover:animate-pulse"></span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
}

export default Room