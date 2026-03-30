import { motion } from 'framer-motion';

export default function ConsultationModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-md">
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-xl rounded-3xl border border-amber-200/20 bg-[#0f1015] p-6 shadow-xl">
        <header className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-amber-200">Book a Consultation</h2>
          <button onClick={onClose} className="text-slate-100 hover:text-amber-200">Close</button>
        </header>
        <p className="mt-3 text-slate-300">Share your project vision and we&apos;ll deliver a full plan with timeline and premium estimate.</p>
        <form className="mt-5 grid gap-4">
          <input type="text" placeholder="Name" className="rounded-xl border border-amber-200/20 bg-black/70 px-4 py-3 text-sm text-white" />
          <input type="tel" placeholder="Phone" className="rounded-xl border border-amber-200/20 bg-black/70 px-4 py-3 text-sm text-white" />
          <textarea rows="3" placeholder="Project details" className="rounded-xl border border-amber-200/20 bg-black/70 px-4 py-3 text-sm text-white" />
          <button type="submit" className="rounded-full bg-amber-300 px-6 py-3 font-semibold text-black hover:bg-amber-400">Submit</button>
        </form>
      </motion.div>
    </div>
  );
}
