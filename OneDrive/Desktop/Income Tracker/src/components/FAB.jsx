import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const FAB = ({ onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1, boxShadow: '0 0 20px var(--primary)' }}
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      style={{
        position: 'fixed',
        bottom: '2.5rem',
        right: '2.5rem',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
        border: 'none',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: 'var(--card-shadow)',
        zIndex: 100
      }}
    >
      <Plus size={30} />
    </motion.button>
  );
};

export default FAB;
