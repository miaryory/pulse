import { useDispatch } from 'react-redux';
import cocart from '../lib/cocart';
import { setCart } from '../redux/cart';
import { setUser } from '../redux/user';

export default function GetSessionInfo(){
    const dispatch = useDispatch();
    const oldCart = '';
    const loggedUserToken = '';
    const loggedUserId = '';
    
    //checks if the page is rendered to get the localStorage
    if (typeof window !== "undefined") {
        oldCart = window.localStorage.getItem('cart_key');
        loggedUserToken = window.localStorage.getItem('user_token');
        loggedUserId = window.localStorage.getItem('user_id');
        
        if(oldCart !== null){
            cocart.get('cart?cart_key='+oldCart).then((response) => {
                dispatch(setCart(response.data));
            });
        }

        if(loggedUserToken !== null){
            dispatch(setUser({loggedUserToken: loggedUserToken, loggedUserId: loggedUserId}));
        }
    }

    return null;
}