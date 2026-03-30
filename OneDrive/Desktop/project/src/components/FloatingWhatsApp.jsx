import { FaWhatsapp } from 'react-icons/fa';

export default function FloatingWhatsApp() {
  return (
    <a href="https://wa.me/919141566888?text=Hi%20MLR%20Construction%2C%20I%27d%20like%20to%20book%20a%20consultation" target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 z-50 transform rounded-full bg-emerald-500 p-4 text-white shadow-lg transition-all hover:scale-105 hover:shadow-2xl">
      <span className="sr-only">WhatsApp chat</span>
      <FaWhatsapp size={24} />
    </a>
  );
}
