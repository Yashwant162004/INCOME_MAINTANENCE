import { motion } from 'framer-motion';

const services = [
  { title: 'Home Construction', description: 'Bespoke residential builds with structural expertise and premium finishes.' },
  { title: 'Interior Design', description: 'Custom curated interior programs with design, procurement, and staging.' },
  { title: 'Renovation', description: 'Full-scale refurbishments including kitchens, bathrooms, and legacy properties.' },
  { title: 'Architecture Planning', description: 'Concept to permit-ready design with advanced 3D visualization and value engineering.' }
];

export default function Services() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
      <header className="mb-10">
        <h1 className="text-4xl font-display font-bold text-amber-200">Our Services</h1>
        <p className="mt-3 text-slate-300">A full suite of luxury construction and design solutions tailored to your most ambitious projects.</p>
      </header>
      <div className="grid gap-6 sm:grid-cols-2">
        {services.map((item) => (
          <motion.article key={item.title} whileHover={{ y: -4 }} className="rounded-3xl border border-amber-200/15 bg-black/45 p-6 shadow-panel backdrop-blur">
            <h3 className="text-2xl font-semibold text-amber-200">{item.title}</h3>
            <p className="mt-3 text-slate-300">{item.description}</p>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
