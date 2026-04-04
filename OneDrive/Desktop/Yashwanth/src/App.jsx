import React from 'react';
import { ScrollProgress } from './components/layout/ScrollProgress';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Experience } from './components/sections/Experience';
import { Education } from './components/sections/Education';
import { Contact } from './components/sections/Contact';
import Dock from './components/ui/Dock';
import { scroller } from 'react-scroll';
import { Home, User, Cpu, Folder, Calendar, GraduationCap, Mail } from 'lucide-react';
import { SplashScreen } from './components/ui/SplashScreen';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  
  const dockItems = [
    { icon: <Home size={18} />, label: 'Home', onClick: () => scroller.scrollTo('hero', { smooth: true, duration: 500 }) },
    { icon: <User size={18} />, label: 'About', onClick: () => scroller.scrollTo('about', { smooth: true, duration: 500, offset: -80 }) },
    { icon: <Cpu size={18} />, label: 'Skills', onClick: () => scroller.scrollTo('skills', { smooth: true, duration: 500, offset: -80 }) },
    { icon: <Folder size={18} />, label: 'Projects', onClick: () => scroller.scrollTo('projects', { smooth: true, duration: 500, offset: -80 }) },
    { icon: <Calendar size={18} />, label: 'Experience', onClick: () => scroller.scrollTo('experience', { smooth: true, duration: 500, offset: -80 }) },
    { icon: <GraduationCap size={18} />, label: 'Education', onClick: () => scroller.scrollTo('education', { smooth: true, duration: 500, offset: -80 }) },
    { icon: <Mail size={18} />, label: 'Contact', onClick: () => scroller.scrollTo('contact', { smooth: true, duration: 500, offset: -80 }) },
  ];

  return (
    <div className="relative overflow-x-hidden selection:bg-indigo-500/30">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <SplashScreen key="splash" finishLoading={() => setIsLoading(false)} />
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <ScrollProgress />
            <Dock items={dockItems} />
            
            <main className="pb-24">
              <Hero title="Yashwanth A M" />
              <About />
              <Skills />
              <Projects />
              <Experience />
              <Education />
              <Contact />
            </main>

            <footer className="border-t border-white/10 py-8 text-center text-gray-500 mb-20">
              <p>© {new Date().getFullYear()} Yashwanth A M. Built with React & Tailwind.</p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
