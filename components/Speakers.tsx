import { useContext, useMemo } from 'react'

import User from './User'
import { PeerContext } from '../contexts/PeerJSContext'
import { StreamContext } from '../contexts/StreamContext'
import useRoomEvents from '../hooks/useRoomEvents'

import { FaTimes } from 'react-icons/fa'
import { HiOutlineBan, HiSpeakerphone } from 'react-icons/hi'
import { Row, Col } from 'react-flexbox-grid/dist/react-flexbox-grid'
import { useAuth } from '../auth/AuthContext'
import { sendBotMessage } from '../lib/sendBotMessage'

interface Speakers {
  roomId: string
}

const Speakers: React.FC<Speakers> = ({roomId}) => {
  
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
  } = useContext<any>(PeerContext);
  
  const {
    checkMicPermission,
    micAudioStream,
    startMicStream,
  } = useContext<any>(StreamContext);

  const { currentUserData } = useAuth();

  const [recentEvents, roomEvents] = useRoomEvents();

  const speakers = useMemo(() => {
    checkMicPermission();
    return peerList
      .filter(Boolean)
      .filter(peer => peer.metadata.isSpeaker)
      .map(peer => {
        // Peer has stream
        let stream: any

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
  }, [peerList, incomingStreams, micAudioStream, peerId, checkMicPermission])
  
  return (
    <>
      <div className="bg-darker my-0 rounded-md p-2">
        <h1 className="font-bold text-white text-2xl mb-4 flex"><HiSpeakerphone size={19} className="mt-2 mr-2" /> Speakers ({speakers.length})</h1>
          <Row className="gap-y-2">
            {speakers.map((speaker, key) => (
              <Col key={key} xs={6} sm={4} md={4} lg={3}>
                {
                  console.log(speaker?.metadata)
                }
                <User
                  roomId={roomId}
                  id={peer}
                  key={speaker?.peer}
                  firstname={speaker.metadata.user.firstname}
                  lastname={speaker.metadata.user.lastname}
                  avatar={speaker.metadata.user.avatar}
                  name={speaker?.metadata?.user?.name ? speaker.metadata.user.name : 'Anonym'}
                  host={speaker?.metadata?.isHost}
                  me={speaker.peer === peerId}
                  stream={speaker.stream}
                  onClick={(connRole === 'host' && !speaker?.metadata?.isHost) ? () => {onDemotePeerToListener(speaker.peer); sendBotMessage(roomId, `@${speaker.metadata.user.name} is now a listener`)} : null }
                  hoverIcon={<FaTimes size={15} />}
                  speakerIcon={<HiSpeakerphone />}
                  kickIcon={<HiOutlineBan />}
                />
              </Col>
            ))}
          </Row>
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