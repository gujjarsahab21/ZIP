import { useState } from 'react';

const PaymentPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = async (paymentMethod) => {
    setIsLoading(true);

    // Call the backend payment API to process payment
    try {
      const response = await fetch('/api/payment/pay', {
        method: 'POST',
        body: JSON.stringify({ paymentMethod }), // You can send payment details if needed
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        setPaymentSuccess(true);
      } else {
        alert('Payment failed!');
      }
    } catch (err) {
      console.error('Error processing payment:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <h2 className="text-2xl font-bold text-center mb-6">Payment Options</h2>

      <div className="space-y-4">
        <button
          onClick={() => handlePayment('mobile_money')}
          className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Pay with Mobile Money'}
        </button>

        <button
          onClick={() => handlePayment('credit_card')}
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Pay with Credit/Debit Card'}
        </button>

        <button
          onClick={() => handlePayment('bank_transfer')}
          className="w-full py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Pay with Bank Transfer'}
        </button>
      </div>

      {paymentSuccess && (
        <div className="mt-6 text-center text-green-600">
          <p>Payment successful! Thank you for your payment.</p>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
