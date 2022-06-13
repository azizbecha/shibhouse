/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useState } from "react";

import InputEmoji from "react-input-emoji";
import { useCopyToClipboard } from "react-use";
import { Anchorme, LinkComponentProps } from 'react-anchorme'
import { toast } from "react-toastify";

import { addDoc, collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { fireStore } from "../auth/Firebase";
import { useAuth } from "../auth/AuthContext";

import { RiChatOffFill } from "react-icons/ri";
import { AiFillPushpin } from "react-icons/ai";

import { getBrightColor } from "../lib/getBrightColor";
import { isChatCommand } from "../lib/isChatCommand";
import { StreamContext } from "../contexts/StreamContext";

interface ChatProps {
    roomId: string;
    isChatAllowed: boolean,
    pinnedLink: string,
    leave: () => void,
    muteToggle: () => void,
    role: string,
    username: string
}

const Chat: React.FC<ChatProps> = (props) => {

    const { currentUserData } = useAuth();

    const [state, copyToClipboard] = useCopyToClipboard();
    const [messages, setMessages] = useState<Array<any>>([]);
    const [message, setMessage] = useState<string>("");
    const [lastMessageTimestamp, setLastMessageTimestamp] = useState<BigInteger | number>(0);

    const {
    muteToggle,
    micMuted,
    startMicStream,
    checkMicPermission,
    micAccess
    } = useContext<any>(StreamContext)

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

    const CustomLink = (props: LinkComponentProps) => {
        return (
            <a {...props} className="font-semibold chat-link" />
        )
    }

    const copyRoomLink = () => {
        copyToClipboard(window.location.href)
        toast.success('Room link copied to clipboard', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    useEffect(() => {
        setInterval(() => {
            const chatLinks = document.getElementsByClassName('chat-link') as HTMLCollectionOf<HTMLElement>;
            for (let i = 0; i < chatLinks.length; i++) {
                if(chatLinks[i] !== null) {
                    chatLinks[i].style.color = getBrightColor();
                }
            }
        }, 100)

        setInterval(() => {
            const bot = document.getElementsByClassName('bot') as HTMLCollectionOf<HTMLElement>;
            for (let i = 0; i < bot.length; i++) {
                if(bot[i] !== null) {
                    bot[i].style.color = getBrightColor();
                }
            }
        }, 200)

        setInterval(() => {
            const bot = document.getElementsByClassName('bg-bot') as HTMLCollectionOf<HTMLElement>;
            for (let i = 0; i < bot.length; i++) {
                if(bot[i] !== null) {
                    bot[i].style.backgroundColor = getBrightColor();
                }
            }
        }, 200)
    }, [])
    
    const sendMessage = async (e) => {
        //e.preventDefault();
        try {
            
            // remove sapces in start/end of message
            message.trim();

            // Make sure that message is not empty
            if (message.length > 0) {

                // if message is a command
                if (isChatCommand(message)) {

                    switch(message) {
                        case '/copy':
                            copyRoomLink();
                            break;

                        case '/leave':
                            props.leave();
                            break;

                        case '/mute':
                            props.muteToggle();
                            break;

                        case '/role':
                            toast.info(`You are a ${props.role}`, {
                                position: "top-right",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                            break;
                        
                        case '/whoami':
                            toast.info(`You are a ${props.username}`, {
                                position: "top-right",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                            break;

                        case '/micaccess':
                            toast.info(`Mic access is ${micAccess}`, {
                                position: "top-right",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                            break;

                        default:
                            toast.error(`Command ${message} not found`, {
                                position: "top-right",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                            break;

                    }
                } else {
                    if (new Date().getTime() - Number(lastMessageTimestamp) >= 3000) {

                        // If last message timestamp is greater than 3 seconds
                        addDoc(collection(fireStore, 'rooms', `${props.roomId}/messages`), {
                            message: message.trim(),
                            sendTime: Date.now(),
                            sentBy: currentUserData.username,
                            roomId: props.roomId,
                            avatarColor: currentUserData.avatarColor,
                            isBot: false
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
        }
    }

    return (
        <div>
            {props.pinnedLink !== "" && (
                <div className="bg-dark px-3 py-2 rounded-md text-white font-semibold flex">
                    <AiFillPushpin size={16} className="my-auto mr-1" /><a href={props.pinnedLink} target="_blank" rel="noreferrer" >{props.pinnedLink}</a>
                </div>
            )}
            {
                props.isChatAllowed ? (
                    <>
                        <div className="overflow-y-auto relative flex rounded-md w-full h-11/12 mt-3 p-3 text-white bg-dark">
                            {
                                messages.length == 0 && (
                                    <div className="p-4">
                                        <h1 className="text-center font-semibold">No messages actually</h1>
                                    </div>
                                )
                            }
                            <ul className='space-y-3 flex flex-col-reverse'>
                                {
                                    messages.map((message, key) => {
                                        var pattern: RegExp = /\B@[a-z0-9_-]+/gi;
                                        var mentions: Array<string> | null = []
                                        mentions = []
                                        if (message.message.match(pattern) !== null) {
                                            mentions = message.message.match(pattern)
                                        }
                                        var msg: Array<string> = message.message.split(" ");

                                        return (
                                            <li className='w-full my-1' key={key}>
                                                <span className={`font-bold text-sm ${message.isBot && 'bot'}`} style={{color: message.avatarColor}}>
                                                    <a href={`../../user/${message.sentBy}`} target="_blank" rel="noopener noreferrer">{message.sentBy}</a>:&nbsp;
                                                    {message.isBot && <span className='px-1 py-0 mx-1 bg-bot text-white rounded text-xs'>BOT</span> } 
                                                    {message.sentBy == currentUserData.username && <span className="px-2 py-0.5 bg-primary mx-1 rounded-full text-xs text-white">You</span>}
                                                </span>
                                                <span className="text-sm text-wrap break-all">
                                                
                                                        {
                                                            msg.map((word: string, key: number) => {
                                                                if (mentions.includes(word)) {
                                                                    return (
                                                                        <span key={key}>
                                                                            <span style={{backgroundColor: message.avatarColor}} className="font-bold text-xs px-1 rounded cursor-pointer">
                                                                                <a href={`../user/${word.substring(1)}`} target="_blank" rel="noopener noreferrer">
                                                                                    {word}
                                                                                </a>
                                                                            </span>&nbsp;
                                                                        </span>
                                                                    )
                                                                } else {
                                                                    return (
                                                                        <span className="message" key={key}>
                                                                            <Anchorme linkComponent={CustomLink} target="_blank" rel="noreferrer noopener">
                                                                                {word}
                                                                            </Anchorme>&nbsp;
                                                                        </span>
                                                                    )
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
                        <div className="mt-2 flex">
                            <InputEmoji
                            value={message}
                            onChange={setMessage}
                            cleanOnEnter
                            onEnter={sendMessage}
                            placeholder="Type a message"
                            theme="dark"
                            borderRadius={7}
                            borderColor="#242C37"
                            height={20}
                            maxWidth={120}
                            />
                        </div>
                    </>
                ) : (
                    <div className="overflow-y-auto relative flex rounded-md w-full h-11/12 mt-3 p-3 text-white bg-dark">
                        <div className="p-4 mx-auto">
                            <h1 className="text-center font-semibold text-md flex space-x-1 justify-center"><RiChatOffFill size={15} className="my-auto" /> <span>Chatting is not allowed in this room.</span></h1>
                            <h2 className="mt-2 text-center font-normal text-sm">The host of this room disabled the chat feature. </h2>
                            <img src="../../shiba-sleeping.png" className="mt-6" alt="Image of shiba inu sleeping" />
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Chat