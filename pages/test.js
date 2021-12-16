import { useState } from 'react';
import TextInput from '../components/TextInput';
import styles from '../styles/Login.module.css';
import { useForm } from "react-hook-form";
import MenuBar from '../components/MenuBar';

export default function Test(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = () =>{
        console.log('submit');
    }

    return(
        <>
            <MenuBar/>
            <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
                <h1>LOG IN TO VIEW YOUR ACCOUNT DETAILS.</h1>
                <TextInput register={register} required name="email" label="Email"  value={email} onChange={event => setEmail(event.target.value)} />
                
                <TextInput register={register} required name="password" label="Password" value={password} onChange={event => setPassword(event.target.value)} />
                <p>No account yet?</p>
                <input className="primaryBtn" type="submit" value="LOG IN" />
            </form>
        </>
    );
}