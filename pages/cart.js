import commerce from '../lib/commerce';
import MenuBar from "../components/MenuBar";
import styles from '../styles/Cart.module.css';
import Image from 'next/image';
import { FaTimes } from "react-icons/fa";
import Link from "next/link";
import { useSelector, useDispatch} from 'react-redux';
import { setCart } from '../redux/cart';


function CartItem({id, image, name, quantity, line_total, permalink}){
    const dispatch = useDispatch();

    const handleUpdateCart = ({cart}) =>{
        dispatch(setCart(cart));
    }

    const removeItem = () =>{
        commerce.cart.remove(id).then(handleUpdateCart);
    }

    const decrementQty = () => {
        quantity > 1 ? commerce.cart.update(id, {quantity: quantity -1}).then(handleUpdateCart)
        :
        removeItem();
    }

    const incrementQty = () => {
        commerce.cart.update(id, {quantity: quantity+1}).then(handleUpdateCart);
    }

    return(
        <div className={styles.cartItem}>
            <Link href={`/products/${permalink}`} passHref>
                <div className={styles.cartItemImage}>
                    <Image src={image.url} alt='Product' width={150} height={150} />
                </div>
            </Link>

            <div>
                <p className={styles.cartItemName}>{name.toUpperCase()}</p>
                <p className={styles.cartItemDetails}>details</p>
                <p className={styles.cartItemPrice}>{line_total.formatted_with_code}</p>
                <div className={styles.quantityBtn}>
                    <button onClick={decrementQty}>-</button>
                    <p>{quantity}</p>
                    <button onClick={incrementQty}>+</button>
                </div>
            </div>

            <div>
                <FaTimes onClick={removeItem} size={20} color={"black"}/>
            </div>
        </div>
        
    );
}

export default function CartPage () {
    const line_items = useSelector(state => state.cart.line_items);
    const subtotal = useSelector(state => state.cart.subtotal);
    const dispatch = useDispatch();

    const handleUpdateCart = ({cart}) =>{
        dispatch(setCart(cart));
    }
    
    const emptyCart = () =>{
        commerce.cart.empty().then(handleUpdateCart);
    }
    
    const isEmpty = line_items.length === 0;
    
    return(
        <>
            <MenuBar/>
            <div className={styles.cartPage}>

                {isEmpty ?
                    <p>Your cart is empty.</p>
                :
                    <div>
                        <h1>CART</h1>

                        {line_items.map(item => 
                            <CartItem key={item.id} {...item}/> 
                        )}

                        <button className={styles.emptyCartBtn} onClick={emptyCart}>Empty cart</button>

                        <div className={styles.cartTotal}>
                            <p>TOTAL</p>
                            <p>{subtotal.formatted_with_code}</p>
                        </div>

                        <button className={styles.checkoutBtn} >CHECKOUT</button>
                    </div>
                }
            </div>
        </>
    );

}