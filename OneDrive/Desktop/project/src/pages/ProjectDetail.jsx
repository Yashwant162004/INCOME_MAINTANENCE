import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import projects from '../data/projects';
import BeforeAfterSlider from '../components/BeforeAfterSlider';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((item) => item.id === id);
  const [selected, setSelected] = useState(project?.gallery?.[0]);

  if (!project) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-24 text-center">
        <h1 className="text-3xl font-bold text-amber-200">Project not found</h1>
        <Link to="/projects" className="mt-4 inline-block rounded-full border border-amber-300 px-4 py-2 text-amber-200">Back to projects</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <header className="mb-10 text-amber-200">
        <p className="text-sm uppercase tracking-widest text-amber-300">{project.location}</p>
        <h1 className="mt-2 text-4xl font-display font-bold">{project.title}</h1>
        <p className="mt-3 max-w-3xl text-slate-300">{project.summary}</p>
      </header>

      <motion.div className="mb-10 grid gap-4 lg:grid-cols-8">
        <img src={selected} alt="gallery" className="lg:col-span-6 h-96 w-full rounded-3xl object-cover" />
        <div className="lg:col-span-2 flex flex-col gap-3">
          {project.gallery.map((img) => (
            <button key={img} onClick={() => setSelected(img)} className={`overflow-hidden rounded-2xl border ${selected === img ? 'border-amber-300' : 'border-slate-600'} transition`}>
              <img src={img} alt="thumb" className="h-20 w-full object-cover" />
            </button>
          ))}
        </div>
      </motion.div>

      <section className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-3xl border border-amber-100/20 bg-black/45 p-6 shadow-panel backdrop-blur">
          <h2 className="text-2xl font-semibold text-amber-200">Project Timeline</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            {project.timeline.map((step, index) => <li key={index}>• {step}</li>)}
          </ul>
        </div>

        <div className="rounded-3xl border border-amber-100/20 bg-black/45 p-6 shadow-panel backdrop-blur">
          <h2 className="text-2xl font-semibold text-amber-200">Materials & Budget</h2>
          <p className="mt-2 text-slate-300">{project.cost} budget range</p>
          <ul className="mt-4 grid gap-2 text-sm text-slate-300">
            {project.materials.map((material) => <li key={material}>• {material}</li>)}
          </ul>
          <p className="mt-5 text-sm italic text-amber-100">"{project.testimonial}"</p>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-3xl font-semibold text-amber-200">Before vs After</h2>
        <BeforeAfterSlider before={project.gallery[0]} after={project.gallery[1] ?? project.gallery[0]} />
      </section>
    </div>
  );
}
