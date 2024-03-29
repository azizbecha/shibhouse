import React, { Fragment, useContext, useMemo } from 'react'

import User from './User'
import { PeerContext } from '../contexts/PeerJSContext'
import { StreamContext } from '../contexts/StreamContext'
import { sendBotMessage } from '../lib/sendBotMessage'

import { Row, Col } from 'react-flexbox-grid/dist/react-flexbox-grid'

import { FaTimes } from 'react-icons/fa'
import { HiOutlineBan, HiSpeakerphone } from 'react-icons/hi'

interface SpeakersProps {
  roomId: string
}

const Speakers: React.FC<SpeakersProps> = ({roomId}) => {
  
  const {
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
    <Fragment>
      <div className="bg-darker rounded-md p-1">
        <h1 className="font-bold text-white text-2xl mb-4 flex"><HiSpeakerphone size={19} className="mt-2 mr-2" /> Speakers ({speakers.length})</h1>
          <Row className="gap-y-2">
            {speakers.map((speaker, key) => (
              <Col key={key} xs={6} sm={4} md={4} lg={3}>
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
    </Fragment>
  )
}

export default Speakers