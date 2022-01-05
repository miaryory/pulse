import MenuBar from "../components/MenuBar";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/user";
import Login from "./login";
import OrderItem from "../components/OrderItem";
import styles from '../styles/Profile.module.css';
import Footer from "../components/Footer";
import woocommerce from '../lib/woocommerce';

export async function getServerSideProps({ res, query: {user = 0} }) {
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    )

    const { data: orders } = await woocommerce.get('orders?customer='+user);

    if (!orders) {
      return {
        notFound: true,
      }
    }

    return {
      props: {
        orders,
      }
    };
}

export default function Profile({orders}){
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
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