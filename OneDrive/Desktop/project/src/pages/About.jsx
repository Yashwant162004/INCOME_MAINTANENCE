import team from '../data/team';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <motion.header initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <h1 className="text-4xl font-display font-bold text-amber-200">Our Story & Vision</h1>
        <p className="mt-3 text-slate-300">
          "Our Client's satisfaction is the essence of our success. We continually strive to provide every client with an extraordinary experience, delivering projects on time, within budget, and with the highest level of quality and professionalism. Our clients deserve nothing less!"
        </p>
      </motion.header>

      <section className="mb-14 grid gap-8 md:grid-cols-2">
        <div className="rounded-3xl border border-amber-200/20 bg-black/45 p-6 shadow-panel backdrop-blur">
          <h2 className="text-2xl font-semibold text-amber-200">Mission</h2>
          <p className="mt-3 text-slate-300">
            Our mission is to focus on the client as the most important aspect of our business. Each project is undertaken with an uncompromising commitment to excellence and 100% customer satisfaction.
          </p>
        </div>
        <div className="rounded-3xl border border-amber-200/20 bg-black/45 p-6 shadow-panel backdrop-blur">
          <h2 className="text-2xl font-semibold text-amber-200">Our Philosophy</h2>
          <p className="mt-3 text-slate-300">
            We don't just construct; we build long-lasting relationships with our customers through professionalism, honesty, and superior construction services through excellence in everything we do.
          </p>
        </div>
      </section>

      <section className="mb-14">
        <h2 className="text-3xl font-semibold text-amber-200 mb-8">Our Visionary Pillars</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { id: '01', text: 'To revolutionize the construction industry by setting new standards for project delivery, environmental stewardship, and client engagement while maintaining our reputation for excellence.' },
            { id: '02', text: 'To establish ourselves as the construction partner of choice for clients seeking innovative, sustainable, and community-focused building solutions.' },
            { id: '03', text: 'To be universally recognized as the standard-bearer for construction quality and client satisfaction in residential and commercial projects.' },
            { id: '04', text: 'To become the most trusted name in construction, recognized for consistently delivering high-quality projects while maintaining the highest standards of integrity and professionalism.' }
          ].map((pillar) => (
            <div key={pillar.id} className="group relative overflow-hidden rounded-2xl border border-amber-200/15 bg-black/50 p-6 shadow-panel backdrop-blur transition-all hover:bg-black/70">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-display font-bold text-amber-200/40 tracking-tighter group-hover:text-amber-200/60 transition-colors">{pillar.id}</span>
                <div className="h-px w-8 bg-amber-200/20" />
              </div>
              <p className="text-sm leading-relaxed text-slate-300 group-hover:text-amber-100 transition-colors">{pillar.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-14">
        <h2 className="text-3xl font-semibold text-amber-200">Our Leadership Team</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <div key={member.name} className="group relative rounded-2xl border border-amber-200/15 bg-black/50 p-6 shadow-panel backdrop-blur transition-all hover:border-amber-300/40 hover:bg-black/60">
              <div className="mb-4 h-1 w-12 bg-amber-300/60 transition-all group-hover:w-20" />
              <h3 className="text-2xl font-bold tracking-tight text-amber-200">{member.name}</h3>
              <p className="mt-1 text-lg font-medium text-amber-100/80">{member.role}</p>
              <p className="mt-4 text-sm leading-relaxed text-slate-300/90">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
