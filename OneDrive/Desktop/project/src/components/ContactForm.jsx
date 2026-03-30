import { useState } from 'react';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [status, setStatus] = useState('');

  const onSubmit = (ev) => {
    ev.preventDefault();
    setStatus('Sending...');
    setTimeout(() => setStatus('Thanks, we will contact you soon.'), 1000);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-3xl bg-black/40 p-6 shadow-panel backdrop-blur border border-amber-200/10 md:p-10">
      <div className="grid gap-4 sm:grid-cols-2">
        <input required type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" className="rounded-xl border border-amber-200/20 bg-black/65 p-3 text-sm text-slate-100 focus:ring-2 focus:ring-amber-300" />
        <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" className="rounded-xl border border-amber-200/20 bg-black/65 p-3 text-sm text-slate-100 focus:ring-2 focus:ring-amber-300" />
      </div>
      <textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your project" rows="4" className="w-full rounded-xl border border-amber-200/20 bg-black/65 p-3 text-sm text-slate-100 focus:ring-2 focus:ring-amber-300"></textarea>
      <button type="submit" className="inline-flex items-center justify-center rounded-full bg-amber-300 px-8 py-3 text-sm font-semibold text-black transition hover:bg-amber-400">Send Message</button>
      {status && <p className="text-sm text-emerald-300">{status}</p>}
    </form>
  );
}
