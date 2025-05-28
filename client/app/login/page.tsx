'use client';

import { useMutation } from '@apollo/client';
import { LOGIN } from '../../graphql/mutations';
import { useState } from 'react';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [login, { loading, error }] = useMutation(LOGIN, {
    onCompleted: ({ login }) => {
      localStorage.setItem('token', login.token);
      window.location.href = '/dashboard';
    },
  });

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Login</h2>
      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full mb-2"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full mb-4"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2"
        onClick={() => login({ variables: form })}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {error && <p className="text-red-600 mt-2">{error.message}</p>}
    </div>
  );
}
