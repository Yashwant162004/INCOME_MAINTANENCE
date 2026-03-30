import { FaInstagram, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-amber-300/15 bg-[#06060a] p-8 text-slate-300">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-3">
        <div>
          <img src="/src/assests/WhatsApp_Image_2026-03-30_at_12.00.34-removebg-preview.png" alt="MLR Construction" className="mb-4 h-12 w-auto invert brightness-110 drop-shadow-sm" />
          <p className="max-w-sm text-sm text-slate-300/90">Building relationships through professionalism & honesty. Premium construction and luxury home building for visionaries. Design. Build. Beautify.</p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-amber-200">Quick links</h4>
          <ul className="space-y-2 text-sm text-slate-300/90">
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-amber-200">Contact</h4>
          <ul className="space-y-2 text-sm text-slate-300/90">
            <li className="flex items-center gap-2"><FaMapMarkerAlt /> 2nd Cross Rd, Ashok Nagar, Mandya, Karnataka 571401</li>
            <li className="flex items-center gap-2"><FaPhoneAlt /> +91 9141566888</li>
            <li className="flex items-center gap-2">📧 <a href="mailto:mlrconstructios@gmail.com" className="hover:text-amber-200">mlrconstructios@gmail.com</a></li>
            <li className="flex items-center gap-2"><FaInstagram /> <a href="https://instagram.com" target="_blank" rel="noreferrer">@mlrconstruction</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-8 border-t border-amber-300/10 pt-5 text-center text-xs text-slate-400">© {new Date().getFullYear()} OPUS Build. All rights reserved.</div>
    </footer>
  );
}
