import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '../layout/Section';
import { Card } from '../ui/Card';
import LogoLoop from '../ui/LogoLoop';
import { 
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, 
  SiNodedotjs, SiExpress, SiMongodb, SiPostgresql, 
  SiFigma, SiGithub, SiDocker, SiVite 
} from 'react-icons/si';

const skillsData = [
  {
    category: "Frontend & Mobile",
    skills: ["ReactJS", "React Native", "Tailwind CSS", "HTML5", "CSS3", "JavaScript", "TypeScript"],
    color: "from-blue-400 to-cyan-400"
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express", "FastAPI", ".NET"],
    color: "from-green-400 to-emerald-400"
  },
  {
    category: "Database",
    skills: ["MongoDB", "PostgreSQL", "SQL"],
    color: "from-purple-400 to-indigo-400"
  },
  {
    category: "Tools & Others",
    skills: ["Git", "GitHub", "REST APIs", "Android Development", "Authoring Tool", "AI Integrations"],
    color: "from-orange-400 to-rose-400"
  }
];

const techLogos = [
  { node: <SiReact />, title: "React" },
  { node: <SiNextdotjs />, title: "Next.js" },
  { node: <SiTypescript />, title: "TypeScript" },
  { node: <SiTailwindcss />, title: "Tailwind CSS" },
  { node: <SiNodedotjs />, title: "Node.js" },
  { node: <SiExpress />, title: "Express" },
  { node: <SiMongodb />, title: "MongoDB" },
  { node: <SiPostgresql />, title: "PostgreSQL" },
  { node: <SiVite />, title: "Vite" },
  { node: <SiGithub />, title: "GitHub" },
  { node: <SiDocker />, title: "Docker" },
  { node: <SiFigma />, title: "Figma" },
];

export const Skills = () => {
  return (
    <Section id="skills" title="Technical Skills" subtitle="Technologies I work with to bring ideas to life.">
      <Card className="p-1 md:p-8 overflow-hidden relative border-white/5 bg-white/[0.02]">
        <div className="grid md:grid-cols-2 gap-6 p-4 md:p-0">
          {skillsData.map((group, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-colors group"
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${group.color} shadow-[0_0_10px_rgba(34,211,238,0.5)]`}></span>
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-medium text-gray-400 group-hover:text-gray-200 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 relative bg-gradient-to-b from-transparent to-white/[0.01]">
          <LogoLoop 
            logos={techLogos} 
            speed={25} 
            gap={100}
            logoHeight={45}
            className="opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-1000"
          />
        </div>
      </Card>
    </Section>
  );
};
