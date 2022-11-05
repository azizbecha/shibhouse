import { Fragment, useContext, useEffect, useState } from 'react'

import hark from 'hark'
import { useMediaQuery } from 'react-responsive'

import { FaMicrophone, FaMicrophoneAltSlash } from 'react-icons/fa'
import { AiFillHome } from 'react-icons/ai'

import { PeerContext } from '../contexts/PeerJSContext'
import { StreamContext } from '../contexts/StreamContext'
import { sendBotMessage } from '../lib/sendBotMessage'
import { VolumeIndicator } from './VolumeIndicator'
import { RoomMemberProps } from '../interfaces'

const User: React.FC<RoomMemberProps> = ({ host, onClick, muted, me, stream, name, highlight, hoverIcon, reaction, kickIcon, key, id, speakerIcon, firstname, lastname, avatar, roomId,  ...props }) => {
  const isTabletOrMobile: boolean = useMediaQuery({ maxWidth: 768 });
  const [speaking, setSpeaking] = useState<boolean>(false);

  const {
    state: {
      connToHost,
      connRole,
      connectedPeers,
    },
    streams: {
      incomingStreams,
      outgoingStreams,
    },

  } = useContext<any>(PeerContext);

  const { micMuted, muteToggle } = useContext<any>(StreamContext);
  const [volume, setVolume] = useState<number>(100);

  let muteAudio: HTMLAudioElement = new Audio("../../sounds/mute.wav");
  let unmuteAudio: HTMLAudioElement = new Audio("../../sounds/unmute.wav");

  const playMuteAudio = () => {
    micMuted ? muteAudio.play() : unmuteAudio.play();
  }

  useEffect(() => {
    if (!stream) return
    // if (!stream instanceof MediaStream) return
    const speechEvents = hark(stream);
    speechEvents.on('speaking', () => setSpeaking(true));
    speechEvents.on('stopped_speaking', () => setSpeaking(false));
    speechEvents.on('volume_change', (volumeLevel: number) => {

    /*
      * Examples to explain why I used those Math methods:
      * Math.round(-82.752342) => returns -83
      * Math.abs(-83) => returns 83
    */

      setVolume(Math.abs(Math.round(volumeLevel)));
    });

  }, [stream])

  return (
    <div {...props}>
      <div className={`bg-dark text-white py-1 rounded-lg ${isTabletOrMobile && 'px-1'}`}>
        <div className="container my-3">
          <div className={`w-20 py-5 relative text-white text-center font-bold text-2xl rounded-full mb-1 shadow-lg mx-auto border-4 ${speaking ? 'border-primary' : 'border-gray'}`} style={{backgroundColor: avatar}}>
            {firstname[0].toUpperCase()}{lastname[0].toUpperCase()}

            { onClick && hoverIcon && (
              <Fragment>
                <div className="p-1 right-0 -bottom-1 bg-darker rounded-full border-white absolute" style={{borderWidth: '1.5px'}} onClick={onClick}>
                  { hoverIcon }
                </div>
              </Fragment>
            )}

            {me && ['host', 'speaker'].includes(connRole) && (
              <span onClick={() => {
                muteToggle();
                playMuteAudio();
              }} className='p-1 mb-1 bg-gray rounded-full flex cursor-pointer absolute right-0'>{micMuted ? <FaMicrophoneAltSlash size={12} /> : <FaMicrophone size={12} />}</span>
            )}
          </div>

          {speakerIcon && <VolumeIndicator volume={volume} />}

          <h1 className="mt-4 text-white text-center font-semibold text-sm">
            <div className="flex">
              <div className="mx-auto space-x-1 flex">
                {host && <div className='rounded-full px-1 py-0 bg-primary'><AiFillHome className='mt-1' size={10} /></div>} <span>{name}</span>
              </div>
            </div>
          </h1>

          <div className='flex justify-center space-x-2 mt-3'>

            {/* {speakerIcon && (
              <span className='p-1.5 bg-gray rounded-md flex space-x-2'>{speakerIcon}</span>
            )} */}

            {/* {me && ['host', 'speaker'].includes(connRole) && (
              <span onClick={() => {
                muteToggle();
                playMuteAudio();
              }} className='p-1.5 bg-gray rounded-md flex spaxe-x-2 cursor-pointer'>{micMuted ? <FaMicrophoneAltSlash /> : <FaMicrophone />}</span>
            )} */}
            
            {!me && !host && !stream && ['host', 'speaker'].includes(connRole) && <span onClick={() => {
              connectedPeers.forEach(conn => {
                  conn.peer == id.peer && conn.close();
                  if (connToHost) connToHost.close();
                });
                if (incomingStreams) {
                  incomingStreams.forEach(conn => {
                    conn.call.close();
                  })
                }
                if (outgoingStreams) {
                  outgoingStreams.forEach(conn => {
                    conn.close();
                  })
                }
                sendBotMessage(roomId, `@${name} is kicked from the room`)
              }} className='p-1.5 bg-gray rounded-md flex spaxe-x-2'>{ kickIcon }</span>
            }
          </div>
        </div>
      </div>

    </div>
  )
}

export default User