import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import testimonials from '../data/testimonials';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

function Stars({ rating }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <div className="flex items-center gap-1 text-amber-300">
      {[...Array(full)].map((_, index) => <FaStar key={index} />)}
      {half && <FaStarHalfAlt />}
    </div>
  );
}

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % testimonials.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const current = testimonials[index];

  return (
    <section aria-label="Client testimonials" className="mx-auto max-w-6xl rounded-3xl border border-amber-100/20 bg-black/45 p-6 shadow-panel backdrop-blur md:p-10">
      <motion.div key={current.name} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.5 }}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <img src={current.photo} alt={current.name} className="h-20 w-20 rounded-full border border-amber-300/30 object-cover" />
          <div>
            <h4 className="text-lg font-semibold text-amber-200">{current.name}</h4>
            <p className="text-sm text-slate-300">{current.title}</p>
            <Stars rating={current.rating} />
          </div>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-slate-200">"{current.feedback}"</p>
      </motion.div>
    </section>
  );
}
