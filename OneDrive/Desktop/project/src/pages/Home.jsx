import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import AnimatedCounter from '../components/AnimatedCounter';
import ProjectCard from '../components/ProjectCard';
import TestimonialCarousel from '../components/TestimonialCarousel';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import ConsultationModal from '../components/ConsultationModal';
import projects from '../data/projects';

const heroVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

export default function Home() {
  const [isConsultationOpen, setConsultationOpen] = useState(false);

  return (
    <div className="relative overflow-hidden">
      <section className="relative min-h-screen" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1513595321367-00dd7fba4ae4?auto=format&fit=crop&w=1680&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-5 py-24 sm:px-6 lg:px-8">
          <motion.h1 variants={heroVariants} initial="hidden" animate="show" className="text-center text-4xl font-display font-bold leading-tight text-amber-200 sm:text-6xl">
            MLR Construction: Building Relationships through Professionalism & Honesty
          </motion.h1>
          <motion.p variants={heroVariants} initial="hidden" animate="show" className="mx-auto mt-6 max-w-3xl text-center text-xl text-slate-200 sm:text-2xl">
            Our Client’s satisfaction is the essence of our success. Delivering every project on time, within budget and with the highest level of quality.
          </motion.p>
          <motion.div variants={heroVariants} initial="hidden" animate="show" className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/projects" className="rounded-full bg-amber-300 px-8 py-3 font-semibold text-black transition hover:scale-105 hover:bg-amber-400">View Projects</Link>
            <Link to="/contact" className="rounded-full border border-amber-300 px-8 py-3 font-semibold text-amber-200 transition hover:bg-amber-300/20">Contact Us</Link>
            <button onClick={() => setConsultationOpen(true)} className="rounded-full border border-amber-300 px-8 py-3 font-semibold text-amber-200 hover:bg-amber-300/20">Book Consultation</button>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-10 px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          <AnimatedCounter label="Projects Completed" value={124} />
          <AnimatedCounter label="Years of Experience" value={22} suffix="+" />
          <AnimatedCounter label="Awards & Certifications" value={18} />
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-amber-200">Featured Projects</h2>
          <p className="text-slate-300">A curated selection blending craftsmanship, scale, and luxury finishes.</p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((item) => <ProjectCard key={item.id} project={item} />)}
          </div>
          <Link to="/projects" className="inline-block rounded-full border border-amber-200 px-6 py-2 text-sm font-medium text-amber-100 hover:bg-amber-300/20">View All Projects</Link>
        </div>

        <div>
          <h2 className="text-3xl font-semibold text-amber-200">Before & After</h2>
          <BeforeAfterSlider before="https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1400&q=80" after="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1400&q=80" />
        </div>

        <div>
          <h2 className="text-3xl font-semibold text-amber-200">Client Testimonials</h2>
          <TestimonialCarousel />
        </div>
      </section>
      <ConsultationModal open={isConsultationOpen} onClose={() => setConsultationOpen(false)} />
    </div>
  );
}
