import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { PeerContextProvider, PeerContext } from '../contexts/PeerJSContext'
import { StreamContextProvider, StreamContext } from '../contexts/StreamContext'

import { PlayerProps } from '../interfaces'

import Speakers from './Speakers'
import Listeners from './Listeners'
import Chat from './Chat'

import ReactTimeAgo from 'react-time-ago'
import { toast } from 'react-toastify'
import { Audio as AudioLoader } from "react-loader-spinner"
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { doc, deleteDoc } from "firebase/firestore";
import { fireStore } from '../auth/Firebase'

import { FaCog, FaHeadphones, FaMapMarkerAlt, FaMicrophone, FaMicrophoneSlash, FaUserPlus } from "react-icons/fa"
import { BsPeopleFill } from 'react-icons/bs'
import { HiPhoneMissedCall } from 'react-icons/hi'
import { IoMdChatboxes } from 'react-icons/io'
import { GoClock } from "react-icons/go"
import { AiFillPushpin } from "react-icons/ai"

const PlayerMain:React.FC<PlayerProps> =  ({ roomId, userName, isHost, roomName, roomDescription, pinnedLink, topics, createdBy, createdAt }) => {

  return (
    <StreamContextProvider>
      <PeerContextProvider initialContext={{
        isHost,
        roomId,
        user: {
          name: userName,
        },
      }}>
        <Main user={{
          name: userName,
        }} room={{
          title: roomName,
          description: roomDescription,
          pinnedLink: pinnedLink,
          topics: topics,
          createdAt: createdAt,
          createdBy: createdBy
        }} />
      </PeerContextProvider>
    </StreamContextProvider>
  )
}

function Main ({ user, room }) {

  const router = useRouter();
  const [deafen, setDeafen] = useState(false);

  if (!user.name) {
    //router.push('/')
    console.log('no username provided')
  }

  const {
    muteToggle,
    micMuted,
    startMicStream,
  } = useContext<any>(StreamContext)

  const {
    state: {
      roomId,
      peerStatus,
      connToHost,
      connRole,
      isHost,
      connectedPeers,
      peerList,
    },
    streams: {
      incomingStreams,
      outgoingStreams,
    },
  } = useContext<any>(PeerContext)

  useEffect(() => {
    if (peerList.length == 0) {
      onLeave();
      router.push('/dashboard')
    }
    if (!isHost) return
    startMicStream()
    
  }, [isHost])
  
  async function onLeave() {
    if (isHost) {
      const agree =  confirm('Are you sure you want to close the room ?')
      if (!agree) return
      if (agree) {
        await deleteDoc(doc(fireStore, "rooms", roomId));
        toast.success('Room deleted', {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
    if (connToHost) connToHost.close()
    if (connectedPeers) {
      connectedPeers.forEach(conn => {
        conn.close()
      })
    }
    if (outgoingStreams) {
      outgoingStreams.forEach(conn => {
        conn.close()
      })
    }
    if (incomingStreams) {
      incomingStreams.forEach(conn => {
        conn.call.close()
      })
    }

    router.push('/dashboard')
  }

  if (peerStatus === 'error') {
    return (
      <div className="bg-dark w-full flex items-center justify-center">
        <h1 className="text-white text-center text-3xl container h-screen">
          An error has been occured
        </h1>
      </div>
    )
  }

  const topics = room.topics.split(" ")

  let muteAudio = new Audio("../../mute.wav")
  let unmuteAudio = new Audio("../../unmute.wav")

  let deafenAudio = new Audio("../../deafen.wav")
  let undeafenAudio = new Audio("../../undeafen.wav")

  const playMuteAudio = () => {
    micMuted ? muteAudio.play() : unmuteAudio.play()
  }

  const playDeafenAudio = () => {
    deafen ? deafenAudio.play() : undeafenAudio.play()
  }

  return (
    <>
      <div className="bg-dark w-12/12 flex items-center justify-center">
        <div className="bg-gray-800 w-12/12 flex-1 flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:space-x-10 sm:p-6 sm:my-2 sm:mx-4 sm:rounded-2xl">
          <div className="bg-dark px-2 lg:px-0 py-1 lg:py-5 sm:rounded-xl flex lg:flex-col justify-between">
            <nav className="flex rounded-xl items-center my-auto flex-row space-x-2 lg:space-x-0 lg:flex-col lg:space-y-2">
              {(isHost || connRole === 'speaker') && (
                <span onClick={() => {muteToggle(); playMuteAudio()}} className="mb-1">
                  <button className={`p-4 inline-flex justify-center rounded-full ${micMuted ? 'text-white bg-primary hover:bg-secondary rounded-full': 'text-white/50 hover:bg-gray/50' } smooth-hover`}>
                    { micMuted ? <FaMicrophoneSlash size={20} /> : <FaMicrophone size={20} />}
                  </button>
                </span>
              )}
              <button onClick={() => {
                  playDeafenAudio()
                  setDeafen(!deafen)
                }} className={`text-white/50 p-4 mb-1 inline-flex justify-center rounded-full hover:bg-gray/50 ${deafen && 'text-white bg-primary' }`}>
                <FaHeadphones color={deafen ? 'white': 'gray'} size={18}/>
              </button>
              <a className="text-white/50 p-4 mb-1 inline-flex justify-center rounded-full hover:text-white hover:bg-gray/50 smooth-hover" href="#">
                <FaUserPlus size={18} />
              </a>
              <a className="text-white/50 p-4 mb-1 inline-flex justify-center rounded-full hover:text-white hover:bg-gray/50 smooth-hover" href="#">
                <IoMdChatboxes size={20} />
              </a>
              <button onClick={onLeave} className="text-white/50 p-4 mb-1 inline-flex justify-center rounded-full hover:text-white hover:bg-gray/50 smooth-hover">
                <HiPhoneMissedCall size={20} />
              </button>
              <a className="text-white/50 p-4 mb-1 inline-flex justify-center rounded-full hover:text-white hover:bg-gray/50 smooth-hover" href="#">
                <FaCog size={20} />
              </a>
            </nav>
          </div>
          <div className="flex-1 px-2 sm:px-0 w-100">
            <div className="flex justify-between items-center">
              <h3 className="text-3xl font-bold text-white inline-flex items-center"><AudioLoader color="white" width={30} height={25} /> {room.title} <span className="bg-primary text-sm font-medium ml-2 mt-1 px-2.5 py-0.5 rounded inline-flex justify-center space-between"><BsPeopleFill className="mt-1 mr-1" /> {peerList.length}</span></h3>
              <div className="flex-row">
                
                <h4 className="text-sm font-normal text-white flex mt-2 space-x-2"><FaMapMarkerAlt size={14} className="mt-1 mr-1" />The moon</h4>
                <CopyToClipboard text={window.location.href} onCopy={() => {
                  toast.success('Link copied', {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                }}>
                  <h4 className="text-sm font-normal text-white flex mt-2 space-x-2 cursor-pointer"><FaUserPlus size={15} className="mt-1 mr-1" />{window.location.href}</h4>
                </CopyToClipboard>
              </div>
            </div>
            
            <h4 className="text-lg font-normal text-white">{room.description}</h4>
            {
              room.pinnedLink !== "" ? (
                <>
                  <h4 className="text-sm text-white flex mt-3 font-semibold"><AiFillPushpin size={19} className="mb-1 mr-1" /><a href={room.pinnedLink} target="_blank" >{room.pinnedLink}</a> </h4>
                </>
              ) : null
            }
            <h4 className="text-lg font-normal text-white mt-3">{
              topics.map((topic) => {
                return (
                  <span className="bg-darker text-white text-sm font-medium mr-2 px-2 py-1 rounded-lg">#{topic}</span>
                )
              })
            }</h4>
            <h5 className="text-md font-normal text-white mt-5 flex space-x-1"><GoClock size={18} className="mt-1 text-primary" />&nbsp;Started {<ReactTimeAgo date={Number(room.createdAt)} />}&nbsp;with <span className="font-bold">@{room.createdBy}</span></h5>
            
            <div className="flex space-x-4">
              <div className="md:w-8/12 lg:w-8/12 xl:w-8/12 w-12/12">
                <div className="bg-darker mt-10 mb-5 rounded-md p-5">
                  <Speakers />
                </div>

                <div className="bg-darker mb-10 rounded-md p-5">
                  <Listeners />
                </div>
              </div>
              <div className="w-4/12 p-5 bg-darker mt-10 rounded-md hidden md:block lg:block xl:block">
                <h1 className="text-white font-bold text-2xl">Chat</h1>
                <Chat roomId={roomId} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PlayerMain