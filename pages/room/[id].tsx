import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Head from "next/head"

import { doc, getDoc } from "firebase/firestore"
import { fireStore } from "../../auth/Firebase"

import getCurrentUserData from "../../lib/getCurrentUserData"
import getUserData from "../../lib/getUserData"

import TimeAgo from "../../lib/timeAgo"

import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

import { Audio } from "react-loader-spinner"

import { FaCog, FaHeadphones, FaLink, FaMicrophone, FaUserPlus } from "react-icons/fa"
import { BsPeopleFill } from 'react-icons/bs'
import { HiPhoneMissedCall } from 'react-icons/hi'
import { IoMdChatboxes } from 'react-icons/io'
import { GoClock } from "react-icons/go"

const Room = () => {

  const [creatorData, setCreatorData] = useState<any>([])

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState();
  const [topics, setTopics] = useState([]);
  const [pinnedLink, setPinnedLink] = useState();
  const [createdAt, setCreatedAt] = useState();
  const [createdBy, setCreatedBy] = useState()

  const router = useRouter();

  const roomId = router.query.id;

  useEffect(() => {
    const fetchRoomData = async () => {
      const docRef = doc(fireStore, "rooms", String(roomId));
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        let data = docSnap.data()
        setCreatorData(await getUserData(data.createdBy))
        setTitle(data.title);
        setDescription(data.description);
        setTopics(data.topics.split(' '));
        setPinnedLink(data.pinnedLink);
        setCreatedAt(data.createdAt);
        setCreatedBy(data.createdBy);
      } else {
        router.push('/404')
      }
    }
    
    fetchRoomData()

  }, [createdBy])


  return (
    <>
      <Head>
        <title>Listening to: {title} - Shibhouse</title>
      </Head>
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
              <h3 className="text-3xl font-bold text-white inline-flex items-center"><Audio color="white" width={30} height={25} /> {title} <span className="bg-primary text-sm font-medium ml-2 mt-1 px-2.5 py-0.5 rounded inline-flex justify-center space-between"><BsPeopleFill className="mt-1 mr-1" /> 12</span></h3>
              <div className="flex-row">
                {
                  pinnedLink !== "" ? (
                    <>
                      <h4 className="text-sm font-normal text-white flex"><FaLink size={13} className="mt-1" />&nbsp; <a href={pinnedLink}>{pinnedLink}</a> </h4>
                    </>
                  ) : null
                }
              </div>
            </div>
            
            <h4 className="text-lg font-normal text-white mt-3">{description}</h4>
            <h4 className="text-lg font-normal text-white mt-3">{
              topics.map((topic, index) => {
                return (
                  <span className="bg-darker text-white text-sm font-medium mr-2 px-2 py-1 rounded-lg">#{topic}</span>
                )
              })
            }</h4>
            <h5 className="text-md font-normal text-white mt-3 flex space-x-1"><GoClock size={18} className="mt-1 text-primary" />&nbsp;Started {TimeAgo(createdAt)} with <span className="font-bold">@{creatorData.username}</span></h5>
            
            <div className="bg-darker mt-10 mb-5 rounded-md p-5">
              <h1 className="font-bold text-white text-2xl mb-4">Speakers</h1>
              <div className="grid grid-cols-5 gap-4">
                <div className="bg-dark text-white p-2 rounded-lg">
                  <div className="container mt-5 mb-5">
                    <img src="https://avatars.githubusercontent.com/u/63454940" className="rounded-full w-24 h-24 mx-auto border-4 border-primary" alt="Image of speaker"/>
                    <h1 className="mt-4 text-white text-center font-bold">
                      Aziz Becha
                    </h1>
                  </div>
                </div>
                
                <div className="bg-dark text-white p-2 rounded-lg">
                  <div className="container mt-5 mb-5">
                    <img src="https://avatars.githubusercontent.com/u/63454940" className="rounded-full w-24 h-24 mx-auto border-4 border-gray" alt="Image of speaker"/>
                    <h1 className="mt-4 text-white text-center font-bold">
                      Aziz Becha
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-darker mb-10 rounded-md p-5">
              <h1 className="font-bold text-white text-2xl mb-4">Listeners</h1>
              <div className="grid grid-cols-5 gap-4">
                <div className="bg-dark text-white p-2 rounded-lg">
                  <div className="container mt-5 mb-5">
                    <img src="https://avatars.githubusercontent.com/u/63454940" className="rounded-full w-24 h-24 mx-auto border-4 border-white" alt="Image of speaker"/>
                    <h1 className="mt-4 text-white text-center font-bold">
                      Aziz Becha
                    </h1>
                  </div>
                </div>
                
                <div className="bg-dark text-white p-2 rounded-lg">
                  <div className="container mt-5 mb-5">
                    <img src="https://avatars.githubusercontent.com/u/63454940" className="rounded-full w-24 h-24 mx-auto border-4 border-white" alt="Image of speaker"/>
                    <h1 className="mt-4 text-white text-center font-bold">
                      Aziz Becha
                    </h1>
                  </div>
                </div>

                <div className="bg-dark text-white p-2 rounded-lg">
                  <div className="container mt-5 mb-5">
                    <img src="https://avatars.githubusercontent.com/u/63454940" className="rounded-full w-24 h-24 mx-auto border-4 border-white" alt="Image of speaker"/>
                    <h1 className="mt-4 text-white text-center font-bold">
                      Aziz Becha
                    </h1>
                  </div>
                </div>
              </div>
              
            </div>
            
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Room