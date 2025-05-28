'use client';

import { useMutation } from '@apollo/client';
import { REGISTER } from '../../graphql/mutations';
import { useState } from 'react';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [register, { loading, error }] = useMutation(REGISTER, {
    onCompleted: ({ register }) => {
      localStorage.setItem('token', register.token);
      window.location.href = '/dashboard';
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    register({ variables: form });
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          className="border p-2 w-full mb-2"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-2"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-4"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      {error && <p className="text-red-600 mt-2">{error.message}</p>}
    </div>
  );
}
