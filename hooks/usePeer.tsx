import { useEffect, useState } from 'react'
import uuid from 'uuid-random'
import Peer from 'peerjs'
import { useRouter } from 'next/router'

const usePeer = (config: any = {}) => {
  const {
    peerId: paramPeerId,
    onConnectionOpen,
  } = config

  const [peerInstance, setPeerInstance] = useState(null)
  const [peerStatus, setPeerStatus] = useState<String>()
  const [peerId, setPeerId] = useState<String | null>(null)

  const router = useRouter()

  const destroyPeerInstance = () => {
    if (!peerInstance) return
    peerInstance.disconnect()
    peerInstance.destroy()
    setPeerInstance(null)
  }

  useEffect(() => {    
    const peer = peerInstance ? peerInstance : new Peer(paramPeerId ? paramPeerId : uuid())

    peer.on('open', () => {
      console.log('usePeer::Connection Open')
      setPeerInstance(peer)
      setPeerId(peer.id)
      setPeerStatus('open')
      onConnectionOpen?.(peer)
    })

    peer.on('disconnected', () => {
      console.log('usePeer::Peer desconnected')
      router.push('/dashboard')
      setPeerStatus('disconnected')
      destroyPeerInstance()
    })

    peer.on('close', () => {
      console.log('usePeer::Peer closed remotetly')
      destroyPeerInstance()
      setPeerStatus('close')
      router.push('/dashboard')
    })


    peer.on('error', (error) => {
      console.log('usePeer::Peer error', error)
      setPeerStatus('error')
      destroyPeerInstance()
    })

    return () => {
      destroyPeerInstance()
    }
  }, [])

  return [peerInstance, peerId, peerStatus]

}

export default usePeer
