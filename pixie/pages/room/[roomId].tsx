import { useState, useContext, useEffect } from 'react'
import { NextRouter, useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import PrivateRoute from '../../auth/PrivateRoute'
import { getDoc, doc, DocumentReference, DocumentData, DocumentSnapshot } from "firebase/firestore"
import { AuthContext } from '../../auth/AuthContext'
import { fireStore } from "../../auth/Firebase"

import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import LoadingScreen from '../../components/LoadingScreen'

import { sendBotMessage } from '../../lib/sendBotMessage'
import SEO from '../../utils/SEO'
import { requestNotificationPermission } from '../../lib/requestNotificationPermission'
import { toast } from 'react-hot-toast'

const PlayerMain = dynamic(
  () => import('../../components/PlayerMain'),
  { ssr: false }
)

export default function RoomPage() {
  const router: NextRouter = useRouter();

  const { roomId } = router.query;
  
  const [roomData, setRoomData] = useState<any>('');
  const { currentUserData } = useContext(AuthContext);
  
  const check = async () => {
    try {
      const roomRef: DocumentReference<DocumentData> = doc(fireStore, "rooms", String(roomId));
      const roomSnap: DocumentSnapshot<DocumentData> = await getDoc(roomRef);
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

  return (
    <PrivateRoute>
      <SEO title={`${roomData.title} | Shibhouse`} description={`${roomData.description} - Live now at Shibhouse`} />
      <Navbar />
      {
        roomData !== '' ? (
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
            isHost={roomData.createdBy == currentUserData.username}
          />
        ) : <LoadingScreen />
      }
      <Footer />
    </PrivateRoute>
  )
}
