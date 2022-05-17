import { useEffect, useState } from 'react'
import hark from 'hark'

import { CgCrown } from 'react-icons/cg'
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
          <img src="https://shibatoken.com/images/shib-logo.svg" className={`rounded-full w-24 h-24 mx-auto border-4 ${speaking ? 'border-primary' : 'border-gray'}`} alt="Image of speaker"/>
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