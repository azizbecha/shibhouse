import React from "react";
import { addDoc, collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { fireStore } from "../auth/Firebase";
import { useAuth } from "../auth/AuthContext";
import { IoMdSend } from "react-icons/io";
import { toast } from "react-toastify";
import Link from "next/link";

interface Props {
    roomId: string;
}

const Chat: React.FC<Props> = (props) => {

    const { currentUserData } = useAuth();

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState<string>("");
    const [lastMessageTimestamp, setLastMessageTimestamp] = useState<BigInteger | number>(0);

    useEffect(() => {
        const fetch = async () => {
            const q = query(collection(fireStore, `rooms/${props.roomId}/messages`), orderBy("sendTime", "desc"), limit(15));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const messages = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                    setMessages(messages);
                });
            });

        }
        fetch()
    }, [props.roomId])

    const sendMessage = async (e) => {
        e.preventDefault();
        try {
            if (message.length > 0) {
                // If message is not empty
                if (new Date().getTime() - Number(lastMessageTimestamp) >= 3000) {

                    // If last message timestamp is greater than 3 seconds
                    addDoc(collection(fireStore, 'rooms', `${props.roomId}/messages`), {
                        message: message.trim(),
                        sendTime: new Date().getTime(),
                        sentBy: currentUserData.username,
                        roomId: props.roomId,
                        avatarColor: currentUserData.avatarColor
                    }),
                    setMessage('');
                    setLastMessageTimestamp(new Date().getTime());
                    return 
                } else {
                    toast.warning('Please wait a moment before', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    return 
                }
            }
        } catch (e) {
            toast.error('An error occured', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            console.log(e)
        }
    }

    return (
        <>
            <div className="overflow-y-auto relative flex rounded-md w-full h-11/12 mt-3 p-3 text-white bg-dark">
                <ul className='space-y-3 flex-col-reverse flex'>
                    {
                        messages.length == 0 && (
                            <div className="p-4">
                                <h1 className="text-center font-semibold">No messages actually</h1>
                            </div>
                        )
                    }
                    {
                        messages.map((message, key) => {
                            var pattern = /\B@[a-z0-9_-]+/gi;
                            var mentions = [""]
                            mentions = message.message.match(pattern)
                            var msg = message.message.split(" ");
                            console.log(msg)
                            return (
                                <li className='w-full my-1' key={key}>
                                    <span className='font-bold text-sm' style={{color: message.avatarColor}}>{message.sentBy}: {message.sentBy == currentUserData.username && <span className="px-2 py-0.5 bg-primary mr-1 rounded-full text-xs text-white">You</span>}</span>
                                    <span className="text-sm text-wrap break-all">
                                        {
                                            msg.map((word) => {
                                                if (mentions.includes(word)) {
                                                    return (
                                                        <span>
                                                            <span style={{backgroundColor: message.avatarColor}} className="font-bold text-xs px-1 rounded cursor-pointer"><Link href={`../user/${word.substring(1)}`}>{word}</Link></span>&nbsp;
                                                        </span>
                                                    )
                                                } else {
                                                    return word + " "
                                                }
                                            })
                                        }
                                    </span>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <form method='post' onSubmit={sendMessage} className="overflow-y-auto relative h-1/12 rounded-md w-full mt-3 p-3 bottom-0 text-white bg-dark">
                <div className="flex space-x-3">
                    <input value={message} onChange={e => setMessage(e.currentTarget.value)} type="text" placeholder='Enter your message here' required className='w-10/12 rounded bg-gray px-3 py-1 text-sm' />
                    <button type='submit' disabled={message.length <= 0} className={`w-2/12 bg-${message.length <= 0 ? 'gray' : 'primary'} text-white px-2 text-center rounded flex `}><span className="text-center m-auto"><IoMdSend /></span></button>
                </div>
            </form>
        </>
    )
}

export default Chat