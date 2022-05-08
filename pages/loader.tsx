import { Plane } from "react-loader-spinner"

const Loader = () => {
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

export default Loader