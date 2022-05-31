import { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Head from "next/head"

import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

import { fireStore } from "../../auth/Firebase";
import { getDoc, doc } from "firebase/firestore";
import LoadingScreen from '../../lib/LoadingScreen'

import PrivateRoute from '../../auth/PrivateRoute'
import { AuthContext } from '../../auth/AuthContext'

const PlayerMain = dynamic(
  () => import('../../components/PlayerMain'),
  { ssr: false }
)

export default function RoomPage() {
  const router = useRouter()
  const [userName, setUserName] = useState('')

  const { roomId } = router.query
  
  const [roomData, setRoomData] = useState<any>('')
  const { currentUserData } = useContext(AuthContext);
  
  useEffect(() => {
    const check = async () => {
      try {
        const roomRef = doc(fireStore, "rooms", String(roomId));
        const roomSnap = await getDoc(roomRef);
        if (roomSnap.exists()) {
          setRoomData(roomSnap.data())
        }
      } catch (e) {
        //console.log('error getting room data')
      }
      
    }
    check()
  }, [])

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
              roomId={roomId}
              roomName={roomData.title}
              userName={currentUserData.username}
              pinnedLink={roomData.pinnedLink}
              topics={roomData.topics}
              roomDescription={roomData.description}
              createdAt={roomData.createdAt}
              createdBy={roomData.createdBy}
              isHost={true}
              />
          ) : (
            <PlayerMain
              roomId={roomId}
              userName={currentUserData.username}
              roomName={roomData.title}
              pinnedLink={roomData.pinnedLink}
              topics={roomData.topics}
              roomDescription={roomData.description}
              createdAt={roomData.createdAt}
              createdBy={roomData.createdBy}
              isHost={false}
            />
          )
        ) : <LoadingScreen />
      }
      
      <Footer />
    </PrivateRoute>
  )
}
