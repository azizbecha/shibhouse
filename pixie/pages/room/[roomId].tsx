import { NextRouter, useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import PrivateRoute from '../../auth/PrivateRoute'

import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

const PlayerMain = dynamic(
  () => import('../../components/PlayerMain'),
  { ssr: false }
)

export default function RoomPage() {
  const router: NextRouter = useRouter();

  const { roomId } = router.query;

  return (
    <PrivateRoute>
      <Navbar />
      <PlayerMain roomId={String(roomId)} />
      <Footer />
    </PrivateRoute>
  )
}
