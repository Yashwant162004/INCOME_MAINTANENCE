import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import { Section } from '../layout/Section';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export const Contact = () => {
  return (
    <Section id="contact" title="Get In Touch" subtitle="Have a project in mind or want to collaborate? Let's talk.">
      <div className="grid md:grid-cols-5 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="md:col-span-2 space-y-8"
        >
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
            
            <a href="mailto:yashwantham10@gmail.com" className="flex items-start gap-4 group">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300 shadow-lg">
                <Mail size={20} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-400 mb-1">Email</p>
                <p className="text-white font-medium group-hover:text-indigo-400 transition-colors">yashwantham10@gmail.com</p>
              </div>
            </a>

            <a href="tel:+916362258500" className="flex items-start gap-4 group">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-all duration-300 shadow-lg">
                <Phone size={20} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-400 mb-1">Phone</p>
                <p className="text-white font-medium group-hover:text-cyan-400 transition-colors">+91 6362258500</p>
              </div>
            </a>
            
            <div className="flex items-start gap-4">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-purple-400 shadow-lg">
                <MapPin size={20} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-400 mb-1">Location</p>
                <p className="text-white font-medium">Arakere, Karnataka, India</p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10">
            <h4 className="text-sm text-gray-400 mb-4 uppercase tracking-wider font-semibold">Social Profiles</h4>
            <div className="flex gap-4">
              <a href="https://github.com/Yashwant162004" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 transition-colors border border-white/10 hover:border-indigo-400">
                <FaGithub size={20} />
              </a>
              <a href="https://www.linkedin.com/in/yashwanth-a-m-a95b9629a/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 transition-colors border border-white/10 hover:border-cyan-400">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:col-span-3"
        >
          <Card className="p-8">
            <form 
              action="https://formspree.io/f/yashwantham10@gmail.com" 
              method="POST"
              className="space-y-6"
            >
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-300">Your Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    required
                    className="w-full bg-[#0B0F19]/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-300">Your Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    required
                    className="w-full bg-[#0B0F19]/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                    placeholder="name@company.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-gray-300">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject"
                  required
                  className="w-full bg-[#0B0F19]/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                  placeholder="What is this regarding?"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-300">Message</label>
                <textarea 
                  id="message" 
                  name="message"
                  required
                  rows={5}
                  className="w-full bg-[#0B0F19]/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none"
                  placeholder="Details about your project or inquiry..."
                ></textarea>
              </div>

              <Button type="submit" variant="primary" className="w-full sm:w-auto">
                Send Message <Send size={18} />
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>
    </Section>
  );
};
