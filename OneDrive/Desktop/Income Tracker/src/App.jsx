import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import TransactionForm from './components/TransactionForm';
import { ExpenseProvider } from './context/ExpenseContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import './styles/global.css';

import Settings from './pages/Settings';

const AppContent = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        height: '100vh', 
        alignItems: 'center', 
        justifyContent: 'center', 
        color: 'var(--text-secondary)',
        background: 'var(--background)'
      }}>
        <div className="pulse-primary" style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--primary)' }} />
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ 
        display: 'flex', 
        minHeight: '100vh', 
        background: 'var(--background)',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        {authMode === 'login' ? (
          <Login onToggle={() => setAuthMode('signup')} />
        ) : (
          <Signup onToggle={() => setAuthMode('login')} />
        )}
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onAddClick={() => setIsFormOpen(true)} />;
      case 'transactions':
        return <Transactions />;
      case 'analytics':
        return <Analytics />;
      case 'profile':
        return <Profile />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard onAddClick={() => setIsFormOpen(true)} />;
    }
  };

  return (
    <ExpenseProvider>
      <div style={{ display: 'flex', minHeight: '100vh', padding: '0 1rem 0 0' }}>
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main style={{ 
          flex: 1, 
          padding: '2rem', 
          maxHeight: '100vh', 
          overflowY: 'auto'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {renderContent()}
          </div>
        </main>
        <TransactionForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
      </div>
    </ExpenseProvider>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
