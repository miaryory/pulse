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
        const signature = request.headers['stripe-signature'];
        try {
            event = stripe.webhooks.constructEvent(
                request.body,
                signature,
                process.env.STRIPE_WEBHOOK_SECRET
            );
            
        } catch (err) {
            console.log(`❌ Error message: ${err.message}`);
            res.status(400).json({ message: `Webhook Error: ${err.message}` });
            return;
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).json({ message: 'Method not allowed' });
    }
}