import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import { Section } from '../layout/Section';
import { Card } from '../ui/Card';

import medicareImg from '../../assets/medicare.png';
import aiDetectorImg from '../../assets/ai_detector.png';
import parkingImg from '../../assets/parking.png';

const projectsData = [
  {
    title: "Medicare AI Hospital Management",
    description: "An intelligent healthcare system featuring AI-based scheduling, automated medicine reminders, and a dynamic hospital locator for enhanced patient care.",
    image: medicareImg,
    tags: ["React", "Node.js", "MongoDB", "AI APIs"],
    github: "#",
    live: "#"
  },
  {
    title: "AI vs Real Image Detection",
    description: "A sophisticated deep learning autoencoder model designed to analyze image artifacts and accurately distinguish between AI-generated and real authentic photographs.",
    image: aiDetectorImg,
    tags: ["Python", "TensorFlow", "FastAPI", "React"],
    github: "#",
    live: "#"
  },
  {
    title: "Smart Vehicle Parking System",
    description: "An IoT-based parking management solution featuring real-time space detection, automated tracking, and a streamlined booking interface for drivers.",
    image: parkingImg,
    tags: ["IoT", "Express", "React", "PostgreSQL"],
    github: "#",
    live: "#"
  }
];

export const Projects = () => {
  return (
    <Section id="projects" title="Featured Projects" subtitle="Showcasing my best work in Full Stack Development.">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectsData.map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <Card className="h-full flex flex-col group">
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <div className="absolute inset-0 bg-indigo-500/20 mix-blend-overlay z-10"></div>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-6 flex-1 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-xs font-medium text-indigo-300 bg-indigo-500/10 px-2.5 py-1 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                  <a href={project.github} className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium">
                    <FaGithub size={16} /> Code
                  </a>
                  <a href={project.live} className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2 text-sm font-medium">
                    <ExternalLink size={16} /> Live Demo
                  </a>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};
