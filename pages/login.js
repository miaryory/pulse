import MenuBar from "../components/MenuBar";
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { login } from '../redux/user';

export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = () => {
        event.preventDefault();
        console.log('login');
        const user = {
            'email': email,
            'password': password
        }
        dispatch(login(user));
    }

    return(
        <>
            <MenuBar/>

            <form onSubmit={handleSubmit}>
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