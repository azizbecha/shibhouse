import React, { useContext, useEffect, useState, useRef, Fragment } from 'react'
import { NextRouter, useRouter } from 'next/router'
import Link from 'next/link'

import { PeerContextProvider, PeerContext } from '../contexts/PeerJSContext'
import { StreamContextProvider, StreamContext } from '../contexts/StreamContext'
import { sendBotMessage } from '../lib/sendBotMessage'
import { numberFormatter } from '../lib/numberFormatter'
import { AuthContext } from '../auth/AuthContext'
import SEO from '../utils/SEO'

import { PlayerProps } from '../interfaces'

import Speakers from './Speakers'
import Listeners from './Listeners'
import Chat from './Chat'
import Divider from './Divider'

import ReactTimeAgo from 'react-time-ago'
import Hotkeys from 'react-hot-keys';
import QRCode from "react-qr-code";
import toast from "react-hot-toast";
import { IUseNetworkState } from 'react-use/lib/useNetworkState'
import { useMediaQuery } from 'react-responsive'
import { Audio as AudioLoader } from "react-loader-spinner"
import { useNetworkState, useCopyToClipboard } from 'react-use';

import { doc, deleteDoc, getDoc } from "firebase/firestore";
import { fireStore } from '../auth/Firebase'

import { Dialog, Transition } from '@headlessui/react'
import { Row, Col } from 'react-flexbox-grid/dist/react-flexbox-grid'

import { FaBan, FaBug, FaCog, FaHandPeace, FaHeadphones, FaKeyboard, FaLink, FaMicrophone, FaMicrophoneSlash, FaQrcode, FaTerminal, FaUserPlus } from "react-icons/fa"
import { BsPeopleFill } from 'react-icons/bs'
import { HiSpeakerphone } from 'react-icons/hi'
import { RiChatOffFill } from 'react-icons/ri'
import { GoClock } from "react-icons/go"
import { AiFillHome, AiFillPushpin } from "react-icons/ai"
import { IoMdChatboxes } from 'react-icons/io'
import { MdContentCopy } from 'react-icons/md'

import { PinnedLink } from './PinnedLink'
import { requestNotificationPermission } from '../lib/requestNotificationPermission'
import LoadingScreen from './LoadingScreen'

const PlayerMain: React.FC<PlayerProps> =  ({ roomId }) => {
  const [roomData, setRoomData] = useState<any>(null);
  const { currentUserData } = useContext(AuthContext);
  const router: NextRouter = useRouter();

  const check = async () => {
    try {
      const roomRef = doc(fireStore, "rooms", String(roomId));
      const roomSnap= await getDoc(roomRef);
      if (roomSnap.exists()) {
        setRoomData(roomSnap.data());
        sendBotMessage(String(roomId), `@${currentUserData.username} joined the room !`);
      } else {
        toast.error("Room does not exist");
        router.push('/');
      }
    } catch (e) {
      //console.log('error getting room data')
    }
    
  }

  useEffect(() => {
    check();
    requestNotificationPermission();
  }, []);

  if (roomData !== null) {
    const isHost: boolean = roomData.createdBy == currentUserData.username;
    const topics = roomData.topics;
    return (
      <StreamContextProvider>
        <PeerContextProvider initialContext={{
          isHost,
          roomId,
          user: {
            name: currentUserData.username,
            firstname: currentUserData.firstname,
            lastname: currentUserData.lastname,
            avatar: currentUserData.avatarColor
          },
        }}>
          <Main user={{
            username: currentUserData.username,
            firstname: currentUserData.firstname,
            lastname: currentUserData.lastname,
            avatar: currentUserData.avatarColor
          }} room={{
            title: roomData.title,
            description: roomData.description,
            pinnedLink: roomData.pinnedLink,
            topics: topics,
            createdAt: roomData.createdAt,
            createdBy: roomData.createdBy,
            allowChat: roomData.allowChat
          }} />
        </PeerContextProvider>
      </StreamContextProvider>
    )
  } else {
    return (
      <LoadingScreen />
    )
  }
}

function Main ({ user, room }) {

  const router: NextRouter = useRouter();
  const networkState: IUseNetworkState = useNetworkState();
  const [state, copyToClipboard] = useCopyToClipboard();

  const [showChat, setShowChat] = useState<boolean>(true);
  const [openSettings, setOpenSettings] = useState<boolean>(false);
  const [openInvite, setOpenInvite] = useState<boolean>(false);
  const [openTab, setOpenTab] = useState<Number>(1);

  const cancelButtonRef = useRef(null)
  const isTabletOrMobile: boolean = useMediaQuery({ maxWidth: 768 });
  const [devices, setDevices] = useState<Array<{ id: string; label: string }>>([]);

  if (!user.username) {
    console.log('no username provided');
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
    startMicStream()
    
  }, [isHost, peerList.length, startMicStream])

  useEffect(() => {
    window.onbeforeunload = async () => {
      onLeave();
    };
  }, [])

  useEffect(() => {
    if (connRole == 'speaker' && devices.length === 0) {
      toast.error("You do not have a mic to speak");
      checkMicPermission();
    }
  }, [connRole, devices.length]);
  
  async function onLeave() {
    if (isHost) {
      const agree: boolean = confirm('Are you sure you want to close the room ?');
      if (!agree) return
      if (agree) {
        await deleteDoc(doc(fireStore, "rooms", roomId));
        toast.success('Room deleted');
      }
    }

    if (connToHost) connToHost.close();
    
    if (outgoingStreams) {
      outgoingStreams.forEach(conn => {
        conn.close();
      })
    }

    if (connectedPeers) {
      connectedPeers.forEach(conn => {
        conn.close();
      })
    }

    if (incomingStreams) {
      incomingStreams.forEach(conn => {
        conn.call.close();
      })
    }
    
    sendBotMessage(roomId, `@${user.username} left the room`);
    router.push('/dashboard');
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

  if (!networkState.online) {
    toast.error("You are offline !");
  }

  const copyRoomLink = () => {
    copyToClipboard(roomId);
    toast.success('Room ID copied to clipboard');
  }

  const toggleChat = () => {
    setShowChat(!showChat);
  }

  const topics = room.topics;

  return (
    <Fragment>
      <SEO title={`(${peerList.length}) ${room.title} | ShibHouse`} description={`${room.description} - Live now at ShibHouse`} />
      {/* Start settings modal */}
      <Transition.Root show={openSettings} as={Fragment}>
        <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={setOpenSettings}>
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
            <div className="flex items-center justify-center min-h-full p-4 text-center sm:p-0 text-white">
              <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className={`relative bg-darker rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 ${isTabletOrMobile ? 'w-full' : 'w-8/12'}`}>
                  <div className='bg-darker px-3 pt-5 pb-4 sm:p-6 sm:pb-4'>
                    <span className="text-2xl text-white font-bold flex"><FaCog size={19} className="mr-1 mt-2" /> Settings</span>
                    <Divider />
                    <div className="flex flex-wrap">
                      <div className="w-full">
                        <ul
                          className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                          role="tablist"
                        >
                          <li className="mb-2 mr-2 last:mr-0 flex-auto text-center">
                            <a
                              className={
                                "text-sm font-bold flex justify-center uppercase px-5 py-3 shadow-lg rounded leading-normal text-white " +
                                (openTab === 1
                                  ? "bg-primary"
                                  : "bg-dark")
                              }
                              onClick={e => {
                                e.preventDefault();
                                setOpenTab(1);
                              }}
                              data-toggle="tab"
                              href="#link1"
                              role="tablist"
                            >
                              <AiFillHome className='my-auto mr-1' /> Room
                            </a>
                          </li>
                          <li className="mb-2 mr-2 last:mr-0 flex-auto text-center">
                            <a
                              className={
                                "text-sm font-bold flex justify-center uppercase px-5 py-3 shadow-lg rounded leading-normal text-white " +
                                (openTab === 2
                                ? "bg-primary"
                                : "bg-dark")
                              }
                              onClick={e => {
                                e.preventDefault();
                                setOpenTab(2);
                              }}
                              data-toggle="tab"
                              href="#link2"
                              role="tablist"
                            >
                              <FaKeyboard className='my-auto mr-1' /> Shortcuts
                            </a>
                          </li>
                          <li className="mb-2 mr-2 last:mr-0 flex-auto text-center">
                            <a
                              className={
                                "text-sm font-bold flex justify-center uppercase px-5 py-3 shadow-lg rounded leading-normal text-white " +
                                (openTab === 3
                                ? "bg-primary"
                                : "bg-dark")
                              }
                              onClick={e => {
                                e.preventDefault();
                                setOpenTab(3);
                              }}
                              data-toggle="tab"
                              href="#link3"
                              role="tablist"
                            >
                              <FaTerminal className='my-auto mr-1' /> Commands
                            </a>
                          </li>
                          <li className="mr-2 last:mr-0 flex-auto text-center">
                            <a
                              className={
                                "text-sm font-bold flex justify-center uppercase px-5 py-3 shadow-lg rounded leading-normal text-white " +
                                (openTab === 4
                                ? "bg-primary"
                                : "bg-dark")
                              }
                              onClick={e => {
                                e.preventDefault();
                                setOpenTab(4);
                              }}
                              data-toggle="tab"
                              href="#link3"
                              role="tablist"
                            >
                              <FaBug className='my-auto mr-1' /> Debug
                            </a>
                          </li>
                        </ul>
                        <div className="relative flex flex-col break-words bg-dark w-full mb-6 shadow-lg rounded">
                          <div className="px-4 py-5 flex-auto">
                            <div className="tab-content tab-space">
                              <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                                <span className="flex text-xl text-white font-bold">
                                  <AiFillHome className='my-auto mr-1' /> Room settings
                                </span>
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
                                        topics.map((topic, key: number) => {
                                          return (
                                              <span key={key} className="bg-darker text-white text-sm font-semibold mr-2 px-2 py-1 rounded-lg">#{topic.text}</span>
                                          )
                                        })
                                      }
                                    </Row>
                                  </Col>
                                </div>
                                <br /><span className="font-semibold">Your role: </span>{connRole}
                                <br /><span className="font-semibold">Host: </span><Link href={`../../user/${room.createdBy}`}><span className='font-semibold bg-darker rounded px-1 py-0.5 cursor-pointer'>@{room.createdBy}</span></Link>
                                <br /><span className="font-semibold">Connected users: </span>{peerList.length}
                                
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
                                        <FaMicrophone size={13} className="my-auto mr-1" /> Unmuted
                                      </span>
                                    </Col>
                                    <Col>
                                      <span className="bg-gray px-2 py-1 rounded-full text-white text-sm font-bold flex  justify-center">
                                        <FaBan size={13} className="my-auto mr-1" /> Ban
                                      </span>
                                    </Col>
                                  </Row>
                                </Col>
                              </div>
                              <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                <span className="flex text-xl text-white font-bold"><FaKeyboard className='my-auto mr-1.5' /> Keyboard shortcuts</span>
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
                                </span> For copying room ID
                                <br /><br />
                                <span className="badge bg-darker px-2 py-1 text-white font-bold rounded-lg">
                                  CTRL + Y
                                </span> For opening/closing settings
                                <br /><br />
                                <span className="badge bg-darker px-2 py-1 text-white font-bold rounded-lg">
                                  CTRL + B
                                </span> For opening/closing chat
                                <br /><br />
                              </div>

                              <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                                <span className="flex text-xl text-white font-bold"><FaTerminal className='my-auto mr-1.5' /> Commands</span>
                                <p>Here are some commands that can help you having better interaction in chats</p><br />
                                <Row>
                                  <Col lg={4}>
                                    <span className="badge bg-darker px-2 py-1 text-white font-bold rounded-lg">
                                      /copy
                                    </span> To copy Room ID
                                    <br /><br />
                                  </Col>

                                  <Col lg={4}>
                                    <span className="badge bg-darker px-2 py-1 text-white font-bold rounded-lg">
                                      /leave
                                    </span> To leave the room
                                    <br /><br />
                                  </Col>

                                  <Col lg={4}>
                                    <span className="badge bg-darker px-2 py-1 text-white font-bold rounded-lg">
                                      /mic
                                    </span> To mute / unmute the microphone
                                    <br /><br />
                                  </Col>

                                  <Col lg={4}>
                                    <span className="badge bg-darker px-2 py-1 text-white font-bold rounded-lg">
                                      /role
                                    </span> To check your role in the current room
                                    <br /><br />
                                  </Col>

                                  <Col lg={4}>
                                    <span className="badge bg-darker px-2 py-1 text-white font-bold rounded-lg">
                                      /whoami
                                    </span> To see your username in the current room
                                    <br /><br />
                                  </Col>

                                  <Col lg={4}>
                                    <span className="badge bg-darker px-2 py-1 text-white font-bold rounded-lg">
                                      /micaccess
                                    </span> For checking microphone access permission
                                    <br /><br />
                                  </Col>

                                  <Col lg={4}>
                                    <span className="badge bg-darker px-2 py-1 text-white font-bold rounded-lg">
                                      /rabye
                                    </span> For playing Rabye Bouden's vocal saying "Sa7a Bitcoin Rab3oun"
                                    <br /><br />
                                  </Col>

                                  <Col lg={4}>
                                    <span className="badge bg-darker px-2 py-1 text-white font-bold rounded-lg">
                                      /request
                                    </span> For requesting to speak
                                    <br /><br />
                                  </Col>
                                  
                                </Row>
                              </div>

                              <div className={openTab === 4 ? "block" : "hidden"} id="link3">
                                <span className="flex text-xl text-white font-bold"><FaBug className='my-auto mr-1.5' /> Debug</span>
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
      {/* End settings modal */}

      {/* Start Invite Modal */}
      <Transition.Root show={openInvite} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpenInvite}>
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

          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className={`relative bg-darker rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 ${isTabletOrMobile ? 'w-12/12' : 'w-5/12'}`}>
                  <div className="bg-darker px-3 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex-shrink-0 flex items-center justify-center h-14 w-14 rounded-full bg-primary sm:mx-0 sm:h-10 sm:w-10">
                        <FaUserPlus className="h-5 w-5 text-white" aria-hidden="true" />
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-white">
                          Invite to room
                        </Dialog.Title>
                        <div className="mt-1">
                          <p className="text-sm text-white">
                            Invite your friends to join the current room and chill together !
                          </p>
                        </div>
                        <Divider />
                        <div className="text-white">
                          <Row>
                            <Col>
                              <p className="font-semibold text-xl font-inter flex mb-1"><FaQrcode className='my-auto mr-1' /> Scannable QR Code</p>
                              <span className="text-white font-normal text-md">You can scan the following QR Code to send the link to anyone:</span>
                              <QRCode className='mt-4 mx-auto' value={roomId} />
                            </Col>

                            <Col className="mt-4">
                              <p className="font-semibold text-xl font-inter flex mb-1"><FaLink className='my-auto mr-1' /> Link</p>
                              <span className="text-white font-normal text-md">Or you can simply copy the Room ID:</span><br />
                              <span onClick={() => copyRoomLink()} className="text-white text-center font-semibold cursor-pointer">
                                {roomId}
                              </span><br />
                              <button onClick={() => copyRoomLink()} className="flex justify-center bg-primary px-4 py-2 text-white text-center font-semibold rounded-md mt-5">
                                <FaLink className='my-auto mr-1' size={14} /> Copy Link
                              </button>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-primary text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setOpenInvite(false)}
                      ref={cancelButtonRef}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      {/* End Invite Modal */}

      <Hotkeys 
        keyName="ctrl+m" 
        onKeyDown={() => {
          muteToggle();
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
        onKeyDown={() => setOpenSettings(!openSettings)}
      ></Hotkeys>
      <Hotkeys 
        keyName="ctrl+i" 
        onKeyDown={() => setOpenInvite(!openInvite)}
      ></Hotkeys>
      <Hotkeys 
        keyName="ctrl+b" 
        onKeyDown={() => toggleChat()}
      ></Hotkeys>

      <div className="bg-dark w-12/12 py-5 flex items-center">
        <div style={{width: '96%'}} className="mx-auto">
          <Row between="lg" middle="lg">
            <Col lg={9} md={7} sm={12} xs={12}>
              <h3 className="text-3xl font-bold text-white inline-flex items-center justify-start">
                <AudioLoader color="white" width={30} height={25} /> {room.title} <span className="bg-primary text-sm font-medium ml-2 mt-1 px-2.5 py-0.5 rounded inline-flex justify-center space-between"><BsPeopleFill size={15} className="mt-0.5 mr-1" /> {numberFormatter(peerList.length)}</span>
              </h3>
              <h4 className="text-lg font-normal text-white mt-3">{room.description}</h4>
              <h4 onClick={() => copyRoomLink()} className="text-sm text-white flex mt-3 font-semibold cursor-pointer"><MdContentCopy size={19} className="mb-1 mr-1" />{roomId}</h4>
                {
                  room.pinnedLink !== "" ? (
                    <h4 className="text-sm text-white flex mt-3 font-semibold"><AiFillPushpin size={19} className="mb-1 mr-1" /><a href={room.pinnedLink} target="_blank" rel="noreferrer" >{room.pinnedLink}</a></h4>
                  ) : null
                }
                <Col xs={12} sm={12} md={12} lg={12} className="mt-2">
                  <Row className={`justify-start ${isTabletOrMobile && 'space-y-1'}`}>
                    {
                      topics.map((topic, key) => {
                        return (
                          <Col key={key}>
                            <span key={key} className="bg-gray text-white text-sm font-medium mr-2 px-2 py-1 rounded-lg">#{topic.text}</span>
                          </Col>
                        )
                      })
                    }
                  </Row>
                </Col>
                <h5 className="text-md font-normal text-white mt-5 flex space-x-1"><GoClock size={18} className="mt-1 text-primary" />&nbsp;Started {<ReactTimeAgo date={Number(room.createdAt)} />}&nbsp;with <Link href={`../../../user/${room.createdBy}`}><span className="font-bold bg-gray px-1 rounded-lg cursor-pointer">@{room.createdBy}</span></Link></h5>
               
              </Col>
              <Col lg={3} md={2} sm={12} xs={12}>
                <div className={`flex bg-darker py-0.5 rounded-full items-center justify-center space-x-2" ${isTabletOrMobile && 'mt-3 mx-auto'}`}>
                  {(isHost || connRole === 'speaker') && (
                    <span onClick={() => {muteToggle();}} className="mb-1 m-1">
                      <button className={`p-4 inline-flex justify-center rounded-full ${micMuted ? 'text-white bg-primary hover:bg-secondary rounded-full' : 'text-white/50 hover:bg-gray/50'} smooth-hover`}>
                        { micMuted ? <FaMicrophoneSlash size={20} /> : <FaMicrophone size={20} />}
                      </button>
                    </span>
                  )}

                  <button onClick={() => setOpenInvite(true)} className={`p-4 m-1 inline-flex justify-center rounded-full ${openInvite ? 'text-white bg-primary hover:bg-secondary rounded-full' : 'text-white/50 hover:bg-gray/50'} smooth-hover`}>
                    <FaUserPlus className='mb-1'  size={20} />
                  </button>

                  <button onClick={() => { toggleChat() } } className={`p-4 m-1 inline-flex justify-center rounded-full ${!showChat ? 'text-white bg-primary hover:bg-secondary rounded-full' : 'text-white/50 hover:bg-gray/50'} smooth-hover`}>
                    {showChat ? <IoMdChatboxes size={24} /> : <RiChatOffFill size={20} />}
                  </button>
                  
                  <button onClick={() => setOpenSettings(true)} className={`p-4 m-1 inline-flex justify-center rounded-full ${openSettings ? 'text-white bg-primary hover:bg-secondary rounded-full' : 'text-white/50 hover:bg-gray/50'} smooth-hover`}>
                    <FaCog size={20} />
                  </button>

                  <button onClick={onLeave} className="text-white/50 p-4 m-1 inline-flex justify-center rounded-full hover:text-white hover:bg-gray/50 smooth-hover">
                    <FaHandPeace size={20} />
                  </button>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={12} md={8} lg={showChat ? 8 : 12}>
                <div className="p-4 mt-3 rounded-lg bg-darker">
                  <Speakers roomId={roomId} />
                </div>
                 <div className="p-4 mt-3 rounded-lg bg-darker">
                  <Listeners roomId={roomId} />
                </div>
              </Col>
              {
                showChat && (
                  <Col xs={12} sm={12} md={4} lg={4}>
                    <PinnedLink link={room.pinnedLink} />
                    <div className="bg-darker p-4 mt-3 rounded-lg h-96">
                      <div className="flex">
                        <h1 className="font-bold mb-2 text-white text-2xl flex justify-center"><IoMdChatboxes size={24} className="mt-1 mr-1" /> Chat</h1>
                      </div>
                      <Chat 
                        roomId={roomId}
                        isChatAllowed={room.allowChat}
                        pinnedLink={room.pinnedLink}
                        leave={onLeave}
                        role={connRole}
                        username={user.username}
                        creator={room.createdBy}
                        muteToggle={() => {
                          muteToggle();
                        }}
                      />
                    </div>
                  </Col>
                )
              }
            </Row>
        </div>
      </div>
    </Fragment>
  )
}

export default PlayerMain