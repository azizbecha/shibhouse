import React from "react";

interface VolumeProps {
    volume: number
}

const VolumeIndicator: React.FC<VolumeProps> = (props) => {

    let dots: Array<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = [];

    // 10 is the number of the dots of the indicator
    for (let i: number = 0; i < 10; i++) {
        dots.push(
            <div
                key={i}
                className={`h-full rounded-full w-1 transition ${props.volume / 10 >= i ? "bg-white" : "bg-primary"}`}
            ></div>
        );
    }

    return (
        <div className="h-1 gap-x-1 flex mt-5">
            <div className="mx-auto flex gap-x-1 flex-row-reverse">
                {dots}
            </div>
        </div>
    )
}

export { VolumeIndicator }