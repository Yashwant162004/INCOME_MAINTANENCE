import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Bell, Shield, Wallet, Globe, Lock, Trash2, Cpu } from 'lucide-react';
import { useExpenses } from '../context/ExpenseContext';
import Card from '../components/Card';

const Settings = () => {
  const { budget, setBudget, theme, toggleTheme } = useExpenses();
  const [localBudget, setLocalBudget] = useState(budget);

  const handleBudgetChange = (e) => {
    const val = e.target.value;
    setLocalBudget(val);
  };

  const saveBudget = () => {
    setBudget(localBudget);
    alert('Budget updated successfully!');
  };

  const sections = [
    {
      title: 'Preferences',
      icon: <Globe size={20} />,
      items: [
        { 
          label: 'Theme', 
          desc: 'Switch between light and dark modes.',
          action: (
            <button className="btn btn-ghost" onClick={toggleTheme} style={{ padding: '8px 16px' }}>
              {theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
            </button>
          )
        },
        {
          label: 'Monthly Budget',
          desc: 'Set your spending limit for the month.',
          action: (
            <div style={{ display: 'flex', gap: '8px' }}>
              <input 
                type="number" 
                value={localBudget} 
                onChange={handleBudgetChange}
                style={{ width: '120px', height: '40px' }}
              />
              <button className="btn btn-primary" onClick={saveBudget} style={{ height: '40px' }}>Save</button>
            </div>
          )
        }
      ]
    },
    {
      title: 'Security',
      icon: <Shield size={20} />,
      items: [
        { 
          label: 'Two-Factor Authentication', 
          desc: 'Add an extra layer of security to your account.',
          action: <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Disabled</span>
        },
        { 
          label: 'Change Password', 
          desc: 'Update your login credentials.',
          action: <button className="btn btn-ghost" style={{ padding: '8px 16px' }}>Update</button>
        }
      ]
    },
    {
      title: 'Data & Privacy',
      icon: <Lock size={20} />,
      items: [
        { 
          label: 'Export Transactions', 
          desc: 'Download your financial data as CSV or JSON.',
          action: <button className="btn btn-ghost" style={{ padding: '8px 16px' }}>Export</button>
        },
        { 
          label: 'Delete All Records', 
          desc: 'Permanently remove all your transaction history.',
          action: <button className="btn btn-ghost" style={{ padding: '8px 16px', color: 'var(--error)' }}>Clear Data</button>
        }
      ]
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', paddingBottom: '4rem' }}>
      <header>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Settings</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Customize your experience and manage security.</p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {sections.map((section, idx) => (
          <Card key={section.title} delay={0.1 * idx}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
              <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', display: 'flex' }}>
                {section.icon}
              </div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>{section.title}</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {section.items.map((item, i) => (
                <div key={item.label} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  paddingBottom: i === section.items.length - 1 ? 0 : '1.5rem',
                  borderBottom: i === section.items.length - 1 ? 'none' : '1px solid var(--card-border)'
                }}>
                  <div>
                    <p style={{ fontWeight: 600 }}>{item.label}</p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{item.desc}</p>
                  </div>
                  {item.action}
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <div style={{ textAlign: 'center', opacity: 0.3, marginTop: '2rem' }}>
        <p style={{ fontSize: '0.75rem' }}>SmartPay v2.0.0-premium • Powered by Antigravity AI</p>
      </div>
    </div>
  );
};

export default Settings;
