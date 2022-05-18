import { useContext, useMemo } from 'react'
import { FaLink } from 'react-icons/fa'

import { PeerContext } from '../contexts/PeerJSContext'
import useRoomEvents from '../hooks/useRoomEvents'
import User from './User'

import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify'

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
      <div className="bg-darker rounded-md p-5">
        <h1 className="font-bold text-white text-2xl mb-4">Listeners ({listenersPeers.length})</h1>
          {
            listenersPeers.length == 0 && (
              <div className='flex w-12/12'>
                <div className='mx-auto'>
                  <img src='../../shiba-inu-with-rocket.png' className='w-3/12 object-center mx-auto mb-5' />
                  <h1 className="text-white text-xl text-center font-normal font-inter">Looks like there are no listeners with you in this room.</h1>
                  <h2 className='text-white text-center text-lg font-inter flex items-center justify-center mt-1'>Invite your friends to join the room with this link:<br /></h2>
                  <CopyToClipboard text={window.location.href} onCopy={() => {
                    toast.success('Link copied', {
                      position: "top-center",
                      autoClose: 4000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });
                  }}>
                    <div className='flex justify-center text-center text-white font-normal text-xl mt-3 cursor-pointer'>
                      <FaLink size={16} className="mt-2 mr-1" /> {window.location.href}
                    </div>
                  </CopyToClipboard>
                </div>
              </div>
            )
          }
        <div className="grid md:grid-cols-5 gap-5 sm:grid-cols-2 mx-auto w-12/12">
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
    </>
  )
}
