export function mapPeersData(peers, speakers = []) {
  return peers.filter(Boolean).map(peer => ({
    peer: peer.peer,
    metadata: {
      user: {
        name: peer.metadata?.user?.name || 'Anonym',
        firstname: peer.metadata?.user.firstname || '',
        lastname: peer.metadata?.user.lastname || '',
        avatar: peer.metadata?.user.avatar || ''
      },
      isSpeaker: [...speakers].includes(peer.peer),
      isHost: peer.metadata?.isHost,
    }
  }))
}
