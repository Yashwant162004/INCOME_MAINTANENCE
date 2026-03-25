import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = ({ onToggle }) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(formData.email, formData.password);
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
        <h1 className="gradient-text" style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Welcome Back</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Enter your details to access your account.</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {error && (
          <div style={{ padding: '0.75rem', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--error)', fontSize: '0.875rem', textAlign: 'center' }}>
            {error}
          </div>
        )}
        
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
          {loading ? 'Logging in...' : <><LogIn size={20} /> Login</>}
        </button>
      </form>

      <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          Don't have an account?{' '}
          <button 
            onClick={onToggle}
            style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }}
          >
            Sign up
          </button>
        </p>
      </div>
    </motion.div>
  );
};

export default Login;
