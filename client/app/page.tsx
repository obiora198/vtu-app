'use client';

import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-indigo-600 text-white">
        <div className="text-2xl font-bold">VTU-App</div>
        <ul className="hidden md:flex space-x-6">
          <li><a href="#features" className="hover:underline">Features</a></li>
          <li><a href="#pricing" className="hover:underline">Pricing</a></li>
          <li>
            <Link href="/login" className="hover:underline">
              Login
            </Link>
          </li>
          <li>
            <Link href="/signup" className="bg-white text-indigo-600 px-4 py-1 rounded font-semibold hover:bg-gray-100">
              Sign Up
            </Link>
          </li>
        </ul>
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          {/* For simplicity, mobile menu not implemented here */}
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col justify-center items-center text-center px-6 pb-4 md:px-0 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 max-w-3xl">
          Power Your Airtime & Data Purchases Instantly
        </h1>
        <p className="text-lg md:text-2xl max-w-xl mb-8">
          Seamless, secure, and fast VTU recharge platform built just for you.
        </p>
        <div className="space-x-4">
          <Link href="/login" className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded hover:bg-gray-100">
            Login
          </Link>
          <Link href="/signup" className="px-6 py-3 border-2 border-white rounded hover:bg-white hover:text-indigo-600 transition">
            Sign Up
          </Link>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="py-16 px-6 md:px-20 bg-white text-gray-800">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="text-center p-6 border rounded shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">Instant Recharge</h3>
            <p>Recharge your airtime and data instantly with real-time confirmation.</p>
          </div>
          <div className="text-center p-6 border rounded shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">Secure Payments</h3>
            <p>Safe and secure wallet funding with transparent transaction history.</p>
          </div>
          <div className="text-center p-6 border rounded shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">User Dashboard</h3>
            <p>Track your wallet balance, transactions, and recharge history all in one place.</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-6 md:px-20 bg-gray-100 text-gray-900">
        <h2 className="text-3xl font-bold text-center mb-12">Pricing</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded shadow text-center">
            <h3 className="text-xl font-semibold mb-3">Basic</h3>
            <p className="text-4xl font-bold mb-4">Free</p>
            <ul className="mb-6 space-y-2">
              <li>✓ Limited daily recharge</li>
              <li>✓ Wallet funding</li>
              <li>✓ Basic transaction reports</li>
            </ul>
            <button className="bg-indigo-600 text-white px-6 py-2 rounded font-semibold hover:bg-indigo-700">
              Get Started
            </button>
          </div>
          <div className="p-6 bg-indigo-600 text-white rounded shadow text-center">
            <h3 className="text-xl font-semibold mb-3">Pro</h3>
            <p className="text-4xl font-bold mb-4">₦500/month</p>
            <ul className="mb-6 space-y-2">
              <li>✓ Unlimited recharge</li>
              <li>✓ Priority support</li>
              <li>✓ Advanced analytics</li>
            </ul>
            <button className="bg-white text-indigo-600 px-6 py-2 rounded font-semibold hover:bg-gray-100">
              Upgrade Now
            </button>
          </div>
          <div className="p-6 bg-white rounded shadow text-center">
            <h3 className="text-xl font-semibold mb-3">Enterprise</h3>
            <p className="text-4xl font-bold mb-4">Contact Us</p>
            <ul className="mb-6 space-y-2">
              <li>✓ Custom solutions</li>
              <li>✓ Dedicated support</li>
              <li>✓ SLA & uptime guarantees</li>
            </ul>
            <button className="bg-indigo-600 text-white px-6 py-2 rounded font-semibold hover:bg-indigo-700">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-600 text-white text-center py-6 mt-auto">
        <p>© {new Date().getFullYear()} VTU-App. All rights reserved.</p>
      </footer>
    </div>
  );
}
