import { motion } from 'framer-motion';

export default function LoadingScreen() {
  // Add your exact local logo file at src/assets/mlr-logo.png for best performance.
  const localLogo = '/src/assests/WhatsApp_Image_2026-03-30_at_12.00.34-removebg-preview.png';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <motion.div className="flex flex-col items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <img src={localLogo} alt="MLR Constructions" className="h-24 w-auto drop-shadow-lg invert" />
        <p className="text-lg font-semibold tracking-wide text-amber-200">MLR Constructions</p>
      </motion.div>
    </div>
  );
}
