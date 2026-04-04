import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Award } from 'lucide-react';
import { Section } from '../layout/Section';
import { Card } from '../ui/Card';

const educationData = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "ATME College of Engineering",
    score: "CGPA: 8.7",
    icon: <BookOpen className="text-indigo-400" size={24} />
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "PES College",
    score: "CGPA: 8.9",
    icon: <BookOpen className="text-cyan-400" size={24} />
  }
];

const certData = [
  "Microsoft Data Analysis 101",
  "Google Cloud Generative AI",
  "Python + Django + Data Analytics Courses"
];

export const Education = () => {
  return (
    <Section id="education" title="Education & Certifications" subtitle="My academic background and professional qualifications.">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Education Route */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <BookOpen className="text-indigo-400" /> Academic Journey
          </h3>
          <div className="space-y-6">
            {educationData.map((edu, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card className="p-6 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    {edu.icon}
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2 pr-12">{edu.degree}</h4>
                  <p className="text-gray-400 mb-4">{edu.institution}</p>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-cyan-400">
                    {edu.score}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications Route */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <Award className="text-cyan-400" /> Certifications
          </h3>
          <div className="grid gap-4">
            {certData.map((cert, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <Card hover={false} className="p-5 flex items-center gap-4 bg-gradient-to-r from-white/5 to-transparent border-l-4 border-l-cyan-400 group hover:border-l-indigo-400 transition-colors">
                  <div className="p-2 rounded-full bg-white/5 group-hover:bg-indigo-500/20 transition-colors">
                    <Award className="text-gray-400 group-hover:text-indigo-400 transition-colors" size={20} />
                  </div>
                  <span className="text-gray-200 font-medium">{cert}</span>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};
