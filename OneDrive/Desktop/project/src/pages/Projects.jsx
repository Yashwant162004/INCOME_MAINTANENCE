import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import projects from '../data/projects';

const types = ['all', 'villa', 'apartment', 'commercial'];

export default function Projects() {
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(() => {
    if (filter === 'all') return projects;
    return projects.filter((item) => item.type === filter);
  }, [filter]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <section className="mb-10">
        <h1 className="text-4xl font-display font-bold text-amber-200">Projects Showcase</h1>
        <p className="mt-3 max-w-2xl text-slate-300">Discover our high-end builds, delivered with precision, innovation, and permanence.</p>
      </section>
      <div className="mb-8 flex flex-wrap gap-3">
        {types.map((type) => (
          <button key={type} onClick={() => setFilter(type)} className={`rounded-full border px-4 py-2 text-sm font-semibold ${filter === type ? 'border-amber-300 bg-amber-300/20 text-amber-100' : 'border-slate-600 text-slate-200 hover:border-amber-300 hover:text-amber-100'}`}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </motion.div>
      {filtered.length === 0 && <p className="mt-4 text-slate-400">No projects found.</p>}
    </div>
  );
}
