import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';
import { Section } from '../layout/Section';

const expData = [
  {
    role: "Full Stack Developer Intern",
    company: "Gupio",
    period: "Feb 2026 - Present",
    description: "Developing cross-platform mobile applications using React Native. Designing and implementing responsive UI components for Android devices. Building scalable web applications using the MERN stack."
  },
  {
    role: "Web Application Developer Intern",
    company: "LetsPro",
    period: "2023",
    description: "Built responsive and performant web applications using modern web technologies including React, JavaScript, HTML, and CSS. Integrated complex REST APIs to fetch and manage dynamic data, significantly improving overall application performance and user experience."
  },
  {
    role: "Sales Executive",
    company: "Sangeetha Mobiles",
    period: "Previous",
    description: "Developed strong communication and problem-solving skills in a fast-paced retail environment. Consistently met targets while ensuring high customer satisfaction through active listening and tailored technical recommendations."
  }
];

export const Experience = () => {
  return (
    <Section id="experience" title="Work Experience" subtitle="My professional journey and roles I've taken on.">
      <div className="max-w-3xl mx-auto">
        <div className="relative border-l border-white/10 ml-3 md:ml-6 space-y-12">
          {expData.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="relative pl-8 md:pl-12"
            >
              <div className="absolute -left-3 top-1 w-6 h-6 rounded-full bg-[#0B0F19] border-2 border-indigo-500 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-cyan-400 glow"></div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/10 transition-colors duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    {exp.role}
                  </h3>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full w-fit">
                    <Calendar size={14} /> {exp.period}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-indigo-300 mb-4 font-medium">
                  <Briefcase size={16} /> {exp.company}
                </div>
                <p className="text-gray-400 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};
