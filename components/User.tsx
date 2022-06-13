import { useContext, useEffect, useState } from 'react'

import hark from 'hark'

import { PeerContext } from '../contexts/PeerJSContext'
import { StreamContext } from '../contexts/StreamContext'
import { sendBotMessage } from '../lib/sendBotMessage'
import { VolumeIndicator } from './VolumeIndicator'
import { useMediaQuery } from 'react-responsive'

import { FaHeadphones, FaMicrophone, FaMicrophoneAltSlash } from 'react-icons/fa'
import { AiFillHome } from 'react-icons/ai'

interface UserProps {
  host?: any,
  onClick: () => void,
  muted?: any,
  me: boolean,
  stream?: any,
  name: string,
  highlight?: any,
  hoverIcon: JSX.Element,
  reaction?: any,
  kickIcon?: JSX.Element,
  key: any,
  id:any,
  speakerIcon?: JSX.Element,
  firstname: string,
  lastname: string,
  avatar: string,
  roomId: string
}

const User: React.FC<UserProps> = ({ host, onClick, muted, me, stream, name, highlight, hoverIcon, reaction, kickIcon, key, id, speakerIcon, firstname, lastname, avatar, roomId,  ...props }) => {
  const isTabletOrMobile: boolean = useMediaQuery({ maxWidth: 768 });
  const [speaking, setSpeaking] = useState<boolean>(false);

  const {
    state: {
      connToHost,
      connRole,
      connectedPeers,
    },

  } = useContext<any>(PeerContext)

  const { micMuted } = useContext<any>(StreamContext)
  const [volume, setVolume] = useState<number>(100);

  useEffect(() => {
    if (!stream) return
    //if (!stream instanceof MediaStream) return
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
      <div className={`bg-dark text-white py-1 rounded-lg ${isTabletOrMobile && 'px-2'}`}>
        <div className="container my-5">
          <div className={`w-20 py-5 relative text-white text-center text-2xl rounded-full mb-3 shadow-lg mx-auto border-4 ${speaking ? 'border-primary' : 'border-gray'}`} style={{backgroundColor: avatar}}>
            {firstname[0].toUpperCase()}{lastname[0].toUpperCase()}
            { onClick && hoverIcon && (
              <>
                <div className="p-1 right-0 -bottom-1 bg-darker rounded-full border-white absolute" style={{borderWidth: '1.5px'}} onClick={onClick}>
                  { hoverIcon }
                </div>
              </>
            )}
          </div>
          {/*volume*/}
          {
            speakerIcon && (
              <VolumeIndicator volume={volume} />
            )
          }
          <h1 className="mt-4 text-white text-center font-semibold text-md">
            <a href={`../../user/${name}`} target="_blank" rel="noopener noreferrer">{name}</a> {me && <span className="text-sm">(You)</span> }
          </h1>
            
          <div className='flex justify-center space-x-2 mt-3'>
            {host && (
              <>
                <span className='p-1.5 bg-gray rounded-md flex spaxe-x-2'><AiFillHome /></span>
              </>
            )}
              <span className='p-1.5 bg-gray rounded-md flex spaxe-x-2'><FaHeadphones /></span>
              {
                speakerIcon && (
                  <span className='p-1.5 bg-gray rounded-md flex spaxe-x-2'>{speakerIcon}</span>
                )
              }
              {
                me && ['host', 'speaker'].includes(connRole) &&(
                  <>
                    
                    <span className='p-1.5 bg-gray rounded-md flex spaxe-x-2'>{micMuted ? <FaMicrophoneAltSlash /> : <FaMicrophone />}</span>
                  </>
                )
              }

            
            {! me && !host && !stream && <span onClick={() => {
                connectedPeers.forEach(conn => {
                  conn.peer == id.peer && conn.close();
                  if (connToHost) connToHost.close()
                })
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