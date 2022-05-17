import { useEffect, useState } from 'react'
import hark from 'hark'

import randomColor from 'randomcolor'
import { FaHeadphones, FaMicrophone, FaMicrophoneSlash, FaPlus, FaVolumeUp } from 'react-icons/fa'
import { AiFillHome } from 'react-icons/ai'

export default function User ({ host, onClick, muted, me, stream, name, highlight, ...props }) {
  const [speaking, setSpeaking] = useState(false)

  useEffect(() => {
    if (!stream) return
    if (!stream instanceof MediaStream) return
    const speechEvents = hark(stream)
    speechEvents.on('speaking', () => setSpeaking(true))
    speechEvents.on('stopped_speaking', () => setSpeaking(false))
  }, [stream])

  return (
    <div {...props}>
      <div className={`bg-dark text-white p-2 rounded-lg`}>
        <div className="container mt-5 mb-5">
          <div className={`p-6 w-8/12 text-white text-center text-2xl rounded-full mb-3 shadow-lg mx-auto border-4 ${speaking ? 'border-primary' : 'border-gray'}`} style={{backgroundColor: randomColor({luminosity: 'dark'})}}>
            {name[0].toUpperCase()}{name[1].toUpperCase()}
          </div>
          <h1 className="mt-4 text-white text-center font-bold">
            {name}
          </h1>
          <div className='flex space-x-4 mt-2'>

            {host ? <AiFillHome /> : <FaHeadphones />}
            
            {
              !host && !me ? (
                <>
                  <FaPlus onClick={onClick} />
                </>
              ) : null
            }
          </div>
        </div>
      </div>
    </div>
  )
}