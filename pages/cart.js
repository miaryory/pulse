import { useCartState } from "../context/cart";

function CartItem({name, quantity}){
    return(
        <div>
            <p>{name}</p>
            <p>{quantity}</p>
        </div>
    );
}

export default function CartPage () {
    const { line_items, subtotal } = useCartState();

    const isEmpty = line_items.length === 0;

    if(isEmpty) return <p>Your cart is empty</p>;

    return(
        // <pre>{JSON.stringify(line_items, null, 2)}</pre>
        <div>
            <h1>Cart</h1>

            {line_items.map(item => 
                <CartItem key={item.id} {...item}/> 
            )}

            <hr/>

            <p>Sub-total: {subtotal.formatted_with_code}</p>
        </div>
    );

}