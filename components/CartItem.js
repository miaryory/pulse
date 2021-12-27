import { FaTimes } from "react-icons/fa";
import Link from "next/link";
import Image from 'next/image';
import { setCart } from '../redux/cart';
import { useSelector, useDispatch} from 'react-redux';
import styles from '../styles/CartItem.module.css';
import cocart from '../lib/cocart';


export default function CartItem({id, item_key, featured_image, name, cart_item_data, quantity, price}){
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

            <div className={styles.cartItemInfo}>
                <p className={styles.cartItemName}>{name.toUpperCase()}</p>
                <p className={styles.cartItemDetails}>{cart_item_data.size}</p>
                <p className={styles.cartItemPrice}>{price*(quantity.value)} Ar</p>
                <div className={styles.quantityBtn}>
                    <button onClick={decrementQty}>-</button>
                    <p>{quantity.value}</p>
                    <button onClick={incrementQty}>+</button>
                </div>
            </div>

            <div className={styles.cartItemDelete}>
                <FaTimes onClick={removeItem} size={20} color={"black"}/>
            </div>
        </div>
        
    );
}
