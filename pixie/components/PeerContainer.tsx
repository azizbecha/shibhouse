const PeerContainer: React.FC<{context: any}> =  ({ context = {} }) => {
  const {
    roomId,
    roomName,
    currentUser,
    isHost = false,
    host = [],
    listeners = []
  } = context

  console.log(isHost)
  return <div></div>
}

export default PeerContainer