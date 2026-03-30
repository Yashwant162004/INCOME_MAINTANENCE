import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-amber-200">404</h1>
      <p className="mt-4 text-xl text-slate-300">Page not found.</p>
      <Link to="/" className="mt-6 rounded-full border border-amber-300 px-6 py-2 text-amber-100 hover:bg-amber-300/20">Back to home</Link>
    </div>
  );
}
