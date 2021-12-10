import MenuBar from "../components/MenuBar";
import Link from "next/link";
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { signup } from '../redux/user';

export default function SignUp(){
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = () => {
        event.preventDefault();
        console.log('submit');
        dispatch(signup(email));
    }

    return(
        <>
            <MenuBar/>

            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="text" value={email} onChange={event => setEmail(event.target.value)} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </>
    );
}