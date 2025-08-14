import { useState, FormEvent } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";

import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";

import { BUTTON_TYPE_CLASSES } from "../button/button.component";

import {
  PaymentFormContainer,
  FormContainer,
  PaymentButton,
} from "./payment-form.styles";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);

  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const paymentHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setPaymentError(
        "Payment system not loaded. Please refresh and try again."
      );
      return;
    }

    if (amount === 0) {
      setPaymentError("Your cart is empty. Please add items before checkout.");
      return;
    }

    setIsProcessingPayment(true);
    setPaymentError(null);
    setPaymentSuccess(false);

    try {
      // For demo purposes, we'll simulate a successful payment
      // In production, uncomment the Stripe integration below

      // Demo mode - simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setPaymentSuccess(true);
      alert(`Payment of $${amount} successful! (Demo Mode)`);

      /* 
      // Uncomment this for real Stripe integration:
      
      const response = await fetch('/.netlify/functions/create-payment-intent', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: amount * 100 }),
      }).then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      });

      const clientSecret = response.paymentIntent.client_secret;
      const cardDetails = elements.getElement(CardElement);

      if (cardDetails === null) {
        throw new Error('Card details not found');
      }

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardDetails,
          billing_details: {
            name: currentUser ? currentUser.displayName : 'Guest',
          },
        },
      });

      if (paymentResult.error) {
        setPaymentError(paymentResult.error.message || 'Payment failed');
      } else {
        if (paymentResult.paymentIntent.status === 'succeeded') {
          setPaymentSuccess(true);
          alert('Payment Successful!');
        }
      }
      */
    } catch (error) {
      console.error("Payment error:", error);
      setPaymentError(
        error instanceof Error
          ? error.message
          : "Payment failed. Please try again."
      );
    } finally {
      setIsProcessingPayment(false);
    }
  };
  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment:</h2>

        {paymentError && (
          <div
            style={{
              color: "red",
              marginBottom: "10px",
              padding: "10px",
              background: "#ffebee",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          >
            {paymentError}
          </div>
        )}

        {paymentSuccess && (
          <div
            style={{
              color: "green",
              marginBottom: "10px",
              padding: "10px",
              background: "#e8f5e8",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          >
            Payment completed successfully!
          </div>
        )}

        <div style={{ marginBottom: "20px" }}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
              },
            }}
          />
        </div>

        <PaymentButton
          isLoading={isProcessingPayment}
          buttonType={BUTTON_TYPE_CLASSES.inverted}
          disabled={!stripe || isProcessingPayment || amount === 0}
        >
          {isProcessingPayment ? "Processing..." : `Pay $${amount} now`}
        </PaymentButton>

        <div
          style={{
            marginTop: "15px",
            fontSize: "12px",
            color: "#666",
            textAlign: "center",
          }}
        >
          Demo Mode - Use test card: 4242 4242 4242 4242
        </div>
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;
