import MenuBar from "../components/MenuBar";
import styles from '../styles/Thankyou.module.css';
import {FaCheckCircle} from "react-icons/fa";
import { useEffect } from "react";

export default function ThankYou(){

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.localStorage.removeItem('cart_key');
        }
    }, [])

    return(
        <>
            <MenuBar/>
            <div className={styles.thankyouPage}>
                <FaCheckCircle size={50} color={"black"}/>
                <h1>THANK YOU</h1>
                <h2 style={{color:"var(--dark-grey)"}}>YOUR ORDER HAS BEEN SUCCESSFULLY PLACED.</h2>
            </div>
        </>
    );
}