import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function ProjectCard({ project }) {
  return (
    <motion.article whileHover={{ scale: 1.02 }} className="relative overflow-hidden rounded-3xl border border-amber-200/15 bg-[#09101a] shadow-panel">
      <img loading="lazy" src={project.hero} alt={project.title} className="h-64 w-full object-cover transition duration-300" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 space-y-2 p-5 text-slate-100">
        <p className="text-xs uppercase tracking-wider text-amber-200/90">{project.location} • {project.type}</p>
        <h3 className="text-xl font-semibold leading-tight">{project.title}</h3>
        <p className="text-sm text-slate-300 line-clamp-2">{project.summary}</p>
        <Link to={`/projects/${project.id}`} className="inline-flex items-center justify-center rounded-full border border-amber-300/80 bg-amber-300/10 px-4 py-2 text-sm font-medium text-amber-100 transition hover:bg-amber-300/25">
          View Details
        </Link>
      </div>
    </motion.article>
  );
}
