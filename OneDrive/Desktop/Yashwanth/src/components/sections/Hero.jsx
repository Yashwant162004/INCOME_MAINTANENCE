import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import { Button } from '../ui/Button';
import { Section } from '../layout/Section';
import { Link } from 'react-scroll';
import FloatingLines from '../ui/FloatingLines';

export const Hero = () => {
  return (
    <Section id="hero" className="min-h-screen flex items-center justify-center pt-24 overflow-hidden relative">
      <FloatingLines
        enabledWaves={["top", "middle", "bottom"]}
        lineCount={6}
        lineDistance={5}
        bendRadius={7}
        bendStrength={-0.6}
        interactive={true}
        parallax={true}
        mixBlendMode="screen"
      />
      {/* Background Anime Glowing Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl opacity-30 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600 rounded-full mix-blend-screen filter blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, -90, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-[100px]"
        />
      </div>

      <div className="text-center relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-cyan-400 font-medium tracking-wider mb-4 uppercase">Portfolio</h2>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight text-white"
        >
          Yashwanth <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">A M</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-300 mb-4 font-light"
        >
          Full Stack Developer Intern | React Native | MERN Stack
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto"
        >
          "Building scalable web and mobile applications"
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link to="projects" smooth={true} duration={500} offset={-80}>
            <Button variant="primary" className="w-full sm:w-auto">
              View Projects <ArrowRight size={18} />
            </Button>
          </Link>
          <Link to="contact" smooth={true} duration={500} offset={-80}>
            <Button variant="outline" className="w-full sm:w-auto">
              Contact Me <Mail size={18} />
            </Button>
          </Link>
        </motion.div>
      </div>
    </Section>
  );
};
