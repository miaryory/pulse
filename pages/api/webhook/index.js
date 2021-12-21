import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
    api: {
      bodyParser: false,
    },
};

export default async function handler(req, res) {
    if (req.method === 'POST') {
        let event = req.body;
        const signature = req.headers['stripe-signature'];
        try {
            event = stripe.webhooks.constructEvent(
                request.body,
                signature,
                process.env.STRIPE_WEBHOOK_SECRET
            );

            // Successfully constructed event
            console.log('✅ Success:', event.id);

            // Handle event type (add business logic here)
            if (event.type === 'payment_intent.succeeded') {
                console.log(`💰  Payment received!`);
            } 
            if (event.type === 'charge.succeeded') {
                console.log(`💰  Payment received!`);
                router.push('/thankyou');
                window.localStorage.removeItem('cart_key');
            } 
            else {
                console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
            }

            // Return a response to acknowledge receipt of the event.
            //res.json({ received: true });
            res.send();
            
        } catch(err) {
            console.log(`❌ Error message: ${err.message}`);
            res.status(400).json({ message: `Webhook Error: ${err.message}` });
            return;
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).json({ message: 'Method not allowed' });
    }
}