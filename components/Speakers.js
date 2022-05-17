import { useRef, useContext, useEffect, useState, useMemo } from 'react'
import { FiX, FiPlus } from 'react-icons/fi'

import { PeerContext } from '../contexts/PeerJSContext'


import User from './User'
import { StreamContext } from '../contexts/StreamContext'
import useRoomEvents from '../hooks/useRoomEvents'

export default function Speakers() {
  const {
    // incomingStreams,
    peerConnError,
    // connRole,
    // peerId,
    userName,
    // onDemotePeerToListener,
    // incomingStreamsObj,
    streams: {
      incomingStreams,
    },
    state: {
      peerList,
      connRole,
      peer,
      peerId,
    },
    actions: {
      onPromotePeerToSpeaker,
      onDemotePeerToListener,
    },
  } = useContext(PeerContext)

  const {
    micAudioStream,
    startMicStream,
  } = useContext(StreamContext)

  const [recentEvents, roomEvents] = useRoomEvents()

  const speakers = useMemo(() => {
    return peerList
      .filter(Boolean)
      .filter(peer => peer.metadata.isSpeaker)
      .map(peer => {
        // Peer has stream
        let stream

        const peerHasStream = incomingStreams
          .find(call => call.call.peer === peer.peer)

        if (peerHasStream) {
          stream = peerHasStream?.audioStream
        }

        if (peer.peer === peerId) {
          stream = micAudioStream
        }

        return {
          ...peer,
          stream, // TODO: Add incoming stream for animation
        }
      })
  }, [peerList])


  return (
    <>
      <div className="bg-darker my-0 rounded-md p-5">
        <h1 className="font-bold text-white text-2xl mb-4">Speakers ({speakers.length})</h1>
          <div className="grid grid-cols-5 gap-4">
            {speakers.map(speaker => (
              <User
                key={speaker?.peer}
                name={speaker?.metadata?.user?.name ? speaker.metadata.user.name : 'Anonym'}
                host={speaker?.metadata?.isHost}
                me={speaker.peer === peerId}
                stream={speaker.stream}
                onClick={(connRole === 'host' && !speaker?.metadata?.isHost) ? () => {onDemotePeerToListener(speaker.peer)} : null }
              />
            ))}
          </div>
          <style jsx>{`
            audio {
              display: none;
            }
          `}</style>
        </div>
    </>
  )
}
