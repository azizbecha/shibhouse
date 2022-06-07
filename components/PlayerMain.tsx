import React, { useContext, useEffect, useState, useRef, Fragment } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { PeerContextProvider, PeerContext } from '../contexts/PeerJSContext'
import { StreamContextProvider, StreamContext } from '../contexts/StreamContext'

import { PlayerProps } from '../interfaces'

import Speakers from './Speakers'
import Listeners from './Listeners'
import Chat from './Chat'

import { useMediaQuery } from 'react-responsive'
import ReactTimeAgo from 'react-time-ago'
import Hotkeys from 'react-hot-keys';
import copy from 'copy-to-clipboard';
import { toast } from 'react-toastify'
import { Audio as AudioLoader } from "react-loader-spinner"

import { doc, deleteDoc } from "firebase/firestore";
import { fireStore } from '../auth/Firebase'

import Divider from './Divider'
import { Dialog, Transition } from '@headlessui/react'
import { Row, Col } from 'react-flexbox-grid/dist/react-flexbox-grid'

import { FaBan,  FaCog, FaHeadphones, FaLink, FaMicrophone, FaMicrophoneSlash, FaUserPlus } from "react-icons/fa"
import { BsPeopleFill } from 'react-icons/bs'
import { HiPhoneMissedCall, HiSpeakerphone } from 'react-icons/hi'
import { IoMdChatboxes } from 'react-icons/io'
import { GoClock } from "react-icons/go"
import { AiFillHome, AiFillPushpin } from "react-icons/ai"

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
  const [open, setOpen] = useState(false);
  const [openTab, setOpenTab] = useState(1);

  const cancelButtonRef = useRef(null)
  const isTabletOrMobile: boolean = useMediaQuery({ maxWidth: 768 });

  if (!user.name) {
    //router.push('/')
    console.log('no username provided')
  }

  const {
    muteToggle,
    micMuted,
    startMicStream,
    checkMicPermission,
    micAccess
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
    if (!isHost) return
    startMicStream()
    
  }, [isHost, peerList.length, startMicStream])
  
  async function onLeave() {
    if (isHost) {
      const agree = confirm('Are you sure you want to close the room ?')
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

  const copyRoomLink = () => {
    copy(window.location.href);
    toast.success('Room link copied to clipboard', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  const topics = room.topics.split(" ")

  let muteAudio = new Audio("../../mute.wav")
  let unmuteAudio = new Audio("../../unmute.wav")

  let deafenAudio = new Audio("../../deafen.wav")
  let undeafenAudio = new Audio("../../undeafen.wav")

  const playMuteAudio = () => {
    micMuted ? muteAudio.play() : unmuteAudio.play();
  }

  const playDeafenAudio = () => {
    deafen ? deafenAudio.play() : undeafenAudio.play();
  }

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={setOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity bg-dark" />
            </Transition.Child>
            <div className="fixed z-10 inset-0 overflow-y-auto m-auto">
              <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0 text-white">
                <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className={`relative bg-darker rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 ${isTabletOrMobile ? 'w-12/12' : 'w-8/12'}`}>
                    <div className='bg-darker px-10 pt-5 pb-4 sm:p-6 sm:pb-4'>
                      <span className="text-2xl text-white font-bold flex"><FaCog size={19} className="mr-1 mt-2" /> Settings</span>
                      <Divider />
                      <div className="flex flex-wrap">
                        <div className="w-full">
                          <ul
                            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                            role="tablist"
                          >
                            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                              <a
                                className={
                                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                  (openTab === 1
                                    ? "text-white bg-primary"
                                    : "text-white bg-dark")
                                }
                                onClick={e => {
                                  e.preventDefault();
                                  setOpenTab(1);
                                }}
                                data-toggle="tab"
                                href="#link1"
                                role="tablist"
                              >
                                Room
                              </a>
                            </li>
                            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                              <a
                                className={
                                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                  (openTab === 2
                                    ? "text-white bg-primary"
                                    : "text-white bg-dark")
                                }
                                onClick={e => {
                                  e.preventDefault();
                                  setOpenTab(2);
                                }}
                                data-toggle="tab"
                                href="#link2"
                                role="tablist"
                              >
                                Shortcuts
                              </a>
                            </li>
                            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                              <a
                                className={
                                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                  (openTab === 3
                                    ? "text-white bg-primary"
                                    : "text-white bg-dark")
                                }
                                onClick={e => {
                                  e.preventDefault();
                                  setOpenTab(3);
                                }}
                                data-toggle="tab"
                                href="#link3"
                                role="tablist"
                              >
                                Debug
                              </a>
                            </li>
                          </ul>
                          <div className="relative flex flex-col min-w-0 break-words bg-dark w-full mb-6 shadow-lg rounded">
                            <div className="px-4 py-5 flex-auto">
                              <div className="tab-content tab-space">
                                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                                  <span className="text-xl text-white font-bold">
                                    Room settings
                                  </span>
                                  <br />
                                  <br /><span className="font-semibold">Title:</span> {room.title}
                                  <br /><span className="font-semibold">Description:</span> {room.description}
                                  <br /><span className="font-semibold">ID:</span> {roomId}
                                  <br />
                                  <br />
                                  <div className="flex space-x-2">
                                    <span className="font-semibold">Topics:</span> 
                                    <Col xs={12} sm={12} md={12} lg={12}>
                                      <Row className={`justify-start ${isTabletOrMobile && 'space-y-1'}`}>
                                        {
                                          topics.map((topic, key) => {
                                            return (
                                              <Col key={key}>
                                                <span key={key} className="bg-gray text-white text-sm font-medium mr-2 px-2 py-1 rounded-lg">#{topic}</span>
                                              </Col>
                                            )
                                          })
                                        }
                                      </Row>
                                    </Col>
                                  </div>
                                  <br /><span className="font-semibold">Your role: {connRole}</span>
                                  <br /><span className="font-semibold">Host: <Link href={`../../user/${room.createdBy}`}><span className='cursor-pointer'>@{room.createdBy}</span></Link></span>
                                  <br /><span className="font-semibold">Connected users: {peerList.length}</span>
                                  <Divider />
                                  <span className="text-xl text-white font-bold">Room Roles</span>
                                  <Col xs={12} sm={12} md={12} lg={12}>
                                    <Row className={`flex relative mt-5 space-x-1 justify-start ${isTabletOrMobile && 'space-y-1'}`}>
                                      <Col>
                                        <span className="bg-gray px-2 py-1 rounded-full text-white text-sm font-bold flex justify-center">
                                          <AiFillHome size={13} className="my-auto mr-1" /> Host
                                        </span>
                                      </Col>
                                      <Col>
                                        <span className="bg-gray px-2 py-1 rounded-full text-white text-sm font-bold flex  justify-center">
                                          <HiSpeakerphone size={13} className="my-auto mr-1" /> Speaker
                                        </span>
                                      </Col>
                                      <Col>
                                        <span className="bg-gray px-2 py-1 rounded-full text-white text-sm font-bold flex  justify-center">
                                          <FaHeadphones size={13} className="my-auto mr-1" /> Listener
                                        </span>
                                      </Col>
                                      <Col>
                                        <span className="bg-gray px-2 py-1 rounded-full text-white text-sm font-bold flex  justify-center">
                                          <FaMicrophoneSlash size={13} className="my-auto mr-1" /> Muted
                                        </span>
                                      </Col>
                                      <Col>
                                        <span className="bg-gray px-2 py-1 rounded-full text-white text-sm font-bold flex  justify-center">
                                          <FaMicrophone size={13} className="my-auto mr-1" /> Ummuted
                                        </span>
                                      </Col>
                                      <Col>
                                        <span className="bg-gray px-2 py-1 rounded-full text-white text-sm font-bold flex  justify-center">
                                          <FaBan size={13} className="my-auto mr-1" /> Ban
                                        </span>
                                      </Col>
                                    </Row>
                                  </Col>
                                  <Divider />
                                  <span className="text-xl text-white font-bold">Room Actions</span>
                                  <Row className="space-x-3 mt-2 ml-0.5">
                                    <Col>
                                    <button onClick={() => {muteToggle(); playMuteAudio()}} className='bg-primary text-white font-semibold px-5 py-2 rounded-lg mb-2'>
                                      {
                                        micMuted ? (
                                          <span className='flex justify-center'>
                                            <FaMicrophoneSlash className='my-auto mr-1' /> Unmute
                                          </span>
                                        ) : (
                                          <span className='flex justify-center'>
                                            <FaMicrophone className='my-auto mr-1' /> Mute
                                          </span>
                                        )
                                      }
                                    </button>
                                    </Col>

                                    <Col>
                                    <button onClick={() => {onLeave()}} className='bg-primary text-white font-semibold px-5 py-2 rounded-lg mb-2'>
                                      <span className="flex justify-center">
                                        <HiPhoneMissedCall className='my-auto mr-1' /> Leave
                                      </span>
                                    </button>
                                    </Col>

                                    <Col>
                                    <button onClick={() => copyRoomLink()} className='bg-primary text-white font-semibold px-5 py-2 rounded-lg mb-2'>
                                      <span className="flex justify-center">
                                        <FaLink className='my-auto mr-1' /> Copy link
                                      </span>
                                    </button>
                                    </Col>
                                  </Row>
                                </div>
                                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                  <span className="text-xl text-white font-bold">Keyboard shortcuts</span>
                                  <p>Here are some keyboard shortcuts below that can help you have better experience with Shibhouse:</p><br />
                                  <span className="badge bg-darker px-2 py-1 text-white font-bold rounded-lg">
                                    CTRL + M
                                  </span> For mute/unmute
                                  <br /><br />
                                  <span className="badge bg-darker px-2 py-1 text-white font-bold rounded-lg">
                                    CTRL + Q
                                  </span> For leaving the room
                                  <br /><br />
                                  <span className="badge bg-darker px-2 py-1 text-white font-bold rounded-lg">
                                    CTRL + I
                                  </span> For copying room link
                                  <br /><br />
                                  <span className="badge bg-darker px-2 py-1 text-white font-bold rounded-lg">
                                    CTRL + Y
                                  </span> For opening/closing settings
                                  <br /><br />
                                </div>
                                <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                                  <span className="text-xl text-white font-bold">Debug</span>
                                  <p>Here are some tools that can help you debug your errors</p><br />
                                  <span className="font-bold text-white">
                                    Mic access: {micAccess}
                                  </span>
                                  <br />
                                  <span className="font-bold text-white">
                                    Mic state: {micMuted ? 'muted' : 'unmuted'}
                                  </span>
                                  <br />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
        </Dialog>
      </Transition.Root>
      <Hotkeys 
        keyName="ctrl+m" 
        onKeyDown={() => {
          muteToggle();
          playMuteAudio();
        }}
      ></Hotkeys>
      <Hotkeys 
        keyName="ctrl+q" 
        onKeyDown={() => {
          onLeave();
        }}
      ></Hotkeys>
      <Hotkeys 
        keyName="ctrl+y" 
        onKeyDown={() => {
          setOpen(!open);
        }}
      ></Hotkeys>
      <Hotkeys 
        keyName="ctrl+i" 
        onKeyDown={() => copyRoomLink()}
      ></Hotkeys>
      <div className="bg-dark w-12/12 py-5 flex items-center">
        <div style={{width: '96%'}} className="mx-auto">
          <Row between="lg" middle="lg">
            <Col lg={9} md={7} sm={12} xs={12}>
              <h3 className="text-3xl font-bold text-white inline-flex items-center justify-start">
                <AudioLoader color="white" width={30} height={25} /> {room.title} <span className="bg-primary text-sm font-medium ml-2 mt-1 px-2.5 py-0.5 rounded inline-flex justify-center space-between"><BsPeopleFill className="mt-1 mr-1" /> {peerList.length}</span>
              </h3>
              <h4 className="text-lg font-normal text-white mt-3">{room.description}</h4>
                {
                  room.pinnedLink !== "" ? (
                    <>
                      <h4 className="text-sm text-white flex mt-3 font-semibold"><AiFillPushpin size={19} className="mb-1 mr-1" /><a href={room.pinnedLink} target="_blank" rel="noreferrer" >{room.pinnedLink}</a> </h4>
                    </>
                  ) : null
                }
                <Col xs={12} sm={12} md={12} lg={12} className="mt-2">
                  <Row className={`justify-start ${isTabletOrMobile && 'space-y-1'}`}>
                    {
                      topics.map((topic, key) => {
                        return (
                          <Col key={key}>
                            <span key={key} className="bg-gray text-white text-sm font-medium mr-2 px-2 py-1 rounded-lg">#{topic}</span>
                          </Col>
                        )
                      })
                    }
                  </Row>
                </Col>
                <h5 className="text-md font-normal text-white mt-5 flex space-x-1"><GoClock size={18} className="mt-1 text-primary" />&nbsp;Started {<ReactTimeAgo date={Number(room.createdAt)} />}&nbsp;with <span className="font-bold">@{room.createdBy}</span></h5>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <Row className={`flex relative mt-5 space-x-1 justify-start ${isTabletOrMobile && 'space-y-1'}`}>
                    <Col>
                      <span className="bg-gray px-2 py-1 rounded-full text-white text-sm font-bold flex justify-center">
                        <AiFillHome size={13} className="my-auto mr-1" /> Host
                      </span>
                    </Col>
                    <Col>
                      <span className="bg-gray px-2 py-1 rounded-full text-white text-sm font-bold flex  justify-center">
                        <HiSpeakerphone size={13} className="my-auto mr-1" /> Speaker
                      </span>
                    </Col>
                    <Col>
                      <span className="bg-gray px-2 py-1 rounded-full text-white text-sm font-bold flex  justify-center">
                        <FaHeadphones size={13} className="my-auto mr-1" /> Listener
                      </span>
                    </Col>
                    <Col>
                      <span className="bg-gray px-2 py-1 rounded-full text-white text-sm font-bold flex  justify-center">
                        <FaMicrophoneSlash size={13} className="my-auto mr-1" /> Muted
                      </span>
                    </Col>
                    <Col>
                      <span className="bg-gray px-2 py-1 rounded-full text-white text-sm font-bold flex  justify-center">
                        <FaMicrophone size={13} className="my-auto mr-1" /> Ummuted
                      </span>
                    </Col>
                    <Col>
                      <span className="bg-gray px-2 py-1 rounded-full text-white text-sm font-bold flex  justify-center">
                        <FaBan size={13} className="my-auto mr-1" /> Ban
                      </span>
                    </Col>
                  </Row>
                </Col>
              </Col>
              <Col lg={3} md={2} sm={12} xs={12}>
                <nav className={`flex rounded-xl items-center space-x-2" ${isTabletOrMobile && 'mt-3 mx-auto justify-center'}`}>
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
                  <button onClick={() => setOpen(true)} className="text-white/50 p-4 mb-1 inline-flex justify-center rounded-full hover:text-white hover:bg-gray/50 smooth-hover">
                    <FaCog size={20} />
                  </button>
                </nav>
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={12} md={8} lg={8}>
                <div className="p-4 mt-3 rounded-lg bg-darker">
                  <Speakers />
                </div>
                <div className="p-4 mt-3 rounded-lg bg-darker">
                  <Listeners />
                </div>
              </Col>
              <Col xs={12} sm={12} md={4} lg={4}>
                <div className="bg-darker p-4 mt-3 rounded-lg">
                  <h1 className="font-bold text-white text-2xl mb-4">Chat</h1>
                  <Chat roomId={roomId} />
                </div>
              </Col>
            </Row>
        </div>
      </div>
    </>
  )
}

export default PlayerMain