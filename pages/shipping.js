import MenuBar from "../components/MenuBar";
import { useState } from 'react';
import woocommerce from "../lib/woocommerce";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { setBilling } from "../redux/order";
import TextInput from "../components/TextInput";
import styles from '../styles/Shipping.module.css';
import getStripe from "../lib/stripe";


export async function getStaticProps() {
    const { data: shippingMethods} = await woocommerce.get('shipping/zones/1/methods');

    return {
        props: {
        shippingMethods,
        },
    };
}

export default function Shipping({shippingMethods}){
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [postCode, setPostCode] = useState('');
    const [shipping, setShipping] = useState('');
    const [shippingId, setShippingId] = useState('');
    const [shippingPrice, setShippingPrice] = useState(0);
    const cartItems = useSelector(state => state.cart.items);
    const cartTotal = useSelector(state => state.cart.subtotal);
    const router = useRouter();
    const dispatch = useDispatch();

    const handleSubmit = async() => {
        event.preventDefault();
        //fill order info
        const billingInfo = {
            first_name: firstName,
            last_name: lastName,
            address_1: address,
            address_2: "",
            city: city,
            state: "",
            postcode: postCode,
            country: country,
            email: email,
            phone: phoneNumber
        }
        
        const shippingInfo = {
            first_name: firstName,
            last_name: lastName,
            address_1: address,
            address_2: "",
            city: city,
            state: "",
            postcode: postCode,
            country: country
        }

        const shippingLine = [{
            method_id: shippingId,
            method_title: shipping,
            total: cartTotal
        }];

        dispatch(setBilling({billingInfo: billingInfo, shippingInfo: shippingInfo, shippingLine: shippingLine}));
        redirectToCheckout();
        //router.push('/payment');
    }

    const redirectToCheckout = async () => {
        //create array of objects for line_items in stripe
        const lineItems = [];
            
        cartItems.map((item) => {
            const i = {
                name: item.name,
                amount: item.price,
                currency: 'mga',
                quantity: item.quantity.value,
            }
            lineItems.push(i);
        });

        lineItems.push({
            name: 'Shipping' +shipping,
            amount: shippingPrice,
            currency: 'mga',
            quantity: 1,
        })

        const request = await fetch('/api/checkout_sessions', {
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(lineItems),
        });

        if(request.ok){
            const response = await request.json();
            const stripe = await getStripe();
            await stripe.redirectToCheckout({ sessionId: response.id });
        }
    }      
      
    const handleShippingMethod = (name, id, price) =>{
        setShipping(name);
        setShippingId(id);
        setShippingPrice(price);
    }

    return(
        <>
            <MenuBar/>
            <div className={styles.shippingPage}>

                <form onSubmit={handleSubmit}>

                    <div className={styles.shippingSection1}>
                        <div className={styles.addressGroup}>
                            <h1>SHIPPING ADDRESS</h1>
                            {/* <label>
                                First Name:
                                <input className="inputField" type="text" value={firstName} onChange={event => setFirstName(event.target.value)} />
                            </label> */}
                            <div className={styles.nameInputGroup}>
                                <TextInput label="First Name" value={firstName} onChange={event => setFirstName(event.target.value)} />
                                <TextInput label="Last Name" value={lastName} onChange={event => setLastName(event.target.value)} />
                            </div>
                            <TextInput label="Email" value={email} onChange={event => setEmail(event.target.value)} />
                            <TextInput label="Phone number" value={phoneNumber} onChange={event => setPhoneNumber(event.target.value)} />
                            <TextInput label="Address" value={address} onChange={event => setAddress(event.target.value)} />
                            <TextInput label="City" value={city} onChange={event => setCity(event.target.value)} />
                            <TextInput label="Country" value={country} onChange={event => setCountry(event.target.value)} />
                            <TextInput label="Postal Code" value={postCode} onChange={event => setPostCode(event.target.value)} />
                        </div>

                        <div className={styles.shippingMethodGroup}>
                            <h1>SHIPPING METHOD</h1>
                            {shippingMethods.map((method) =>
                                <div className={styles.shippingMethodCard} key={method.id}>
                                    {method.method_id == 'free_shipping' ? 
                                    <>
                                        <label >
                                            <input type="radio" name='shipping_selected' value={method.method_id} 
                                            onChange={() => handleShippingMethod(method.method_title, method.method_id, 0)} />
                                            {method.method_title}
                                        </label>
                                        <p style={{fontWeight:"bold"}}>0 Ar</p>
                                    </>
                                    : 
                                    <>
                                        <label >
                                            <input type="radio" name='shipping_selected' value={method.method_id} 
                                            onChange={() => handleShippingMethod(method.method_title, method.method_id, method.settings.cost.value)} />
                                            {method.method_title}
                                        </label>
                                        <p style={{fontWeight:"bold"}} >{method.settings.cost.value} Ar</p>
                                    </>
                                    }
                                </div>
                            )}
                        </div>

                    </div>

                    <div className={styles.shippingSection2}>
                        <div className={styles.shippingCartGroup}>
                            <h1>CART</h1>
                            <div className={styles.cartCard}>
                                {cartItems.map((item) =>
                                    <div className={styles.cartCardItem} key={item.item_key}>
                                        <p>{item.name.toUpperCase()+' ('+item.cart_item_data.size +') x'+item.quantity.value}</p>
                                        <p>{item.totals.total} Ar</p>
                                    </div>
                                )}

                                <div className={styles.cartCardItem}>
                                    <p>SHIPPING: {shipping} </p>
                                    <p>{shippingPrice} Ar</p>
                                </div>

                                <div className={styles.cartCardItem}>
                                    <p style={{fontWeight:"bold"}}>TOTAL</p>
                                    <p  style={{fontWeight:"bold"}}>{parseInt(shippingPrice)+parseInt(cartTotal)} Ar</p>
                                </div>
                            </div>

                            <input className="primaryBtn" type="submit" value="GO TO PAYMENT" />
                        </div>
                    </div>
                </form>

            </div>
        </>
    );
}