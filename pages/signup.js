import MenuBar from "../components/MenuBar";
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { signup } from '../redux/user';
import TextInput from '../components/TextInput';
import styles from '../styles/Signup.module.css';

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

            <form className={styles.signupForm} onSubmit={handleSubmit}>
                <h1>CREATE AN ACCOUNT TO SEE YOUR ORDER HISTORY.</h1>
                <TextInput label="First Name" value={firstName} onChange={event => setFirstName(event.target.value)} />
                <TextInput label="Last Name" value={lastName} onChange={event => setLastName(event.target.value)} />
                <TextInput label="Email" value={email} onChange={event => setEmail(event.target.value)} />
                <TextInput label="Password" value={password} onChange={event => setPassword(event.target.value)} />
                <input className="primaryBtn" type="submit" value="SIGN UP" />
            </form>
        </>
    );
}