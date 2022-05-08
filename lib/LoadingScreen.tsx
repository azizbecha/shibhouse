import { Plane } from "react-loader-spinner"

const LoadingScreen = () => {
    return (
        <div className="flex justify-center items-center h-screen px-20 bg-dark ">
            <Plane 
                secondaryColor="white"
                color='red'
                ariaLabel='loading'
            />
        </div>
    )
}

export default LoadingScreen