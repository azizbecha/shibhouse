import { useRef, useState } from "react"

import toast from "react-hot-toast";
import { Col, Row } from "react-flexbox-grid/dist/react-flexbox-grid";

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
            toast.error('Please fill all the inputs');
        }
    }

    return (
        <form onSubmit={addUser} className="mt-5">
            <Row>
                <Col className="mb-3" lg={6} md={12} sm={12} xs={12}>
                    <input ref={firstnameRef} placeholder="First name" className="w-full p-4 rounded-full" type="text" required />
                </Col>

                <Col className="mb-3" lg={6} md={12} sm={12} xs={12}>                
                    <input ref={lastnameRef} placeholder="Last name" className="w-full p-4 rounded-full" type="text" required />
                </Col>

                <Col className="mb-3" lg={6} md={12} sm={12} xs={12}>
                    <input ref={emailRef} placeholder="Email" className="w-full p-4 rounded-full" type="email" required />
                </Col>

                <Col className="mb-3" lg={6} md={12} sm={12} xs={12}>                
                    <input ref={usernameRef} placeholder="Username" className="w-full p-4 rounded-full" type="text" required />
                </Col>
                
                <Col className="mb-3" lg={12} md={12} sm={12} xs={12}>                
                    <input value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setPassword(e.target.value);
                    }} placeholder="Your password" className="w-full p-4 rounded-full" type="password" required />
                </Col>

                <p className="text-white text-base text-center mx-auto mb-5">Password must contain at least 8 characters, 1 number, 1 uppercase letter and 1 lowercase letter</p>
                <button type="submit" className="p-4 rounded-full hover:bg-secondary w-full text-center transition bg-primary text-white">
                    <span className="text-white font-semibold md:block">Join now</span>
                </button>
            </Row>
        </form>
    )
}