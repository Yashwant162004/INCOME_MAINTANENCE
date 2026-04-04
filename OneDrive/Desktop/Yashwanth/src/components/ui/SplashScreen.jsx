import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GlitchText = ({ children, className }) => {
  return (
    <div className={`relative ${className}`}>
      <span className="relative z-10">{children}</span>
      <motion.span
        animate={{ x: [0, -4, 4, -2, 0], opacity: [0, 0.7, 0] }}
        transition={{ repeat: Infinity, duration: 0.1 }}
        className="absolute inset-0 text-red-500 z-0 mix-blend-screen"
      >
        {children}
      </motion.span>
      <motion.span
        animate={{ x: [0, 4, -4, 2, 0], opacity: [0, 0.7, 0] }}
        transition={{ repeat: Infinity, duration: 0.1, delay: 0.05 }}
        className="absolute inset-0 text-cyan-400 z-0 mix-blend-screen"
      >
        {children}
      </motion.span>
    </div>
  );
};

export const SplashScreen = ({ finishLoading }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1800),
      setTimeout(() => setPhase(2), 3400),
      setTimeout(() => setPhase(3), 5000),
      setTimeout(finishLoading, 7500)
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, [finishLoading]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        filter: "blur(20px)",
        transition: { duration: 0.5 }
      }}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black overflow-hidden select-none font-black italic"
    >
      {/* Background Grid & Scanlines */}
      <div className="absolute inset-0 z-0 opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] z-10 pointer-events-none" />

      <div className="relative w-full h-full flex flex-col items-center justify-center z-20">
        <AnimatePresence mode="popLayout">
          {phase === 0 && (
            <motion.div
              key="p0"
              initial={{ opacity: 0, scale: 0.5, letterSpacing: "1em" }}
              animate={{ opacity: 1, scale: 1, letterSpacing: "-0.05em" }}
              exit={{ opacity: 0, scale: 2, filter: "blur(10px)" }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="text-white text-4xl sm:text-6xl md:text-8xl flex flex-col items-center px-4"
            >
              <GlitchText>AUTHORIZED</GlitchText>
              <span className="text-sm sm:text-lg md:text-xl tracking-[0.5em] sm:tracking-[1em] mt-4 font-mono font-normal not-italic text-gray-500 uppercase">Accessing_Data</span>
            </motion.div>
          )}

          {phase === 1 && (
            <motion.div
              key="p1"
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 200, opacity: 0 }}
              className="flex flex-col items-center px-4 overflow-hidden"
            >
              <div className="flex gap-2 mb-2">
                {[1, 2, 3, 4, 5].map(i => (
                  <motion.div
                    key={i}
                    animate={{ height: [10, 40, 10] }}
                    transition={{ repeat: Infinity, duration: 0.2, delay: i * 0.05 }}
                    className="w-1 sm:w-2 bg-cyan-500"
                  />
                ))}
              </div>
              <div className="text-cyan-500 text-6xl sm:text-8xl md:text-[15rem] leading-none uppercase mix-blend-screen text-center">
                <GlitchText>VOID</GlitchText>
              </div>
            </motion.div>
          )}

          {phase === 2 && (
            <motion.div
              key="p2"
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              className="text-white text-4xl sm:text-6xl md:text-8xl lg:text-[10vw] uppercase leading-none tracking-tighter text-center px-4"
            >
              <GlitchText className="text-center italic">DECRYPTING<br />RESUME</GlitchText>
            </motion.div>
          )}

          {phase === 3 && (
            <motion.div
              key="p3"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                x: [0, -5, 5, -2, 2, 0],
                y: [0, 2, -2, 1, -1, 0]
              }}
              transition={{
                duration: 0.5,
                ease: "circOut"
              }}
              className="flex flex-col items-center w-full px-4"
            >
              <div className="text-white text-5xl sm:text-7xl md:text-[12vw] lg:text-[14vw] leading-none text-center font-black break-words w-full relative">
                <GlitchText className="drop-shadow-[0_0_35px_rgba(34,211,238,0.9)]">
                  <span className="text-transparent stroke-white stroke-2 block">YASHWANTH</span>
                </GlitchText>

                {/* Secondary Pulsing Glow */}
                <motion.div
                  animate={{
                    opacity: [0.1, 0.4, 0.1],
                    scale: [1, 1.02, 1],
                    skew: [0, 2, -2, 0]
                  }}
                  transition={{ repeat: Infinity, duration: 0.15 }}
                  className="absolute inset-0 text-cyan-400 blur-md pointer-events-none select-none z-[-1]"
                >
                  <span className="text-transparent stroke-cyan-400 stroke-1 block">YASHWANTH</span>
                </motion.div>

                {/* Cyber Scanline Infill */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.2 }}
                  className="absolute inset-0 bg-[repeating-linear-gradient(transparent,transparent_2px,white_2px,white_4px)] pointer-events-none mix-blend-overlay"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Terminal UI bits */}
      <div className="absolute top-10 left-10 font-mono text-[10px] text-gray-500 uppercase tracking-widest hidden md:block">
        <div>Loc: 12.9716 N, 77.5946 E</div>
        <div>System: Protov4_Final</div>
        <div className="text-cyan-500 mt-2">Status: Initializing_Host</div>
      </div>

      <div className="absolute bottom-10 right-10 font-mono text-[10px] text-gray-500 uppercase tracking-widest hidden md:block text-right">
        <div>Memory_Load: 98.4%</div>
        <div>Uptime: 0.003s</div>
        <div className="text-red-500 mt-2">Warning: Identity_Leak_Detected</div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .stroke-white {
          -webkit-text-stroke: 2px white;
        }
      `}} />
    </motion.div>
  );
};
