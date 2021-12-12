import MenuBar from "../components/MenuBar";
import { useState } from 'react';
import woocommerce from "../lib/woocommerce";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { setBilling } from "../redux/order";

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

    const handleSubmit = () => {
        event.preventDefault();
        console.log('got ot pay');
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
        router.push('/payment');
    }

    const handleShippingMethod = (name, id, price) =>{
        setShipping(name);
        setShippingId(id);
        setShippingPrice(price);
    }

    return(
        <>
            <MenuBar/>
            <div>

                <form onSubmit={handleSubmit}>

                    <div>
                        <h1>SHIPPING ADDRESS</h1>
                        <label>
                            First Name:
                            <input type="text" value={firstName} onChange={event => setFirstName(event.target.value)} />
                        </label>
                        <label>
                            Last Name:
                            <input type="text" value={lastName} onChange={event => setLastName(event.target.value)} />
                        </label>
                        <label>
                            Email:
                            <input type="text" value={email} onChange={event => setEmail(event.target.value)} />
                        </label>
                        <label>
                            Phone number:
                            <input type="text" value={phoneNumber} onChange={event => setPhoneNumber(event.target.value)} />
                        </label>
                        <label>
                            Address:
                            <input type="text" value={address} onChange={event => setAddress(event.target.value)} />
                        </label>
                        <label>
                            City:
                            <input type="text" value={city} onChange={event => setCity(event.target.value)} />
                        </label>
                        <label>
                            Country:
                            <input type="text" value={country} onChange={event => setCountry(event.target.value)} />
                        </label>
                        <label>
                            Postal Code:
                            <input type="text" value={postCode} onChange={event => setPostCode(event.target.value)} />
                        </label>
                    </div>

                    <div>
                        <h1>SHIPPING METHOD</h1>
                        {shippingMethods.map((method) =>
                            <div key={method.id}>
                                {method.method_id == 'free_shipping' ? 
                                <>
                                    <label >
                                        <input type="radio" name='shipping_selected' value={method.method_id} 
                                        onChange={() => handleShippingMethod(method.method_title, method.method_id, 0)} />
                                        {method.method_title}
                                    </label>
                                    <p>0</p>
                                </>
                                : 
                                <>
                                    <label >
                                        <input type="radio" name='shipping_selected' value={method.method_id} 
                                        onChange={() => handleShippingMethod(method.method_title, method.method_id, method.settings.cost.value)} />
                                        {method.method_title}
                                    </label>
                                    <p>{method.settings.cost.value}</p>
                                </>
                                }
                            </div>
                        )}
                    </div>

                    <div>
                        <h1>CART</h1>
                        <div>
                            {cartItems.map((item) =>
                                <p key={item.item_key}>{item.name+' ('+item.cart_item_data.size +') x'
                                +item.quantity.value+' '+item.totals.total}</p>
                            )}

                        </div>
                        <p>Shipping: {shipping + ' '+ shippingPrice}</p>

                        <p>TOTAL: {parseInt(shippingPrice)+parseInt(cartTotal)}</p>

                    </div>
                    
                    <input type="submit" value="PAY" />
                </form>

            </div>
        </>
    );
}