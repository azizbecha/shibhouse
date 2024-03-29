/* eslint-disable @next/next/no-img-element */
import { useContext, useMemo } from 'react'

import { PeerContext } from '../contexts/PeerJSContext'
import { sendBotMessage } from '../lib/sendBotMessage'
import useRoomEvents from '../hooks/useRoomEvents'
import User from './User'

import QRCode from 'react-qr-code'
import toast from "react-hot-toast";
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { FaHeadphones, FaLink, FaPlus, FaBan } from 'react-icons/fa'
import { Row, Col } from 'react-flexbox-grid/dist/react-flexbox-grid'

interface ListenersProps {
  roomId: string
}

const Listeners: React.FC<ListenersProps> = ({roomId}) => {
  const {
    state: {
      peerId,
      peerList,
      isHost,
    },
    actions: {
      onPromotePeerToSpeaker,
      onDemotePeerToListener
    },
  } = useContext<any>(PeerContext);

  const [recentEvents, roomEvents] = useRoomEvents()

  const listenersPeers = peerList
    .filter(peer => !peer.metadata.isSpeaker)

  function handleUserClick(peer) {
    if (!isHost) onDemotePeerToListener(peer.peer);
    onPromotePeerToSpeaker(peer.peer);
  }

  const reactions = useMemo(() => {
    return recentEvents
      .filter(({eventName}) => eventName === 'reaction')
  }, [recentEvents])

  return (
    <div className="bg-darker rounded-md p-2">
      <h1 className="font-bold text-white text-2xl mb-4 flex"><FaHeadphones size={19} className='mt-2 mr-2' /> Listeners ({listenersPeers.length})</h1>
      {
        listenersPeers.length == 0 && (
          <div className='flex w-12/12'>
            <div className='mx-auto'>
              <img src='../../images/shiba-inu-with-rocket.png' alt="Shiba inu with rocket image" className='w-3/12 object-center mx-auto mb-5' />
              <h1 className="text-white text-xl text-center font-normal font-inter">Looks like there are no listeners with you in this room.</h1>
              <h2 className='text-white text-center text-lg font-inter flex items-center justify-center mt-1'>Invite your friends to join the room with this link:<br /></h2>
              <CopyToClipboard text={window.location.href} onCopy={() => {
                toast.success('Link copied');
              }}>
                <>
                  <div className='flex justify-center text-center text-white font-semibold text-sm mt-3 cursor-pointer'>
                    <FaLink size={13} className="my-auto mr-1" /> {window.location.href}
                  </div>
                  <div className="mx-auto flex justify-center mt-2">
                    <div className="border-8 border-white rounded-2xl bg-white flex">
                      <QRCode className='mx-auto rounded-2xl flex justify-center border-white' value={roomId} />
                    </div>
                  </div>
                </>
              </CopyToClipboard>
            </div>
          </div>
        )
      }
      <Row className="gap-y-2">
        {listenersPeers.map((peer, key) => (
          <Col key={key} xs={6} sm={4} md={4} lg={3} className="px-1">
            <User
              roomId={roomId}
              id={peer}
              key={peer.peer}
              me={peer.peer === peerId}
              firstname={peer.metadata?.user?.firstname}
              lastname={peer.metadata?.user?.lastname}
              avatar={peer.metadata?.user?.avatar}
              name={peer.metadata?.user?.name || 'Anonym'}
              onClick={isHost ? () => {handleUserClick(peer); sendBotMessage(roomId, `@${peer.metadata?.user?.name} is now a speaker`);} : null}
              hoverIcon={<FaPlus size={15} />}
              reaction={reactions.find(({peer: peerId}) => peerId === peer.peer)?.eventContent}
              kickIcon={<FaBan />}
            />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Listeners