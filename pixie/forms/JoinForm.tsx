import { useRef, useState } from "react"
import PasswordStrengthBar from "react-password-strength-bar"

import { toast } from "react-toastify"

import isEmpty from 'validator/lib/isEmpty'
import { NewUser } from "../interfaces"
import { createUser } from "../lib/createUser"

export const JoinForm: React.FC = () => {

    const firstnameRef = useRef<HTMLInputElement>();
    const lastnameRef = useRef<HTMLInputElement>();
    const emailRef = useRef<HTMLInputElement>();
    const usernameRef = useRef<HTMLInputElement>();

    const [password, setPassword] = useState<string>('');

    const addUser = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const userObject: NewUser = {
            firstname: firstnameRef.current.value,
            lastname: lastnameRef.current.value,
            email: emailRef.current.value,
            username: usernameRef.current.value,
            password: password
        }
        
        if (!isEmpty(firstnameRef.current.value) && !isEmpty(lastnameRef.current.value) && !isEmpty(emailRef.current.value) && !isEmpty(usernameRef.current.value) && !isEmpty(password)) {
            createUser(userObject);
        } else {
            toast.warning('Please fill all the inputs', {
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
                className="w-12/12"
            />
            <p className="text-white mb-5">Password must contain at least 8 characters, 1 number, 1 uppercase letter and 1 lowercase letter</p>
            <button type="submit" className="p-4 rounded-full hover:bg-secondary sm:w-full text-center transition bg-primary text-white md:px-12">
                <span className="text-white font-semibold md:block">Join now</span>
            </button>
        </form>
    )
}