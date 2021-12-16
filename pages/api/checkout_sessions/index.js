import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            //stripe API to create a session
            const session = await stripe.checkout.sessions.create({
                mode: 'payment',
                payment_method_types: ['card'],
                line_items: req.body,
                success_url: `${req.headers.origin}/thankyou`,
                cancel_url: `${req.headers.origin}/shipping`,
            });
          
            //return the response as JSON to the app
            res.status(200).json(session);
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
  