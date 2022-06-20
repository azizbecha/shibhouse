import { useRouter } from "next/router";
import { useRef, useState } from "react";
import PasswordStrengthBar from "react-password-strength-bar";
import { toast } from "react-toastify";
import { NewUser } from "../interfaces";
import { createUser } from "../lib/createUser";

export const JoinForm:React.FC =  () => {

    const router = useRouter();

    const firstnameRef = useRef<any>();
    const lastnameRef = useRef<any>();
    const emailRef = useRef<any>();
    const usernameRef = useRef<any>();
    const passwordRef = useRef<any>();

    const [password, setPassword] = useState<string>('')

    const addUser = (e) => {
        e.preventDefault();

        const userObject: NewUser = {
            firstname: firstnameRef.current.value,
            lastname: lastnameRef.current.value,
            email: emailRef.current.value,
            username: usernameRef.current.value,
            password: password
        }

        if (createUser(userObject)) {
            toast.success('Joined !', {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            router.push('/login');
        }
    }

    return (
        <form onSubmit={addUser} className="w-full mt-5">
            <div className="relative flex rounded-full shadow-md mb-5">
                <input ref={firstnameRef} placeholder="First name" className="w-full p-4 rounded-full mr-4" type="text" required />
                <input ref={lastnameRef} placeholder="Last name" className="w-full p-4 rounded-full" type="text" required />
            </div>
            <div className="relative flex rounded-full shadow-md mb-5">
                <input ref={emailRef} placeholder="Email" className="w-full p-4 rounded-full mr-4" type="email" required />
                <input ref={usernameRef} placeholder="Username" className="w-full p-4 rounded-full" type="text" required />
            </div>
            <div className="relative flex rounded-full shadow-md mb-5">
                <input value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setPassword(e.target.value)
                }} placeholder="Your password" className="w-full p-4 rounded-full" type="password" required />
            </div>
            <PasswordStrengthBar
                minLength={8}
                password={password}
                barColors={[
                    "#B83E26",
                    "#FFB829",
                    "#009200",
                    "#009200",
                    "#009200",
                    "#009200"
                ]}
                className="mb-5 w-12/12"
            />
            <button type="submit" className="p-4 rounded-full hover:bg-secondary sm:w-full text-center transition bg-primary text-white md:px-12">
                <span className="text-white font-semibold md:block">Join now</span>
            </button>
        </form>
    )
}