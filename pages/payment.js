import woocommerce from "../lib/woocommerce";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import styles from '../styles/Payment.module.css';
import { useRouter } from "next/router";
import { clearCart } from "../redux/cart";
import { clearOrderStored, createOrder } from "../redux/order";

export async function getStaticProps() {
    const { data: paymentMethods} = await woocommerce.get('payment_gateways');

    return {
        props: {
            paymentMethods,
        },
    };
}

export default function Payment({paymentMethods}){
    const [displayStripe, setDisplayStripe] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState('');
    const finalTotal = useSelector(state => state.order.shipping_lines[0].total);
    const stripe = useStripe();
    const elements = useElements();
    const router = useRouter();
    const dispatch = useDispatch();
    const payment_method = useSelector(state => state.order.payment_method);
    const payment_method_title = useSelector(state => state.order.payment_method_title);
    const billing = useSelector(state => state.order.billing);
    const shipping = useSelector(state => state.order.shipping);
    const line_items = useSelector(state => state.order.line_items);
    const shipping_lines = useSelector(state => state.order.shipping_lines);
    const customer_id = useSelector(state => state.order.customer_id);
    
    useEffect(() => {
        //create a payment intent as soon as the user lands on the payment page
        async function createPaymentIntent(){
            // Create PaymentIntent as soon as the page loads
            const request = await fetch("/api/stripe-payment/create-payment-intent", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: finalTotal,
            });
    
            if(request.ok){
                const response = await request.json();
                //console.log(response.client_secret);
                setClientSecret(response.client_secret);
            }
        }
        createPaymentIntent();
    }, [finalTotal]);

    const handleChange = async (event) => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    };

    //show and hide payment form depends on the user choice
    const handlePaymentMethod = (method) => {
        setPaymentMethod(method);
        if(method === "card"){
            setDisplayStripe(true);
        }
        else{
            setDisplayStripe(false);
        }
    }

    //construct the payload to send the order to Woocomerce
    const orderPayload = {
        customer_id: customer_id,
        payment_method: payment_method,
        payment_method_title: payment_method_title,
        set_paid: true,
        billing: billing,
        shipping: shipping,
        line_items: line_items,
        shipping_lines: shipping_lines
    };

    const successOrder = () =>{
        dispatch(createOrder(orderPayload));
        dispatch(clearCart());
        dispatch(clearOrderStored());
        router.push('/thankyou');
    }

    const handleSubmit = async() =>{
        event.preventDefault();

        // Stripe.js has not yet loaded.
        if (!stripe || !elements) {
            return;
        }

        if(paymentMethod === "card"){
            setProcessing(true);
    
            const payload = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement)
                }
            });
    
            if (payload.error) {
                setError(`Payment failed ${payload.error.message}`);
                setProcessing(false);
            } else {
                if(payload.paymentIntent.status === 'succeeded'){
                    setError(null);
                    setProcessing(false);
                    setSucceeded(true);
                    successOrder();
                }
            }
        }
        else{
            successOrder();
        }
    }
    
    return(
        <>
            <div className={styles.paymentPage}>
                <button className={styles.backBtn} onClick={() => router.push('/')}>
                    Cancel
                </button>
                <form onSubmit={handleSubmit}>
                    <h1>{finalTotal} AR</h1>
                    <h2>SELECT YOUR PAYMENT METHOD</h2>
                    {paymentMethods.map((payment) => 
                        payment.enabled ?
                            <div key={payment.id} className={styles.paymentRadioBtn}>
                                <label >
                                    <input type="radio" name='payment_selected' value={payment.id} 
                                    onChange={() => handlePaymentMethod(event.target.value)}/>
                                    {payment.method_title}
                                </label>
                            </div>
                        :
                        null
                    )}
                    <div>
                        <label >
                            <input type="radio" name='payment_selected' value='card' 
                            onChange={() => handlePaymentMethod('card')}/>
                            Card
                        </label>
                    </div>

                    {displayStripe ? 
                    <div>
                        <p style={{opacity:'0.4'}}>Test card:  4000 0025 0000 0003</p>
                        <div className={styles.cardContainer}>
                            <CardElement id="card-element" onChange={handleChange} />
                        </div>
                        {error && (
                            <div role="alert">
                            {error}
                            </div>
                        )}
    
                        {succeeded ? <p>Payment succeeded</p> : null}
                    </div>
                    : 
                    null}
                    
                    <input className="primaryBtn" type="submit" value="CONFRIM PAYMENT" />
                </form>
            </div>
            
        </>
    );
}