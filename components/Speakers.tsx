import { useContext, useMemo } from 'react'

import User from './User'
import { PeerContext } from '../contexts/PeerJSContext'
import { StreamContext } from '../contexts/StreamContext'
import useRoomEvents from '../hooks/useRoomEvents'

import { FaTimes } from 'react-icons/fa'
import { HiOutlineBan, HiSpeakerphone } from 'react-icons/hi'

const Speakers: React.FC = () => {
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
      onDemotePeerToListener,
    },
  } = useContext<any>(PeerContext)

  const {
    micAudioStream,
    startMicStream,
  } = useContext<any>(StreamContext)

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
      <div className="bg-darker my-0 rounded-md p-2">
        <h1 className="font-bold text-white text-2xl mb-4">Speakers ({speakers.length})</h1>
          <div className="grid md:grid-cols-4 gap-5 sm:grid-cols-3">
            {speakers.map(speaker => (
              <User
                id={peer}
                key={speaker?.peer}
                name={speaker?.metadata?.user?.name ? speaker.metadata.user.name : 'Anonym'}
                host={speaker?.metadata?.isHost}
                me={speaker.peer === peerId}
                stream={speaker.stream}
                onClick={(connRole === 'host' && !speaker?.metadata?.isHost) ? () => {onDemotePeerToListener(speaker.peer)} : null }
                hoverIcon={<FaTimes size={15} />}
                speakerIcon={<HiSpeakerphone />}
                kickIcon={<HiOutlineBan />}
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

export default Speakers