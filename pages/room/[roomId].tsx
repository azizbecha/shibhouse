import { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Head from "next/head"

import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

import { fireStore } from "../../auth/Firebase";
import { getDoc, doc } from "firebase/firestore";
import LoadingScreen from '../../lib/LoadingScreen'

import PrivateRoute from '../../auth/PrivateRoute';
import { AuthContext } from '../../auth/AuthContext';
import { sendBotMessage } from '../../lib/sendBotMessage'

const PlayerMain = dynamic(
  () => import('../../components/PlayerMain'),
  { ssr: false }
)

export default function RoomPage() {
  const router = useRouter()

  const { roomId } = router.query
  
  const [roomData, setRoomData] = useState<any>('')
  const { currentUserData } = useContext(AuthContext);
  
  useEffect(() => {
    const check = async () => {
      try {
        const roomRef = doc(fireStore, "rooms", String(roomId));
        const roomSnap = await getDoc(roomRef);
        if (roomSnap.exists()) {
          setRoomData(roomSnap.data());
          sendBotMessage(String(roomId), `@${currentUserData.username} joined the room !`);
        }
      } catch (e) {
        //console.log('error getting room data')
      }
      
    }
    check()
  }, [roomId])

  return (
    <PrivateRoute>
      <Head>
        <title>Listening to: {roomData.title} - Shibhouse</title>
        <meta name="description" content={roomData.description} />
      </Head>
      <Navbar />
      {
        roomData !== '' ? (
          roomData.createdBy == currentUserData.username ? (
            <PlayerMain
              roomId={String(roomId)}
              roomName={roomData.title}
              userName={currentUserData.username}
              firstname={currentUserData.firstname}
              lastname={currentUserData.lastname}
              avatar={currentUserData.avatarColor}
              pinnedLink={roomData.pinnedLink}
              topics={roomData.topics}
              roomDescription={roomData.description}
              createdAt={roomData.createdAt}
              createdBy={roomData.createdBy}
              isChatAllowed={roomData.allowChat}
              isHost={true}
              />
          ) : (
            <PlayerMain
              roomId={String(roomId)}
              userName={currentUserData.username}
              firstname={currentUserData.firstname}
              lastname={currentUserData.lastname}
              avatar={currentUserData.avatarColor}
              roomName={roomData.title}
              pinnedLink={roomData.pinnedLink}
              topics={roomData.topics}
              roomDescription={roomData.description}
              createdAt={roomData.createdAt}
              createdBy={roomData.createdBy}
              isChatAllowed={roomData.allowChat}
              isHost={false}
            />
          )
        ) : <LoadingScreen />
      }
      
      <Footer />
    </PrivateRoute>
  )
}
