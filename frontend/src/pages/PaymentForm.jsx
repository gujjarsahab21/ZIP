import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

// Replace with your actual Stripe publishable key
const stripePromise = loadStripe('pk_test_51QOQihJXTfjasTWj0OTWMYdxdCnHuYJUDxG9fwcUwDp3qYztCit9kBeDC9doDgfobcTyhkwU6y0WEIosG0y7KZft00HJqDOBWx');

const PaymentForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!stripe || !elements) {
      return;
    }

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (error) {
        setPaymentStatus('Payment failed. Please try again.');
        console.error('Payment Error:', error);
      } else if (paymentIntent.status === 'succeeded') {
        setPaymentStatus('Payment successful! Your membership is now active.');
      }
    } catch (error) {
      setPaymentStatus('An error occurred. Please try again.');
      console.error('Error during payment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement className="p-2 border rounded mb-4" />
      <button type="submit" disabled={!stripe || isLoading} className="bg-blue-500 text-white px-4 py-2 rounded">
        {isLoading ? 'Processing...' : 'Pay Now'}
      </button>
      {paymentStatus && <p className="mt-4">{paymentStatus}</p>}
    </form>
  );
};

const PaymentPage = () => {
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/payments/create-intent`, {
          amount: 100, // Replace with dynamic amount
          currency: 'usd', // Replace with dynamic currency if needed
        });
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error('Error fetching payment intent:', error);
      }
    };

    createPaymentIntent();
  }, []);

  return (
    <div>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Complete Payment</h2>
        {clientSecret ? (
          <Elements stripe={stripePromise}>
            <PaymentForm clientSecret={clientSecret} />
          </Elements>
        ) : (
          <p>Loading payment details...</p>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
