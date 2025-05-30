"use client";

import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { usePaystackPayment } from "react-paystack";
import { Wallet, CreditCard, Lock, AlertCircle, CheckCircle } from "lucide-react";

interface PaystackReference {
  reference: string;
}

interface VerifyPaymentData {
  verifyPayment: {
    walletBalance: number;
  };
}

const VERIFY_PAYMENT = gql`
  mutation VerifyPayment($reference: String!) {
    verifyPayment(reference: $reference) {
      walletBalance
    }
  }
`;

export default function FundWallet() {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [verifyPayment] = useMutation(VERIFY_PAYMENT);

  const config = {
    reference: new Date().getTime().toString(),
    email: "user@example.com", // Replace with actual user email (from auth context)
    amount: parseFloat(amount) * 100, // Convert to kobo
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_KEY!,
  };

  const onSuccess = async (reference: PaystackReference) => {
    setIsLoading(true);
    try {
      const res = await verifyPayment({
        variables: { reference: reference.reference },
      });
      setMessage({
        type: 'success',
        text: `Wallet funded successfully! New balance: ₦${(res.data as VerifyPaymentData).verifyPayment.walletBalance.toLocaleString()}`
      });
      setAmount("");
    } catch (err) {
      console.error("Verification failed:", err);
      setMessage({
        type: 'error',
        text: 'Payment verification failed. Please contact support if money was deducted.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onClose = () => {
    setMessage({
      type: 'error',
      text: 'Transaction was cancelled or not completed'
    });
  };

  const initializePayment = usePaystackPayment(config);

  const handlePayment = () => {
    if (!amount || parseFloat(amount) <= 0) {
      setMessage({
        type: 'error',
        text: 'Please enter a valid amount'
      });
      return;
    }
    
    if (parseFloat(amount) < 100) {
      setMessage({
        type: 'error',
        text: 'Minimum funding amount is ₦100'
      });
      return;
    }

    setMessage(null);
    initializePayment({ onSuccess, onClose });
  };

  const quickAmounts = [500, 1000, 2000, 5000, 10000];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Wallet className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Fund Wallet</h1>
          <p className="text-slate-600">Add money to your VTU-App wallet securely</p>
        </div>

        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-slate-200/50 p-8">
          {/* Amount Input */}
          <div className="mb-6">
            <label htmlFor="amount" className="block text-sm font-semibold text-slate-700 mb-3">
              Enter Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 font-medium">
                ₦
              </span>
              <input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-8 pr-4 py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-lg font-medium"
                placeholder="0.00"
                min="100"
              />
            </div>
          </div>

          {/* Quick Amount Buttons */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-slate-700 mb-3">Quick Select</p>
            <div className="grid grid-cols-3 gap-2">
              {quickAmounts.map((quickAmount) => (
                <button
                  key={quickAmount}
                  onClick={() => setAmount(quickAmount.toString())}
                  className="py-2 px-3 text-sm font-medium text-slate-600 border border-slate-300 rounded-lg hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 transition-all duration-200"
                >
                  ₦{quickAmount.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          {/* Message Display */}
          {message && (
            <div className={`mb-6 p-4 rounded-xl flex items-start space-x-3 ${
              message.type === 'success' 
                ? 'bg-emerald-50 border border-emerald-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              {message.type === 'success' ? (
                <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              )}
              <p className={`text-sm font-medium ${
                message.type === 'success' ? 'text-emerald-800' : 'text-red-800'
              }`}>
                {message.text}
              </p>
            </div>
          )}

          {/* Fund Button */}
          <button
            onClick={handlePayment}
            disabled={isLoading || !amount || parseFloat(amount) <= 0}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <CreditCard className="w-5 h-5" />
                <span>Fund Wallet</span>
              </>
            )}
          </button>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-start space-x-3">
              <Lock className="w-5 h-5 text-slate-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-slate-700 mb-1">Secure Payment</p>
                <p className="text-xs text-slate-600">
                  Your payment is processed securely through Paystack. We don't store your card details.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-600">
            Minimum funding amount: ₦100
          </p>
        </div>
      </div>
    </div>
  );
}