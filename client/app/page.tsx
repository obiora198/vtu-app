'use client';


import { useState } from 'react';
import { Menu, X, Zap, Shield, BarChart3, CheckCircle, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-inter">
      {/* Hero Section */}
      <main className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-teal-50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(20,184,166,0.1),transparent_50%)]"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4 mr-2" />
              Lightning Fast Transactions
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
              Recharge Made
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> Simple</span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              The most reliable VTU platform for instant airtime and data top-ups. 
              Fast, secure, and built for the modern user.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/signup"
                className="group bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center"
              >
                Start Recharging Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/login"
                className="px-8 py-4 border-2 border-slate-300 hover:border-emerald-600 text-slate-700 hover:text-emerald-600 rounded-xl font-semibold transition-all duration-200"
              >
                Sign In
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-slate-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900">50K+</div>
                <div className="text-slate-600 text-sm">Happy Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900">99.9%</div>
                <div className="text-slate-600 text-sm">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900">24/7</div>
                <div className="text-slate-600 text-sm">Support</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Why Choose VTU-App?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Built with modern technology and user experience in mind
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'Instant Processing',
                desc: 'Lightning-fast transactions with real-time confirmation and instant delivery to your phone.',
                color: 'emerald'
              },
              {
                icon: Shield,
                title: 'Bank-Grade Security',
                desc: 'Your transactions are protected with advanced encryption and multi-layer security protocols.',
                color: 'teal'
              },
              {
                icon: BarChart3,
                title: 'Smart Analytics',
                desc: 'Track spending patterns, transaction history, and manage your digital wallet efficiently.',
                color: 'cyan'
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group p-8 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-emerald-200 hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-12 h-12 bg-gradient-to-br from-${feature.color}-500 to-${feature.color}-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-slate-600">
              Choose the plan that works best for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Basic */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 hover:shadow-lg transition-all duration-300">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Starter</h3>
                <div className="text-4xl font-bold text-slate-900 mb-1">Free</div>
                <p className="text-slate-600 mb-8">Perfect for getting started</p>
                
                <ul className="space-y-4 mb-8 text-left">
                  {['₦5,000 daily limit', 'Basic wallet features', 'Email support', 'Transaction history'].map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mr-3 flex-shrink-0" />
                      <span className="text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 py-3 rounded-xl font-semibold transition-colors">
                  Get Started
                </button>
              </div>
            </div>

            {/* Pro */}
            <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl p-8 text-white relative transform scale-105 shadow-xl">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-amber-400 text-amber-900 px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">Professional</h3>
                <div className="text-4xl font-bold mb-1">₦2,500</div>
                <p className="text-emerald-100 mb-8">per month</p>
                
                <ul className="space-y-4 mb-8 text-left">
                  {['Unlimited transactions', 'Priority processing', 'Phone & chat support', 'Advanced analytics', 'API access'].map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-white mr-3 flex-shrink-0" />
                      <span className="text-emerald-50">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className="w-full bg-white text-emerald-600 hover:bg-emerald-50 py-3 rounded-xl font-semibold transition-colors">
                  Upgrade Now
                </button>
              </div>
            </div>

            {/* Enterprise */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 hover:shadow-lg transition-all duration-300">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Enterprise</h3>
                <div className="text-4xl font-bold text-slate-900 mb-1">Custom</div>
                <p className="text-slate-600 mb-8">For large organizations</p>
                
                <ul className="space-y-4 mb-8 text-left">
                  {['Custom integrations', 'Dedicated account manager', 'SLA guarantees', 'White-label options', 'Volume discounts'].map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mr-3 flex-shrink-0" />
                      <span className="text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-semibold transition-colors">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">VTU-App</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-slate-400">
                © {new Date().getFullYear()} VTU-App. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}