import Microlink from '@microlink/react'

import { AiFillPushpin } from "react-icons/ai"
import { getDomain } from "../lib/getDomain"

export const PinnedLink = (props: {link: string}) => {
    return (
        <div className="bg-darker rounded-md mt-3 mb-2">
            {props.link !== "" && (
                <div className="bg-darker px-3 pt-2 pb-3 rounded-md text-white font-semibold">
                    <span className="text-white font-bold text-xl flex space-x-1 mt-1">
                        <AiFillPushpin className="my-auto" size={20} /> <span>Pinned link:</span>
                    </span>
                    
                    {
                        getDomain(props.link, true) == "youtube.com" || "youtu.be" ? (
                            <Microlink
                                className="mt-2 w-full"
                                url={props.link}
                                size="large"
                                media={"video"}
                                style={{backgroundColor:"#151A21", color: "#fff", border: 'none', borderRadius: '5px', width: '100%'}}
                            />
                            
                        ) : (
                            <Microlink
                                className="mt-2 w-full"
                                url={props.link}
                                size="large"
                                style={{backgroundColor:"#151A21", color: "#fff", border: 'none', borderRadius: '5px', width: '100%'}}
                            />
                        )
                    }
                </div>
            )}
        </div>
    )
}