import MenuBar from "../components/MenuBar";
import Link from "next/link";
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { signup } from '../redux/user';

export default function SignUp(){
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = () => {
        event.preventDefault();
        const user ={
            'firstName': firstName,
            'lastName': lastName,
            'email': email,
            'password': password
        };
        //thunk action can only accepts 1 argument
        dispatch(signup(user));
    }

    return(
        <>
            <MenuBar/>

            <form onSubmit={handleSubmit}>
                <label>
                    First Name:
                    <input type="text" value={firstName} onChange={event => setFirstName(event.target.value)} />
                </label>
                <label>
                    Last Name:
                    <input type="text" value={lastName} onChange={event => setLastName(event.target.value)} />
                </label>
                <label>
                    Email:
                    <input type="text" value={email} onChange={event => setEmail(event.target.value)} />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={event => setPassword(event.target.value)} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </>
    );
}