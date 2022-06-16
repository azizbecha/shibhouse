import { useState } from "react"
import { useRouter } from "next/router"

import { LogUser } from "../interfaces"
import { signUser } from "../lib/signUser"

import { toast } from "react-toastify"

export const LoginForm:React.FC = () => {

    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()

    const router = useRouter()

    const [disabled, setDisabled] = useState(false)

    const verify = async (e) => {
        e.preventDefault()

        const userObject: LogUser = {
            email: email,
            password: password
        }
    
        try {
            toast.info('Please wait', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setDisabled(true)
            await signUser(userObject) 
            toast.success('Logged successfully !', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setDisabled(false)
            router.push("/dashboard")

        } catch (e) {
            setDisabled(false)
            toast.error('Please verify your informations', {
                position: "top-center",
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
        <>
            <div className="pb-5 lg:px-7 mt-5">
                <span className="text-4xl font-bold text-white">
                    Log in
                </span><br /><br />
                <div className="flex items-center flex-wrap px-1 md:px-0">
                    <div className="relative w-full">
                        <form onSubmit={verify}>
                            <input value={email} onChange={(e: React.FormEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)} placeholder="Please enter your email" className="w-full p-4 rounded-full mr-4 mb-5" type="email" required />

                            <input value={password} onChange={(e: React.FormEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)} placeholder="Please enter your password" className="w-full p-4 rounded-full mr-4 mb-5" type="password" required />

                            <button type="submit" disabled={disabled} className="p-4 rounded-full hover:bg-secondary sm:w-full text-center transition bg-primary text-white font-semibold md:px-12">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}