import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, ReceiptText, PieChart, Settings, LogOut, Menu, X, Sun, Moon, Plus, User, ChevronLeft, ChevronRight, Shield, Bell } from 'lucide-react';
import { useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(true);
  const { theme, toggleTheme } = useExpenses();
  const { user, logout } = useAuth();

  const mainItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'transactions', icon: ReceiptText, label: 'Transactions' },
    { id: 'analytics', icon: PieChart, label: 'Analytics' },
  ];

  const settingItems = [
    { id: 'profile', icon: User, label: 'My Profile' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  const NavItem = ({ item }) => {
    const isActive = activeTab === item.id;
    return (
      <motion.button
        whileHover={{ x: isActive ? 0 : 5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setActiveTab(item.id)}
        className={`btn \${isActive ? 'btn-primary glow-primary' : 'btn-ghost'}`}
        style={{
          justifyContent: isOpen ? 'flex-start' : 'center',
          width: '100%',
          padding: '14px',
          borderRadius: '16px',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <item.icon size={22} style={{
          color: isActive ? 'white' : 'var(--text-secondary)',
          minWidth: '22px'
        }} />
        <AnimatePresence>
          {isOpen && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              style={{ fontWeight: isActive ? 700 : 500, marginLeft: '12px' }}
            >
              {item.label}
            </motion.span>
          )}
        </AnimatePresence>
        {isActive && (
          <motion.div
            layoutId="activeGlow"
            style={{
              position: 'absolute',
              left: 0,
              top: '20%',
              bottom: '20%',
              width: '4px',
              background: 'white',
              borderRadius: '0 4px 4px 0'
            }}
          />
        )}
      </motion.button>
    );
  };

  return (
    <>
      <button
        className="mobile-toggle btn btn-ghost"
        style={{ position: 'fixed', top: '1rem', left: '1rem', zIndex: 100, display: 'none' }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      <motion.aside
        initial={false}
        animate={{ width: isOpen ? '280px' : '90px' }}
        className="glass sidebar"
        style={{
          height: 'calc(100vh - 2rem)',
          margin: '1rem',
          display: 'flex',
          flexDirection: 'column',
          padding: '2rem 1rem',
          position: 'sticky',
          top: '1rem',
          transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {/* Logo Section */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: isOpen ? 'space-between' : 'center', marginBottom: '3rem', padding: '0 0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="pulse-primary" style={{
              width: '42px',
              height: '42px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(139, 92, 246, 0.4)'
            }}>
              <Plus color="white" size={26} strokeWidth={3} />
            </div>
            {isOpen && (
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="gradient-text"
                style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.5px' }}
              >
                SmartPay
              </motion.h2>
            )}
          </div>
          {isOpen && (
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
            >
              <ChevronLeft size={20} />
            </button>
          )}
        </div>

        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            style={{
              background: 'var(--card-border)',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 2rem auto'
            }}
          >
            <ChevronRight size={18} />
          </button>
        )}

        {/* Main Navigation */}
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{
            fontSize: '0.7rem',
            fontWeight: 800,
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            marginBottom: '8px',
            display: isOpen ? 'block' : 'none',
            paddingLeft: '12px'
          }}>Menu</span>
          {mainItems.map((item) => <NavItem key={item.id} item={item} />)}

          <span style={{
            fontSize: '0.7rem',
            fontWeight: 800,
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            marginTop: '2rem',
            marginBottom: '8px',
            display: isOpen ? 'block' : 'none',
            paddingLeft: '12px'
          }}>Account</span>
          {settingItems.map((item) => <NavItem key={item.id} item={item} />)}
        </nav>

        {/* User Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid var(--card-border)', paddingTop: '2rem' }}>
          {isOpen && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px',
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.03)',
              marginBottom: '1rem'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: 'linear-gradient(45deg, var(--primary), var(--secondary))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem',
                fontWeight: 700,
                color: 'white',
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
              }}>
                {user?.name?.charAt(0)}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.name}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Premium Member</p>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: isOpen ? 'row' : 'column', gap: '8px' }}>
            <button
              className="btn btn-ghost"
              onClick={toggleTheme}
              style={{ flex: 1, height: '48px', borderRadius: '12px', justifyContent: isOpen ? 'center' : 'center' }}
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={logout}
              className="btn btn-ghost"
              style={{ flex: 1, height: '48px', borderRadius: '12px', color: 'var(--error)', justifyContent: isOpen ? 'center' : 'center' }}
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </motion.aside>

      <style>{`
        .sidebar { overflow-x: hidden; }
        @media (max-width: 768px) {
          .mobile-toggle { display: block !important; }
          .sidebar { 
            position: fixed !important; 
            z-index: 90; 
            transform: translateX(\${isOpen ? '0' : '-120%'});
            transition: transform 0.4s ease;
          }
        }
      `}</style>
    </>
  );
};

export default Sidebar;
