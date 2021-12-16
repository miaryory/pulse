import MenuBar from "../components/MenuBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { logout, getOrders } from "../redux/user";
import Login from "./login";
import OrderItem from "../components/OrderItem";
import styles from '../styles/Profile.module.css';

export default function Profile(){
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const allOrders = useSelector(state => state.user.orders);
    const userId = useSelector(state => state.user.userId);
    const dispatch = useDispatch();

    useEffect(() => {
        if(userId){
            dispatch(getOrders(userId));
        }
    }, [])

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
                            {allOrders.length > 0 ? 
                                allOrders.map((order) =>
                                <OrderItem key={order.id} number={order.number} status={order.status} 
                                total={order.total + " "+order.currency_symbol} />
                                )
                                : 
                                <p>You dont have any order.</p>}
                        </div>
                        
                        <button className="primaryBtn" onClick={handleLogout}>LOG OUT</button>
                    </div>
                </>
            : 
            <Login/>}
            
        </>
    );

}