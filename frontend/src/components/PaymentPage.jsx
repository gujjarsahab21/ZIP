import React, { useState } from 'react';
import axios from 'axios';
import LoggedInNavbar from '../pages/LoggedInNavbar';

const PaymentPage = () => {
  const [membershipType, setMembershipType] = useState('');
  const [amount, setAmount] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const membershipOptions = [
    { type: 'Membership I', price: 100, benefits: ['Access to events', 'Monthly newsletter'] },
    { type: 'Membership II', price: 200, benefits: ['All Membership I benefits', 'Discounted services'] },
    { type: 'Membership III', price: 300, benefits: ['All Membership II benefits', 'Priority support', 'Exclusive content'] },
  ];

  // Get API URL from environment variables
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handleMembershipChange = (type, price) => {
    setMembershipType(type);
    setAmount(price);
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    setPaymentStatus('');
    try {
      const response = await axios.post(`${apiUrl}/api/payments/create-intent`, {
        amount,
        currency: 'USD',
      });

      const { clientSecret } = response.data;
      console.log('Payment Intent Client Secret:', clientSecret);

      setPaymentStatus('Payment initiated successfully! Complete it using Stripe.');
    } catch (error) {
      console.error('Error initiating payment:', error);
      setPaymentStatus('Payment Failed!');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <LoggedInNavbar />
      <div className="p-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-extrabold text-white mb-6 animate-fadeIn">Become a Member Today!</h1>

        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md transform hover:scale-105 transition-all duration-300">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Select Your Membership</h2>

          <div className="space-y-4 mb-6">
            {membershipOptions.map((option, index) => (
              <div
                key={index}
                className={`p-4 border-2 rounded-lg cursor-pointer hover:bg-indigo-100 transition-all ${
                  membershipType === option.type ? 'border-indigo-600' : 'border-gray-300'
                }`}
                onClick={() => handleMembershipChange(option.type, option.price)}
              >
                <h3 className="text-lg font-semibold">{option.type} - ${option.price}</h3>
                <ul className="list-disc pl-5 text-sm text-gray-600">
                  {option.benefits.map((benefit, idx) => (
                    <li key={idx}>{benefit}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <button
            onClick={handlePayment}
            disabled={!membershipType || isProcessing}
            className="bg-indigo-600 text-white py-2 px-4 rounded-lg w-full font-bold disabled:opacity-50 hover:bg-indigo-700 transition-all"
          >
            {isProcessing ? 'Processing...' : 'Pay Now'}
          </button>

          {paymentStatus && (
            <p
              className={`mt-4 text-center ${
                paymentStatus.includes('Failed') ? 'text-red-600' : 'text-green-600'
              }`}
            >
              {paymentStatus}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
