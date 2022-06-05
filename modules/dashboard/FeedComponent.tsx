import { useRouter } from "next/router"
import { useState, useRef, useEffect } from "react"
import { FaDollarSign, FaHome } from "react-icons/fa"
import { toast } from "react-toastify"
import { Ticker } from "react-ts-tradingview-widgets"
import { useAuth } from "../../auth/AuthContext"
import Divider from "../../components/Divider"
import ExportRooms from "../../components/ExportRooms"
import { NewRoom } from "../../interfaces"
import createRoom from "../../lib/createRoom"
import generateId from "../../lib/generateId"

import $ from 'jquery'

const FeedComponent = () => {

    const router = useRouter();
    const { currentUserData } = useAuth();

    const [showModal, setShowModal] = useState<boolean>(false);
    const roomTitleRef = useRef<HTMLInputElement>();
    const roomDescriptionRef = useRef<HTMLTextAreaElement>();
    const roomPinnedLinkRef = useRef<HTMLInputElement>();
    const roomTopicsRef = useRef<HTMLInputElement>();

    const createNewRoom = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const roomId = generateId(10);
        const data: NewRoom = {
            id: roomId,
            createdBy: currentUserData.username,
            title: roomTitleRef.current.value,
            description: roomDescriptionRef.current.value,
            pinnedLink: roomPinnedLinkRef.current.value,
            topics: roomTopicsRef.current.value,
            speakers: [currentUserData.username]
        }
        
        if (roomTitleRef.current.value !== "" && roomDescriptionRef.current.value !== "" && roomTopicsRef.current.value !== "") {
            try {
                await createRoom(data);
                toast.success('Room created successfully', {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                router.push(`/room/${roomId}`)
            } catch (e) {
                toast.error('An error has been occured', {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
    }

    useEffect(() => {
        $(document).ready(function(){
            $("#roomSearchInput").on("keyup", function() {
                var value = $(this).val().toLowerCase();
                $("ul#roomsList li").filter(function() {
                    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                });
            });
        });
    }, [])
    
    return (
        <>
            <main className="flex flex-col w-full bg-darker overflow-x-hidden overflow-y-auto rounded-lg mb-14">
                {showModal ? (
                    <>
                        <div data-aos='zoom-in' className="justify-center items-center flex absolute overflow-x-hidden overflow-y-auto inset-0 z-50 outline-none focus:outline-none">
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    {/*header*/}
                                    <div className="flex items-start justify-between bg-gray p-5 border-b border-solid border-slate-200 rounded-t">
                                        <span className="text-2xl font-semibold">
                                            Create room
                                        </span>
                                    </div>
                                    {/*body*/}
                                    <form onSubmit={createNewRoom}>
                                        <div className="relative p-4 flex-auto bg-gray w-full">
                                            <div className="my-4 text-slate-500 text-md leading-relaxed">
                                                <label htmlFor="">Room title <span className="text-primary font-bold">*</span></label><br />
                                                <input ref={roomTitleRef} type="text" className="w-8/12 rounded-md mb-4 px-6 py-1 text-black" required /><br />

                                                <label htmlFor="">Room description <span className="text-primary font-bold">*</span></label><br />
                                                <textarea ref={roomDescriptionRef} className="w-8/12 rounded-md px-2 py-1 mb-4 text-black" /><br />

                                                <label htmlFor="">Topics <span className="text-primary font-bold">*</span></label><br />
                                                <input ref={roomTopicsRef} type="text" className="w-8/12 rounded-md mb-4 px-2 py-1 text-black" /><br />

                                                <label htmlFor="">Pinned link</label><br />
                                                <input ref={roomPinnedLinkRef} type="link" className="w-8/12 rounded-md mb-4 px-2 py-1 text-black" /><br />

                                                <span className="mt-5">By creating a room, everyone on shibhouse can join, listen, chat and request to talk with you.</span>
                                            </div>
                                        </div>
                                        {/*footer*/}
                                        <div className="flex items-center justify-end bg-gray p-6 border-t border-solid border-slate-200 rounded-b">
                                            <button
                                                className="bg-dark font-bold px-6 py-3 rounded-lg text-sm mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => setShowModal(false)}
                                            >
                                                Close
                                            </button>
                                            <button
                                                className="bg-primary font-bold px-6 py-3 rounded-lg text-sm mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="submit"
                                            >
                                                Create
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null}
                <div className="flex w-full mx-auto px-4 pt-8 pb-8">
                    <div className="flex flex-col w-full h-full text-gray-900 text-xl">
                        <div className="flex space-x-45">
                            <div className="flex space-x-20 w-full">
                                <div className="flex-1 min-w-0">
                                    <h1 className="font-bold text-2xl font-inter">Feed</h1>
                                </div>
                                <div className="inline-flex items-end text-base">
                                    <button onClick={() => setShowModal(true)} className="bg-primary px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-secondary hover:shadow" type="button">Create room</button>
                                </div>
                            </div>
                        </div>
                        <Divider />
                        <div className="relative text-gray-700 mb-5 border-0">
                            <input type="search" id="roomSearchInput" className="w-full h-10 px-3 py-2 text-base placeholder-gray-600 rounded-lg bg-dark" placeholder="Search for a room on the moon 🚀"/>
                        </div>
                        <h1 className="font-bold text-xl flex font-inter mb-4"><FaDollarSign size={20} className="mr-1 mt-1" /> Crypto prices</h1>
                        <div className="bg-dark p-4 rounded-lg mb-5">
                            <Ticker isTransparent={true} locale={"en"} symbols={[
                                {
                                    "proName": "BINANCE:SHIBUSDT",
                                    "title": "SHIB/USDT"
                                },
                                {
                                    "proName": "BINANCE:BTCUSDT",
                                    "title": "BTC/USDT"
                                }
                            ]} colorTheme="dark"></Ticker>
                        </div>
                        <h1 className="font-bold text-xl flex font-inter mb-4"><FaHome size={20} className="mr-2 mt-1" /> Current rooms</h1>
                        <ExportRooms />
                    </div>
                </div>
            </main>
        </>
    )
}

export { FeedComponent }