import MenuBar from "../components/MenuBar";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/user";
import Login from "./login";
import OrderItem from "../components/OrderItem";
import styles from '../styles/Profile.module.css';
import Footer from "../components/Footer";

export default function Profile(){
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const orders = useSelector(state => state.user.orders);
    const dispatch = useDispatch();

    const handleLogout = () =>{
        dispatch(logout());
    }

    return(
        <>
            {isLoggedIn ? 
                <>
                    <MenuBar/>
                    <div className={styles.profilePage}>
                        <h1>ORDER HISTORY</h1>
                        
                        <div>
                            {orders.length > 0 ? 
                                orders.map((order) =>
                                <OrderItem key={order.id} number={order.number} status={order.status} 
                                total={order.total + " "+order.currency_symbol} />
                                )
                                : 
                                <p>You dont have any order.</p>}
                        </div>
                        
                        <button className="primaryBtn" onClick={handleLogout}>LOG OUT</button>
                    </div>
                    <Footer/>
                </>
            : 
            <Login/>}
            
        </>
    );

}