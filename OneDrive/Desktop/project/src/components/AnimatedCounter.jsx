import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function AnimatedCounter({ label, value, suffix = '+' }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const increment = Math.ceil(value / (duration / 25));
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        clearInterval(timer);
        start = value;
      }
      setCount(start);
    }, 25);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport="{ once: true }" className="rounded-2xl bg-black/50 p-6 text-center shadow-panel backdrop-blur">
      <p className="text-4xl font-bold text-amber-200">{count}{suffix}</p>
      <p className="mt-2 text-sm uppercase tracking-wider text-slate-300">{label}</p>
    </motion.div>
  );
}
