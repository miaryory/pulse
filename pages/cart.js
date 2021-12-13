import cocart from '../lib/cocart';
import MenuBar from "../components/MenuBar";
import Footer from '../components/Footer';
import styles from '../styles/Cart.module.css';
import CartItem from '../components/CartItem';
import { useSelector, useDispatch} from 'react-redux';
import { clearCart } from '../redux/cart';
import { useRouter } from 'next/router';
import { setLineItems } from '../redux/order';

export default function CartPage () {
    const items = useSelector(state => state.cart.items);
    const subtotal = useSelector(state => state.cart.subtotal);
    const cartKey = useSelector(state => state.cart.cart_key);
    const dispatch = useDispatch();
    const router = useRouter();
    
    const emptyCart = () =>{
        cocart.post("cart/clear?cart_key="+cartKey).then(() => {
            if (typeof window !== "undefined") {
                window.localStorage.removeItem('cart_key');
                dispatch(clearCart());
            }
          });
    }

    const goToCheckout = () =>{
        const lineItems = [];

        items.map((item) =>
            lineItems.push({product_id: item.id, name: item.name +' '+item.cart_item_data.size, quantity: item.quantity.value})
        );

        dispatch(setLineItems(lineItems));

        router.push({
            pathname: '/shipping',
        });
    }
    
    const isEmpty = items.length === 0;
    
    return(
        <>
            <MenuBar/>
            <div className={styles.cartPage}>

                {isEmpty ?
                    <p>Your cart is empty.</p>
                :
                    <div className={styles.cartPageContainer}>
                        <h1>CART</h1>

                        {items.map(item => 
                            <CartItem key={item.item_key} {...item}/> 
                        )}

                        <button className={styles.emptyCartBtn} onClick={emptyCart}>Empty cart</button>

                        <div className={styles.cartTotal}>
                            <p>TOTAL</p>
                            <p>{subtotal}</p>
                        </div>

                        <button className="primaryBtn" onClick={goToCheckout} >CHECKOUT</button>

                    </div>
                }
            </div>
            <Footer/>
        </>
    );

}