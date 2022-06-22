import { useRouter } from "next/router"
import { useEffect } from "react";

const Index: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        router.push('../people/')
    })
    return (
        <>
        </>
    )
}

export default Index