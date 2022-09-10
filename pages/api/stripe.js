const Stripe = require('stripe');
const key = process.env.STRIPE_SECRET_KEY;

const stripe = Stripe(`${key}`);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_options: [{ shipping_rate: 'shr_1LfswgAlME2uKKkHFWUlZf9f' }],
        line_items: req.body.map((item) => {
          console.log(item);
          return {
            price_data: {
              currency: 'usd',
              product_data: {
                name: item.product.name,
                images: [item.product.image[0]?.image],
              },
              unit_amount: item.product.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      };

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);

      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
