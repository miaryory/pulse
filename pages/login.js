import { useState } from 'react';
import { useDispatch } from "react-redux";
import { login } from '../redux/user';
import TextInput from '../components/TextInput';
import styles from '../styles/Login.module.css';
import Link from 'next/link';
import { useForm } from "react-hook-form";
import MenuBar from '../components/MenuBar';
import Footer from '../components/Footer';


export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const { register, formState: { errors }, handleSubmit } = useForm();

    const handleFormSubmit = () => {
        event.preventDefault();
        const user = {
            'email': email,
            'password': password
        }
        dispatch(login(user));
    }

    return(
        <>
            <MenuBar/>
            <form className={styles.loginForm} onSubmit={handleSubmit(handleFormSubmit)}>
                <h1>LOG IN TO VIEW YOUR ACCOUNT DETAILS.</h1>
                <TextInput register={register} required name="email" label="Email" value={email} onChange={event => setEmail(event.target.value)}/>
                {errors.email && <p className="inputErrorMsg">Email is invalid.</p>}

                <TextInput register={register} required name="password" label="Password" value={password} onChange={event => setPassword(event.target.value)}/>
                {errors.password && <p className="inputErrorMsg">Password is required.</p>}

                <p>No account yet?
                    <Link href='/signup'> Signup here</Link>
                </p>
                <input className="primaryBtn" type="submit" value="LOG IN" />
            </form>
            <Footer/>
        </>
    );
}