import { loadStripe } from "@stripe/stripe-js";
import { ENV } from "../env/env.utils";

export const stripePromise = loadStripe(ENV.STRIPE_PUBLISHABLE_KEY);
