import { useState } from 'react';
import { useDispatch } from "react-redux";
import { getOrders, login, setOrders } from '../redux/user';
import TextInput from '../components/TextInput';
import styles from '../styles/Login.module.css';

export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = () => {
        event.preventDefault();
        const user = {
            'email': email,
            'password': password
        }
        dispatch(login(user)).then((response) =>{ 
            dispatch(getOrders(response.payload.user.id));
        });
    }

    return(
        <>
            <form className={styles.loginForm} onSubmit={handleSubmit}>
                <h1>LOG IN TO VIEW YOUR ACCOUNT DETAILS.</h1>
                <TextInput label="Email" value={email} onChange={event => setEmail(event.target.value)} />
                <TextInput label="Password" value={password} onChange={event => setPassword(event.target.value)} />
                <input className="primaryBtn" type="submit" value="LOG IN" />
            </form>
        </>
    );
}