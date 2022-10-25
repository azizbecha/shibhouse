/* eslint-disable @next/next/no-img-element */
import React, { Fragment, useContext, useEffect, useState } from "react"

import { useCopyToClipboard } from "react-use"
import { Anchorme, LinkComponentProps } from 'react-anchorme'

import toast from "react-hot-toast";
import InputEmoji from "react-input-emoji"

import { RiChatOffFill } from "react-icons/ri"
import { FaBan } from "react-icons/fa"

import { addDoc, arrayUnion, collection, doc, DocumentData, onSnapshot, orderBy, query, QueryDocumentSnapshot, Timestamp, updateDoc } from "firebase/firestore"
import { fireStore } from "../auth/Firebase"
import { useAuth } from "../auth/AuthContext"

import isEmpty from 'validator/lib/isEmpty'

import { getBrightColor } from "../lib/getBrightColor"
import { isChatCommand } from "../lib/isChatCommand"
import { sendBotMessage } from "../lib/sendBotMessage"
import { ChatProps } from "../interfaces"

import { StreamContext } from "../contexts/StreamContext"

const Chat: React.FC<ChatProps> = (props) => {

    const { currentUserData } = useAuth();

    const [state, copyToClipboard] = useCopyToClipboard();
    const [messages, setMessages] = useState<Array<any>>([]);
    const [bannedFromChat, setBannedFromChat] = useState([]);
    const [message, setMessage] = useState<string>("");
    const [lastMessageTimestamp, setLastMessageTimestamp] = useState<BigInteger | number>(0);

    const { micAccess } = useContext<any>(StreamContext);

    const shadowBan = async (user: string) => {
        const roomRef = doc(fireStore, "rooms", props.roomId);
  
        await updateDoc(roomRef, {
            bannedFromChat: arrayUnion(user),
        });

        toast.success(`@${user} banned from chat`);
    }

    useEffect(() => {
        const fetch = async () => {
            const q = query(collection(fireStore, `rooms/${props.roomId}/messages`), orderBy("sendTime", "desc"));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
                    const messages = querySnapshot.docs
                    .map((doc: QueryDocumentSnapshot<DocumentData>) => ({ ...doc.data(), id: doc.id }));
                    setMessages(messages);
                });
            });

            const unsub = onSnapshot(doc(fireStore, "rooms", `${props.roomId}`), (doc) => {
                setBannedFromChat(doc.data()?.bannedFromChat);
            });


        }
        fetch()
    }, [props.roomId]);

    const CustomLink = (props: LinkComponentProps) => {
        return (
            <a {...props} className="font-semibold chat-link" />
        )
    }

    const copyRoomLink = () => {
        copyToClipboard(window.location.href);
        sendBotMessage(props.roomId, `Room link copied successfully`);
    }

    useEffect(() => {
        setInterval(() => {
            const chatLinks = document.getElementsByClassName('chat-link') as HTMLCollectionOf<HTMLElement>;
            for (let i = 0; i < chatLinks.length; i++) {
                if(chatLinks[i] !== null) {
                    chatLinks[i].style.color = getBrightColor();
                }
            }

            const bot = document.getElementsByClassName('bot') as HTMLCollectionOf<HTMLElement>;
            for (let i = 0; i < bot.length; i++) {
                if(bot[i] !== null) {
                    bot[i].style.color = getBrightColor();
                }
            }

            const bgBot = document.getElementsByClassName('bg-bot') as HTMLCollectionOf<HTMLElement>;
            for (let i = 0; i < bgBot.length; i++) {
                if(bgBot[i] !== null) {
                    bgBot[i].style.backgroundColor = getBrightColor();
                }
            }
        }, 500);
        
    }, [])
    
    const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        //e.preventDefault();
        try {
            
            // remove spaces in start/end of message
            message.trim();

            // Make sure that message is not empty
            if (message.length > 0 && !isEmpty(message)) {

                if (new Date().getTime() - Number(lastMessageTimestamp) >= 2000) {

                    // If last message timestamp is greater than 3 seconds
                    addDoc(collection(fireStore, 'rooms', `${props.roomId}/messages`), {
                        message: message.trim(),
                        sendTime: Timestamp.now().seconds,
                        sentBy: currentUserData.username,
                        roomId: props.roomId,
                        avatarColor: currentUserData.avatarColor,
                        isBot: false,
                        isSpam: bannedFromChat.includes(currentUserData.username)
                    }).then(() => {

                        // if message is a command
                        if (isChatCommand(message)) {

                            switch(message) {
                                case '/copy':
                                    copyRoomLink();
                                    break;

                                case '/leave':
                                    sendBotMessage(props.roomId, `@${props.username} left the room`);
                                    props.leave();
                                    
                                    break;

                                case '/mute':
                                    props.muteToggle();
                                    break;

                                case '/role':
                                    sendBotMessage(props.roomId, `${props.username} is a ${props.role}`);
                                    break;
                                
                                case '/whoami':
                                    sendBotMessage(props.roomId, `You are @${props.username}`);
                                    
                                    break;
                                
                                case '/rabye':
                                    sendBotMessage(props.roomId, `@${props.username} played the Rabye Bouden's "Sa7a l Bitcoin rab3oun" audio clip`);
                                    var vocal = new Audio("../../sounds/sa7a-bitcoin-rab3oun.mp3");
                                    vocal.play();
                                    break;

                                case '/micaccess':
                                    sendBotMessage(props.roomId, `Mic access is ${micAccess}`);
                                    break;

                                case '/request':
                                    sendBotMessage(props.roomId, `@${props.username} is requesting to speak`);
                                    break;

                                default:
                                    sendBotMessage(props.roomId, `Command ${message} not found`);
                                    break;

                            }
                        }
    
                        setMessage('');
                        setLastMessageTimestamp(new Date().getTime());
                    })

                    return 
                } else {
                    toast.error('Please wait a moment before');
                    return 
                }

            }
        } catch (e) {
            toast.error('An error occured');
        }
    }

    return (
        <div className="bg-dark h-5/6 rounded-md">
            {
                props.isChatAllowed ? (
                    <Fragment>
                        <div className="overflow-y-auto relative flex rounded-md w-full h-5/6 mt-1 p-3 text-white bg-dark">
                            {
                                messages.length == 0 && (
                                    <div className="p-4">
                                        <h1 className="text-center font-semibold">No messages actually</h1>
                                    </div>
                                )
                            }
                            <ul className='flex flex-col-reverse overflow-auto w-full'>
                                {
                                    messages.map((message, key) => {
                                        var pattern: RegExp = /\B@[a-z0-9_-]+/gi;
                                        var mentions: string[] | null = [];
                                        var msg: string[] = message.message.split(" ");

                                        mentions = [];
                                        
                                        if (message.message.match(pattern) !== null) {
                                            mentions = message.message.match(pattern);
                                        }

                                        if(message.isSpam) {
                                            // if message is spam so it will appear only to the spammer
                                            if (message.sentBy == currentUserData.username) {
                                                return (
                                                    <li className='w-full my-1' key={key}>
                                                        <span className={`font-bold text-sm ${message.isBot && 'bot'}`} style={{color: message.avatarColor}}>
                                                            <a href={`../../../user/${message.sentBy}`} target="_blank" rel="noopener noreferrer">{message.sentBy}</a>:&nbsp;
                                                            
                                                            <span className="px-1 py-0.5 bg-gray mr-1 rounded-full text-white" style={{fontSize: 11}}>You</span>
                                                        </span>
                                                        <span className="text-sm text-wrap break-all">
                                                            {
                                                                msg.map((word: string, key: number) => {
                                                                    if (mentions.includes(word)) {
                                                                        return (
                                                                            <span key={key}>
                                                                                <span style={{backgroundColor: message.avatarColor}} className="font-bold text-xs px-1 rounded cursor-pointer">
                                                                                    <a href={`../../user/${word.substring(1)}`} target="_blank" rel="noopener noreferrer">
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
                                            }
                                        } else {
                                            return (
                                                <li className='w-full my-1' key={key}>
                                                    <span className={`font-bold text-sm ${message.isBot && 'bot'}`} style={{color: message.avatarColor}}>
                                                        <a href={`../../../user/${message.sentBy}`} target="_blank" rel="noopener noreferrer">{message.sentBy}</a>:&nbsp;
                                                        
                                                        {message.isBot && <span className='px-1 py-0 mx-1 bg-bot text-white rounded text-xs'>BOT</span> } 
                                                        {message.sentBy == currentUserData.username && <span className="px-1 py-0.5 bg-gray mr-1 rounded-full text-white" style={{fontSize: 11}}>You</span>}
                                                        
                                                        {
                                                            props.creator == currentUserData.username && !message.isBot && message.sentBy !== currentUserData.username && (
                                                                <span onClick={() => {
                                                                    bannedFromChat.includes(message.sentBy) ? toast.error("User already banned") : shadowBan(message.sentBy);
                                                                }} className={`px-1 py-0.5 bg-${!bannedFromChat?.includes(message.sentBy) ? 'primary' : 'green'} mr-1 rounded-full text-white inline-block cursor-pointer`}><div className="flex my-0.5"><FaBan size={10} /></div></span>
                                                            )
                                                        }
                                                    </span>
                                                    <span className="text-sm text-wrap break-all">
                                                        {
                                                            msg.map((word: string, key: number) => {
                                                                if (mentions.includes(word)) {
                                                                    return (
                                                                        <span key={key}>
                                                                            <span style={{backgroundColor: message.avatarColor}} className="font-bold text-xs px-1 rounded cursor-pointer">
                                                                                <a href={`../../user/${word.substring(1)}`} target="_blank" rel="noopener noreferrer">
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
                                        }
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
                    </Fragment>
                ) : (
                    <div className="overflow-y-auto relative flex rounded-md w-full h-11/12 mt-3 p-3 text-white bg-dark">
                        <div className="p-4 mx-auto">
                            <h1 className="text-center font-semibold text-md flex space-x-1 justify-center"><RiChatOffFill size={15} className="my-auto" /> <span>Chatting is not allowed in this room.</span></h1>
                            <h2 className="mt-2 text-center font-normal text-sm">The host of this room disabled the chat feature. </h2>
                            <img src="../../images/shiba-sleeping.png" className="mt-6" alt="Image of Shiba Inu sleeping" />
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Chat