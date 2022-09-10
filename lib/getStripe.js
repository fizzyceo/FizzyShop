import { loadStripe } from '@stripe/stripe-js';

let stripePromise = null;
console.log(process.env.STRIPE_PUBLISHABALE_KEY);
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(`${process.env.STRIPE_PUBLISHABALE_KEY}`);
  }

  return stripePromise;
};

export default getStripe;
