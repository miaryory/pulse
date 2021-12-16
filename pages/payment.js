import woocommerce from "../lib/woocommerce";
import MenuBar from "../components/MenuBar";
import { useDispatch } from "react-redux";
import { useState } from "react";


export async function getStaticProps() {
    const { data: paymentMethods} = await woocommerce.get('payment_gateways');

    return {
        props: {
            paymentMethods,
        },
    };
}

export default function Payment({paymentMethods}){
    const dispatch = useDispatch();
    const [paymentMethod, setPaymentMethod] = useState('');
    const [paymentTitle, setPaymentTitle] = useState('');

    const handlePaymentMethod = (method, title) => {
        setPaymentMethod(method);
        setPaymentTitle(title);
    }

    const handleSubmit = () =>{
        event.preventDefault();
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
            <div>
                <form onSubmit={handleSubmit}>
                {paymentMethods.map((payment) => 
                    payment.enabled ?
                        <label key={payment.id} >
                            <input type="radio" name='payment_selected' value={payment.id} 
                            onChange={() => handlePaymentMethod(event.target.value, payment.method_title)}/>
                            {payment.method_title}
                        </label>
                    :
                    null
                )}

                <input type="submit" value="CONFRIM PAYMENT" />
                </form>
            </div>
            
        </>
    );
}