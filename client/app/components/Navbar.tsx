import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-4 py-3 flex justify-between">
      <h1 className="font-bold text-lg">VTU App</h1>
      <div className="space-x-4">
        <Link href="/dashboard">Dashboard</Link>
        <button
          onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/login';
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
