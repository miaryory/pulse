import woocommerce from "../lib/woocommerce";
import MenuBar from "../components/MenuBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import styles from '../styles/Payment.module.css';
import { useRouter } from "next/router";

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

    const dispatch = useDispatch();
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
    }, []);

    const handleChange = async (event) => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
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

    const handleSubmit = async() =>{
        event.preventDefault();

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
                setError(null);
                setProcessing(false);
                setSucceeded(true);
                router.push('/thankyou');
            }
        }
        else{
            router.push('/thankyou');
        }
        //dispatch(setPayment({paymentMethod: paymentMethod, paymentTitle: paymentTitle}));
        //clear the cart
        //clear redux state
        //create orde
        //clear cookies
        //redirect to thank you screen
        //send email??
    }

    return(
        <>
            <MenuBar/>
            <div className={styles.paymentPage}>
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