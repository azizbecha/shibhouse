import React from "react";

interface VolumeProps {
    volume: number
}

const VolumeIndicator: React.FC<VolumeProps> = (props) => {

    let bars = [];
    for (let i:number = 0; i < 10; i++) {
        bars.push(
            <div
                key={i}
                className={`h-full rounded-full w-1 transition ${props.volume / 10 >= i ? "bg-white" : "bg-primary"}`}
            ></div>
        );
    }

    return (
        <div className="h-1 gap-x-1 flex mt-5">
            <div className="mx-auto flex gap-x-1 flex-row-reverse">
                {bars}
            </div>
        </div>
    )
}

export { VolumeIndicator }