import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Code2, Brain } from 'lucide-react';
import { Section } from '../layout/Section';
import { Card } from '../ui/Card';
import TiltedCard from '../ui/TiltedCard';
import profileImg from '../../assets/profile.jpeg';

export const About = () => {
  const highlights = [
    {
      icon: <GraduationCap className="text-indigo-400" size={32} />,
      title: "Academic Excellence",
      desc: "MCA student with a solid CGPA of 8.7, demonstrating consistent academic performance and dedication."
    },
    {
      icon: <Code2 className="text-cyan-400" size={32} />,
      title: "Full Stack Mastery",
      desc: "Strong proficiency in the MERN stack, REST APIs, and building highly scalable backend architectures."
    },
    {
      icon: <Brain className="text-purple-400" size={32} />,
      title: "AI Integration",
      desc: "Deeply passionate about incorporating artificial intelligence to solve real-world complexities."
    }
  ];

  return (
    <Section id="about" title="About Me" subtitle="A glimpse into my background and what drives me.">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative group flex justify-center w-full">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <TiltedCard
              imageSrc={profileImg}
              altText="Yashwanth Profile"
              captionText="Passion for Coding"
              containerHeight="580px"
              containerWidth="400px"
              imageHeight="100%"
              imageWidth="100%"
              imagePosition="center 10%"
              rotateAmplitude={12}
              scaleOnHover={1.05}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={true}
              overlayContent={
                <p className="bg-black/50 text-white px-4 py-2 rounded-lg font-medium shadow-xl translate-y-4 translate-x-4">
                  Full Stack Developer
                </p>
              }
            />
          </div>
        </motion.div>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              I am a driven MCA student and Full Stack Developer passionate about crafting modern, robust web applications. With a strong foundation in both frontend beautifully responsive interfaces and backend scalable services.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              My technical journey is fueled by a desire to integrate intelligent solutions—leveraging AI and deep learning—to solve meaningful problems.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-1 gap-4">
            {highlights.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <Card className="p-6 flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-white/5 inline-flex">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};
