import { useDispatch } from 'react-redux';
import cocart from '../lib/cocart';
import { setCart } from '../redux/cart';

export default function GetCart(){
    const dispatch = useDispatch();
    const oldCart='';
    
    //checks if the page is rendered to get the localStorage
    if (typeof window !== "undefined") {
        oldCart = window.localStorage.getItem('cart_key');
        
        if(oldCart !== null){
            cocart.get('cart?cart_key='+oldCart).then((response) => {
                dispatch(setCart(response.data));
            });
        }
    }

    return null;
}