import { useEffect, createContext, useState } from 'react'
import { toast } from 'react-toastify'

const StreamContext = createContext({})

const StreamContextProvider = ({ children }) => {
  const [micAudioStream, setMicAudioStream] = useState(null)
  const [micAudioStreamError, setMicAudioStreamError] = useState()
  const [micAccess, setMicAccess] = useState(false)
  const [micMuted, setMicMuted] = useState(false)

  async function startMicStream() {
    if (micAudioStream) return micAudioStream

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true
      })
      setMicAudioStream(stream)
      return stream
    } catch(err) {
      setMicAudioStreamError(err)
      return err
    }
  }

  function checkMicPermission() {
    navigator.permissions.query(
      { name: 'microphone' }
    ).then(function(permissionStatus){
      setMicAccess(permissionStatus.state)
    })
  }

  function muteToggle() {
    if (!micAudioStream) return
    const stream = micAudioStream.getAudioTracks()[0]
    setMicMuted(stream.enabled)
    stream.enabled ? (
      toast.success('Mic muted', {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      })
    ) : (
      toast.success('Mic unmuted', {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      })
    )
    stream.enabled = !stream.enabled
  }

  return (
    <StreamContext.Provider value={{
      checkMicPermission,
      startMicStream,
      micAudioStream,
      micAccess,
      muteToggle,
      micMuted,
    }}>
      {children}
    </StreamContext.Provider>
  )
}

export { StreamContext, StreamContextProvider }
