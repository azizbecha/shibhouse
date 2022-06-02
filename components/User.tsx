import { JSXElementConstructor, useEffect, useState } from 'react'
import hark from 'hark'

import randomColor from 'randomcolor'

import { FaHeadphones } from 'react-icons/fa'
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
  reaction?: any
}

const User: React.FC<UserProps> = ({ host, onClick, muted, me, stream, name, highlight, hoverIcon, reaction, ...props }) => {
  const [speaking, setSpeaking] = useState(false)

  useEffect(() => {
    if (!stream) return
    //if (!stream instanceof MediaStream) return
    const speechEvents = hark(stream)
    speechEvents.on('speaking', () => setSpeaking(true))
    speechEvents.on('stopped_speaking', () => setSpeaking(false))
  }, [stream])

  return (
    <div {...props}>
      <div className={`bg-dark text-white py-1 rounded-lg`}>
        <div className="container mt-5 mb-5">
          <div className={`w-20 py-5 relative text-white text-center text-2xl rounded-full mb-3 shadow-lg mx-auto border-4 ${speaking ? 'border-primary' : 'border-gray'}`} style={{backgroundColor: randomColor({luminosity: 'dark'})}}>
            {name[0].toUpperCase()}{name[1].toUpperCase()}
            { onClick && hoverIcon && (
              <div className="p-1 right-0 -bottom-1 bg-darker rounded-full border-white absolute" style={{borderWidth: '1.5px'}} onClick={onClick}>
                { hoverIcon }
              </div>
            )}
          </div>
          <h1 className="mt-4 text-white text-center font-bold">
            {name} {me && '(You)'}
          </h1>

          <div className='flex space-x-4 mt-3'>
            <span className='p-1.5 bg-gray rounded-md'>{host ? <AiFillHome /> : <FaHeadphones />}</span>
            
          </div>
        </div>
      </div>

    </div>
  )
}

export default User