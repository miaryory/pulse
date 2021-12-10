import { useDispatch } from 'react-redux';
import cocart from '../lib/cocart';
import { setCart } from '../redux/cart';
import { setUser } from '../redux/user';

export default function GetSessionInfo(){
    const dispatch = useDispatch();
    const oldCart = '';
    const loggedUser = '';
    
    //checks if the page is rendered to get the localStorage
    if (typeof window !== "undefined") {
        oldCart = window.localStorage.getItem('cart_key');
        loggedUser = window.localStorage.getItem('user_token');
        
        if(oldCart !== null){
            cocart.get('cart?cart_key='+oldCart).then((response) => {
                dispatch(setCart(response.data));
            });
        }

        if(loggedUser !== null){
            dispatch(setUser(loggedUser));
        }
    }

    return null;
}