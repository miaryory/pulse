import MenuBar from "../components/MenuBar";
import styles from '../styles/Thankyou.module.css';
import {FaCheckCircle} from "react-icons/fa";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearCart } from '../redux/cart';

export default function ThankYou(){
    const dispatch = useDispatch();
    const order = useSelector(state => state.order.order);

    useEffect(() => {
        //console.log(order);
        dispatch(clearCart());
        /*if (typeof window !== "undefined") {
            window.localStorage.removeItem('cart_key');
        }*/
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