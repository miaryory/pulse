import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import commerce from '../lib/commerce';
import { setCart } from '../redux/cart';

export default function GetCart(){
    useEffect(() =>{
        getCart();
    }, []);

    const dispatch = useDispatch();

    const getCart = async() => {
        try{
            const cart = await commerce.cart.retrieve();
            dispatch(setCart(cart));
        }
        catch(err){
            console.log(err);
        }
    }

    return null;
}