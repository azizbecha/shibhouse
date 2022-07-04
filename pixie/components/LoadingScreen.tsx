import { Plane } from "react-loader-spinner"

const LoadingScreen: React.FC = () => {
    return (
        <div className="flex justify-center items-center h-screen px-20 bg-dark">
            <Plane 
                secondaryColor="white"
                color='#fa2f2f'
                ariaLabel='loading'
            />
        </div>
    )
}

export default LoadingScreen