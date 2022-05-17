import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Head from "next/head"

import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

import { fireStore } from "../../auth/Firebase";
import { getDoc, doc } from "firebase/firestore";
import LoadingScreen from '../../lib/LoadingScreen'

import PrivateRoute from '../../auth/PrivateRoute'

import { getAuth } from 'firebase/auth'

const PlayerMain = dynamic(
  () => import('../../components/PlayerMain'),
  { ssr: false }
)

export default function RoomPage() {
  const router = useRouter()
  const [userName, setUserName] = useState('')

  const { roomId } = router.query
  
  const [roomData, setRoomData] = useState<any>('')
  const [title, setTitle] = useState<string>("");
  
  useEffect(() => {
    const check = async () => {
      const auth = getAuth();
      try {
        const docRef = doc(fireStore, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          var d = docSnap.data()
          setUserName(d.username)
          console.log('my username:', userName)
        }
      } catch (e) {
        //console.log('error getting username')
      }
      
      try {
        const roomRef = doc(fireStore, "rooms", String(roomId));
        const roomSnap = await getDoc(roomRef);
        if (roomSnap.exists()) {
          setRoomData(roomSnap.data())
          console.log(roomData)
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
        <title>Listening to: {title} - Shibhouse</title>
        <meta name="description" content={roomData.description} />
      </Head>
      <Navbar />
      {
        roomData !== '' ? (
          roomData.createdBy == userName ? (
            <PlayerMain
              roomId={roomId}
              roomName={roomData.title}
              userName={userName}
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
              userName={userName}
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
