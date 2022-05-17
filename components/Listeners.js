import { useContext, useMemo } from 'react'

import { PeerContext } from '../contexts/PeerJSContext'
import useRoomEvents from '../hooks/useRoomEvents'
import User from './User'

export default function Listeners() {
  const {
    state: {
      peerId,
      connRole,
      peerList,
      isHost,
    },
    actions: {
      onPromotePeerToSpeaker,
    },
  } = useContext(PeerContext)

  const [recentEvents, roomEvents] = useRoomEvents()

  const listenersPeers = peerList
    .filter(peer => !peer.metadata.isSpeaker)

  function handleUserClick(peer) {
    if (!isHost) return
    onPromotePeerToSpeaker(peer.peer)
  }

  return (
    <>
      <div className="grid">
        <div className="bg-darker rounded-md p-5">
          <h1 className="font-bold text-white text-2xl mb-4">Listeners ({listenersPeers.length})</h1>
          <div className="grid md:grid-cols-5 gap-5 sm:grid-cols-2">
            { listenersPeers.map(peer => (
              <User
                key={peer.peer}
                me={peer.peer === peerId}
                name={peer.metadata?.user?.name || 'Anonym'}
                onClick={isHost ? () => handleUserClick(peer) : null}
              />
            ))}
            
          </div>
        </div>
      </div>
    </>
  )
}
