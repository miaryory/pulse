import MenuBar from "../components/MenuBar";
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { login } from '../redux/user';

export default function Login(){
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = () => {
        event.preventDefault();
        console.log('login');
        dispatch(login(email));
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