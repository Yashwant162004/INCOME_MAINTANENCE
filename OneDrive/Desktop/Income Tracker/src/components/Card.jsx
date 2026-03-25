import { motion } from 'framer-motion';

const Card = ({ children, title, subtitle, icon: Icon, delay = 0, style = {} }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="glass"
      style={{
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        position: 'relative',
        overflow: 'hidden',
        ...style
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          {title && <h3 style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{title}</h3>}
          {subtitle && <p style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '0.25rem' }}>{subtitle}</p>}
        </div>
        {Icon && (
          <div style={{ 
            padding: '10px', 
            borderRadius: '12px', 
            background: 'var(--card-border)',
            color: 'var(--primary)'
          }}>
            <Icon size={20} />
          </div>
        )}
      </div>
      {children}
      
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-10%',
        width: '100px',
        height: '100px',
        background: 'var(--primary)',
        filter: 'blur(60px)',
        opacity: 0.1,
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />
    </motion.div>
  );
};

export default Card;
