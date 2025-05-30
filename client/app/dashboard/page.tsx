"use client";

import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "@apollo/client";
import { ME, TRANSACTIONS } from "../../graphql/queries";
import { FUND_WALLET } from "../../graphql/mutations";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { 
  Phone, 
  Wifi, 
  CreditCard, 
  MessageSquare, 
  Printer, 
  Users, 
  Award,
  Wallet,
  TrendingUp,
  Clock,
  ArrowUpRight
} from 'lucide-react';

type Transaction = {
  id: string;
  type: string;
  amount: number;
  createdAt: string;
};

export default function Dashboard() {
  const { data: meData } = useQuery(ME);
  const { data: txData } = useQuery(TRANSACTIONS);
  const [amount, setAmount] = useState("");
  const [token, setToken] = useState("");
  const [fundWallet] = useMutation(FUND_WALLET, {
    variables: { amount: parseFloat(amount) },
    refetchQueries: [{ query: ME }, { query: TRANSACTIONS }],
  });

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
    }
    setToken(token || "");
  }, [router]);

  const services = [
    {
      icon: <Wifi className="w-8 h-8 text-blue-600" />,
      title: "Buy Data",
      description: "Data bundles",
      href: "/buy-data"
    },
    {
      icon: <Phone className="w-8 h-8 text-green-600" />,
      title: "Buy Airtime",
      description: "Mobile credit",
      href: "/buy-airtime"
    },
    {
      icon: <CreditCard className="w-8 h-8 text-purple-600" />,
      title: "Pay Bills",
      description: "Utility payments",
      href: "/pay-bills"
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-orange-600" />,
      title: "Bulk SMS",
      description: "SMS services",
      href: "/bulk-sms"
    },
    {
      icon: <Printer className="w-8 h-8 text-red-600" />,
      title: "Print Recharge Card",
      description: "Physical cards",
      href: "/print-recharge"
    },
    {
      icon: <CreditCard className="w-8 h-8 text-blue-600" />,
      title: "Print Data Card",
      description: "Data vouchers",
      href: "/print-data-card"
    },
    {
      icon: <Award className="w-8 h-8 text-yellow-600" />,
      title: "Buy WAEC/NECO Card",
      description: "Exam cards",
      href: "/exam-cards"
    },
    {
      icon: <Users className="w-8 h-8 text-indigo-600" />,
      title: "Become a Data Vendor",
      description: "Join our network",
      href: "/become-vendor"
    }
  ];

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.05),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(20,184,166,0.05),transparent_50%)]"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Welcome back, {meData?.me?.name}!
          </h1>
          <p className="text-slate-600">Manage your VTU services from your dashboard</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Wallet Balance Card */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-slate-200/50 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <Link
                href="/fund-wallet"
                className="text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>
            <h3 className="text-sm font-medium text-slate-600 mb-1">Wallet Balance</h3>
            <p className="text-2xl font-bold text-slate-900">
              ₦{meData?.me?.walletBalance?.toFixed(2) || '0.00'}
            </p>
            <Link
              href="/fund-wallet"
              className="inline-flex items-center mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <Wallet className="w-4 h-4 mr-2" />
              Fund Wallet
            </Link>
          </div>

          {/* Total Transactions Card */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-slate-200/50 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-sm font-medium text-slate-600 mb-1">Total Transactions</h3>
            <p className="text-2xl font-bold text-slate-900">
              {txData?.transactions?.length || 0}
            </p>
            <p className="text-sm text-slate-500 mt-2">All time</p>
          </div>

          {/* Recent Activity Card */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-slate-200/50 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-sm font-medium text-slate-600 mb-1">Last Transaction</h3>
            {txData?.transactions?.[0] ? (
              <>
                <p className="text-lg font-semibold text-slate-900">
                  ₦{txData.transactions[0].amount}
                </p>
                <p className="text-sm text-slate-500 mt-1">
                  {new Date(txData.transactions[0].createdAt).toLocaleDateString()}
                </p>
              </>
            ) : (
              <p className="text-lg text-slate-500">No transactions yet</p>
            )}
          </div>
        </div>

        {/* Services Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Our Services</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {services.map((service, index) => (
              <Link
                key={index}
                href={service.href}
                className="group bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-slate-200/50 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="p-3 bg-slate-50 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1 text-sm md:text-base">
                      {service.title}
                    </h3>
                    <p className="text-xs md:text-sm text-slate-600">
                      {service.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-slate-200/50 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-900">Recent Transactions</h3>
            <Link
              href="/transactions"
              className="text-emerald-600 hover:text-emerald-700 text-sm font-medium transition-colors"
            >
              View All
            </Link>
          </div>
          
          {txData?.transactions?.length > 0 ? (
            <div className="space-y-4">
              {txData.transactions.slice(0, 5).map((tx: Transaction) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl border border-slate-100"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 capitalize">{tx.type}</p>
                      <p className="text-sm text-slate-500">
                        {new Date(tx.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-900">₦{tx.amount}</p>
                    <p className="text-xs text-slate-500">
                      {new Date(tx.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-slate-500 mb-2">No transactions yet</p>
              <p className="text-sm text-slate-400">Your transaction history will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}