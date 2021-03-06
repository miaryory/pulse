import MenuBar from "../components/MenuBar";
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { signup } from '../redux/user';
import TextInput from '../components/TextInput';
import styles from '../styles/Signup.module.css';
import Link from "next/link";
import { useForm } from "react-hook-form";
import Footer from "../components/Footer";


export default function SignUp(){
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const successMsg = useSelector(state => state.user.signupSuccessMsg);
    const dispatch = useDispatch();
    const { register, formState: { errors }, handleSubmit } = useForm();

    const handleFormSubmit = () => {
        event.preventDefault();
        
        const user ={
            'firstName': firstName,
            'lastName': lastName,
            'email': email,
            'password': password
        };
        //thunk action can only accepts 1 argument
        dispatch(signup(user));

        //resetting form
        setEmail('');
        setFirstName('');
        setLastName('');
        setPassword('');
    }

    return(
        <>
            <MenuBar/>

            <form className={styles.signupForm} onSubmit={handleSubmit(handleFormSubmit)}>
                <h1>CREATE AN ACCOUNT TO SEE YOUR ORDER HISTORY.</h1>
                <p style={{'fontWeight': 'bold'}}>{successMsg}</p>
                <TextInput register={register} required name="firstName" label="First Name" value={firstName} onChange={event => setFirstName(event.target.value)} />
                {errors.firstName && <p className="inputErrorMsg">First Name is invalid.</p>}

                <TextInput register={register} required name="lastName" label="Last Name" value={lastName} onChange={event => setLastName(event.target.value)} />
                {errors.lastName && <p className="inputErrorMsg">Last Name is invalid.</p>}

                <TextInput register={register} required name="email" label="Email" value={email} onChange={event => setEmail(event.target.value)} />
                {errors.email && <p className="inputErrorMsg">Email is invalid.</p>}

                <TextInput register={register} required name="password" label="Password" value={password} onChange={event => setPassword(event.target.value)} />
                {errors.password && <p className="inputErrorMsg">Password is invalid.</p>}

                <div style={{'display': 'inline-flex', 'gap': '5px'}}>
                    <p>Already have an account? </p>
                    <Link href='/profile' passHref>
                        <p style={{'cursor': 'pointer', 'textDecoration': 'underline'}}> Login here</p>
                    </Link>
                </div>
                
                <input className="primaryBtn" type="submit" value="SIGN UP" />
            </form>

            <Footer/>
        </>
    );
}