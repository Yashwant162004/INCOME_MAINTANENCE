import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Signup = ({ onToggle }) => {
  const { signup } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signup(formData.name, formData.email, formData.password);
      alert('Signup successful! Please log in with your new account.');
      onToggle();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass"
      style={{
        width: '100%',
        maxWidth: '450px',
        padding: '3rem 2.5rem',
        margin: 'auto'
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h1 className="gradient-text" style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Create Account</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Join us to start tracking your finances.</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {error && (
          <div style={{ padding: '0.75rem', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--error)', fontSize: '0.875rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Full Name</label>
          <div style={{ position: 'relative' }}>
            <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{ width: '100%', paddingLeft: '40px' }}
              required
            />
          </div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Email Address</label>
          <div style={{ position: 'relative' }}>
            <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input
              type="email"
              placeholder="name@company.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={{ width: '100%', paddingLeft: '40px' }}
              required
            />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Password</label>
          <div style={{ position: 'relative' }}>
            <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              style={{ width: '100%', paddingLeft: '40px' }}
              required
            />
          </div>
        </div>

        <button type="submit" disabled={loading} className="btn btn-primary" style={{ marginTop: '0.5rem', width: '100%', height: '50px' }}>
          {loading ? 'Creating...' : <><UserPlus size={20} /> Sign Up</>}
        </button>
      </form>

      <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          Already have an account?{' '}
          <button 
            onClick={onToggle}
            style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }}
          >
            Login
          </button>
        </p>
      </div>
    </motion.div>
  );
};

export default Signup;
