import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Save, Camera } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Card from '../components/Card';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    avatar: user?.avatar || ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });
    try {
      await updateProfile(formData);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header>
        <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Account Profile</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Manage your personal information and preferences.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <Card title="Personal Details" delay={0.1}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
            {message.text && (
              <div style={{ 
                padding: '0.75rem', 
                borderRadius: '8px', 
                background: message.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', 
                color: message.type === 'success' ? 'var(--success)' : 'var(--error)',
                fontSize: '0.875rem' 
              }}>
                {message.text}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', paddingLeft: '40px' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  style={{ width: '100%', paddingLeft: '40px', opacity: 0.7, cursor: 'not-allowed' }}
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary" style={{ marginTop: '1rem' }}>
              {loading ? 'Saving...' : <><Save size={20} /> Save Changes</>}
            </button>
          </form>
        </Card>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Card title="Profile Picture" style={{ textAlign: 'center' }} delay={0.2}>
            <div style={{ position: 'relative', width: '120px', height: '120px', margin: '1rem auto' }}>
              <div style={{ 
                width: '100%', 
                height: '100%', 
                borderRadius: '50%', 
                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem',
                fontWeight: 800,
                color: 'white',
                border: '4px solid var(--card-border)'
              }}>
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <button style={{ 
                position: 'absolute', 
                bottom: '0', 
                right: '0', 
                padding: '8px', 
                borderRadius: '50%', 
                background: 'var(--primary)', 
                color: 'white', 
                border: 'none',
                cursor: 'pointer'
              }}>
                <Camera size={16} />
              </button>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>JPG or PNG. Max size of 800K</p>
          </Card>

          <Card title="Account Usage" delay={0.3}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Account Created</span>
                <span>{new Date(user?.createdAt || Date.now()).toLocaleDateString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Status</span>
                <span style={{ color: 'var(--success)' }}>Active</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
