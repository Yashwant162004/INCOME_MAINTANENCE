import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export const Section = ({ id, className, children, title, subtitle }) => {
  return (
    <section id={id} className={cn("py-20 md:py-32 relative", className)}>
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-16 md:mb-24 text-center"
          >
            {title && (
              <h2 className="text-3xl md:text-5xl font-bold mb-4 font-inter">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                  {title}
                </span>
              </h2>
            )}
            {subtitle && <p className="text-gray-400 text-lg max-w-2xl mx-auto">{subtitle}</p>}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
};
