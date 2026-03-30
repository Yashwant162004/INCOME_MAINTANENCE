import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoClose } from 'react-icons/io5';

const links = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/contact', label: 'Contact' }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`z-50 fixed top-0 inset-x-0 transition-all duration-300 ${sticky ? 'backdrop-blur-lg bg-black/45 border-b border-gold/15 shadow-lg' : 'bg-black/25'}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <NavLink className="flex items-center gap-2" to="/">
          <img src="/src/assests/WhatsApp_Image_2026-03-30_at_12.00.34-removebg-preview.png" alt="MLR Construction" className="h-10 w-auto invert brightness-110 drop-shadow-sm" />
        </NavLink>
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) => `transition-colors duration-200 ${isActive ? 'text-amber-200' : 'text-slate-300 hover:text-amber-200'}`}>
              {link.label}
            </NavLink>
          ))}
          <NavLink onClick={() => setOpen(false)} className="rounded-full border border-amber-300 px-4 py-2 text-sm font-semibold text-amber-100 hover:bg-amber-300/20" to="/contact">
            Book Consultation
          </NavLink>
        </div>
        <button className="md:hidden text-amber-200" onClick={() => setOpen((v) => !v)}>
          {open ? <IoClose size={26} /> : <GiHamburgerMenu size={26} />}
        </button>
      </nav>
      {open && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="border-t border-amber-300/15 bg-black/80 px-5 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} onClick={() => setOpen(false)} className="text-amber-100 hover:text-amber-200">
                {link.label}
              </NavLink>
            ))}
            <NavLink onClick={() => setOpen(false)} className="rounded-full border border-amber-300 px-4 py-2 text-sm font-semibold text-amber-100 hover:bg-amber-300/20" to="/contact">
              Book Consultation
            </NavLink>
          </div>
        </motion.div>
      )}
    </header>
  );
}
