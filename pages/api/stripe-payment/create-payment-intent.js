import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            // Create a PaymentIntent with the order amount and currency
            const paymentIntent = await stripe.paymentIntents.create({
                amount: req.body,
                currency: "mga",
            });
          
            //return the response as JSON to the app
            res.status(200).json(paymentIntent);
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    } 
    else {
        res.setHeader('Allow', 'POST');
        res.status(405).json({ message: 'Method not allowed' });
    }
}
  