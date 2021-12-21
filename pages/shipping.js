import MenuBar from "../components/MenuBar";
import { useState } from 'react';
import woocommerce from "../lib/woocommerce";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { setBilling } from "../redux/order";
import TextInput from "../components/TextInput";
import styles from '../styles/Shipping.module.css';
import getStripe from "../lib/stripe";
import { useForm } from "react-hook-form";

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
    const { register, formState: { errors }, handleSubmit } = useForm();

    const handleFormSubmit = async() => {
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

        const totalAmount = parseInt(cartTotal) + parseInt(shippingPrice);

        const shippingLine = [{
            method_id: shippingId,
            method_title: shipping,
            total: totalAmount.toString()
        }];

        dispatch(setBilling({billingInfo: billingInfo, shippingInfo: shippingInfo, shippingLine: shippingLine}));
        //redirectToCheckout();
        router.push('/payment');
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

    const isEmpty = cartItems.length === 0;

    return(
        <>
            <MenuBar/>
            {isEmpty ?
            null
            : 
            <>
            <div className={styles.shippingPage}>

                <form onSubmit={handleSubmit(handleFormSubmit)}>

                    <div className={styles.shippingSection1}>
                        <div className={styles.addressGroup}>
                            <h1>SHIPPING ADDRESS</h1>
                            <div className={styles.nameInputGroup}>
                                <div>
                                    <TextInput register={register} required name="firstName" label="First Name" value={firstName} onChange={event => setFirstName(event.target.value)} />
                                    {errors.firstName && <p className="inputErrorMsg">First Name is invalid.</p>}
                                </div>

                                <div>
                                    <TextInput register={register} required name="lastName" label="Last Name" value={lastName} onChange={event => setLastName(event.target.value)} />
                                    {errors.lastName && <p className="inputErrorMsg">Last Name is invalid.</p>}
                                </div>
                            </div>
                            <TextInput register={register} required name="email" label="Email" value={email} onChange={event => setEmail(event.target.value)} />
                            {errors.email && <p className="inputErrorMsg">Email is invalid.</p>}

                            <TextInput register={register} required name="phoneNumber" label="Phone number" value={phoneNumber} onChange={event => setPhoneNumber(event.target.value)} />
                            {errors.phoneNumber && <p className="inputErrorMsg">Phone Number is invalid.</p>}

                            <TextInput register={register} required name="address" label="Address" value={address} onChange={event => setAddress(event.target.value)} />
                            {errors.address && <p className="inputErrorMsg">Address is invalid.</p>}

                            <TextInput register={register} required name="city" label="City" value={city} onChange={event => setCity(event.target.value)} />
                            {errors.city && <p className="inputErrorMsg">City is invalid.</p>}

                            <TextInput register={register} required name="country" label="Country" value={country} onChange={event => setCountry(event.target.value)} />
                            {errors.country && <p className="inputErrorMsg">Country is invalid.</p>}

                            <TextInput register={register} required name="postcode" label="Postal Code" value={postCode} onChange={event => setPostCode(event.target.value)} />
                            {errors.postcode && <p className="inputErrorMsg">Postal Code is invalid.</p>}
                        </div>

                        <div className={styles.shippingMethodGroup}>
                            <h1>SHIPPING METHOD</h1>
                            {shippingMethods.map((method) =>
                                <div className={styles.shippingMethodCard} key={method.id}>
                                    {method.method_id == 'free_shipping' ? 
                                    <>
                                        <label >
                                            <input {...register("shippingMethod", {required: true})} type="radio" name='shipping_selected' value={method.method_id} 
                                            onChange={() => handleShippingMethod(method.method_title, method.method_id, 0)} />
                                            {method.method_title}
                                        </label>
                                        <p style={{fontWeight:"bold"}}>0 Ar</p>
                                    </>
                                    : 
                                    <>
                                        <label >
                                            <input {...register("shippingMethod", {required: true})} type="radio" name='shipping_selected' value={method.method_id} 
                                            onChange={() => handleShippingMethod(method.method_title, method.method_id, method.settings.cost.value)} />
                                            {method.method_title}
                                        </label>
                                        <p style={{fontWeight:"bold"}} >{method.settings.cost.value} Ar</p>
                                    </>
                                    }
                                </div>
                            )}
                            {errors.shippingMethod && <p className="inputErrorMsg">Choose a shipping method.</p>}
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
            }
        </>
    );
}