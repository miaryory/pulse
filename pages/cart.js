import cocart from '../lib/cocart';
import MenuBar from "../components/MenuBar";
import styles from '../styles/Cart.module.css';
import Image from 'next/image';
import { FaTimes } from "react-icons/fa";
import Link from "next/link";
import { useSelector, useDispatch} from 'react-redux';
import { setCart, clearCart } from '../redux/cart';
import { useRouter } from 'next/router';
import { setLineItems } from '../redux/order';


function CartItem({id, item_key, featured_image, name, cart_item_data, quantity, price}){
    const dispatch = useDispatch();
    const cartKey = useSelector(state => state.cart.cart_key);

    const handleUpdateCart = (cart) =>{
        dispatch(setCart(cart));
    }

    const removeItem = () =>{
        cocart.delete("cart/item/"+item_key+"?cart_key="+cartKey+"&return_cart")
        .then((response) => {
            handleUpdateCart(response.data);
        });
    }

    const decrementQty = () => {
        quantity.value > 1 ? cocart.post("cart/item/"+item_key+"?cart_key="+cartKey+"&return_cart", {quantity: quantity.value -1})
        .then((response) => {
            handleUpdateCart(response.data);
        })
        :
        removeItem();
    }

    const incrementQty = () => {
        cocart.post("cart/item/"+item_key+"?cart_key="+cartKey+"&return_cart", {quantity: quantity.value +1})
        .then((response) => {
            handleUpdateCart(response.data);
        });
    }

    return(
        <div className={styles.cartItem}>
            <Link href={`/products/${id}`} passHref>
                <div className={styles.cartItemImage}>
                    <Image src={featured_image} alt='Product' width={150} height={150} />
                </div>
            </Link>

            <div>
                <p className={styles.cartItemName}>{name.toUpperCase()}</p>
                <p className={styles.cartItemDetails}>{cart_item_data.size}</p>
                <p className={styles.cartItemPrice}>{price*(quantity.value)}</p>
                <div className={styles.quantityBtn}>
                    <button onClick={decrementQty}>-</button>
                    <p>{quantity.value}</p>
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
                    <div>
                        <h1>CART</h1>

                        {items.map(item => 
                            <CartItem key={item.item_key} {...item}/> 
                        )}

                        <button className={styles.emptyCartBtn} onClick={emptyCart}>Empty cart</button>

                        <div className={styles.cartTotal}>
                            <p>TOTAL</p>
                            <p>{subtotal}</p>
                        </div>

                        <button className={styles.checkoutBtn} onClick={goToCheckout} >CHECKOUT</button>

                    </div>
                }
            </div>
        </>
    );

}