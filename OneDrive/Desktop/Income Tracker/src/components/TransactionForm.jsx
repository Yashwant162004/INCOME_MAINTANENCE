import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, DollarSign, Calendar, Tag, Type, Hash } from 'lucide-react';
import { useExpenses } from '../context/ExpenseContext';

const TransactionForm = ({ isOpen, onClose }) => {
  const { addTransaction, categories } = useExpenses();
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    type: 'expense',
    category: 'Food',
    date: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount) return;
    
    addTransaction({
      ...formData,
      id: Date.now(),
      amount: parseFloat(formData.amount),
    });
    
    setFormData({
      title: '',
      amount: '',
      type: 'expense',
      category: 'Food',
      date: new Date().toISOString().split('T')[0],
    });
    onClose();
  };

  const categoryOptions = Object.keys(categories);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(8px)',
              zIndex: 1000,
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: '-50%', y: '-40%' }}
            animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
            exit={{ opacity: 0, scale: 0.9, x: '-50%', y: '-40%' }}
            className="glass glow-primary"
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              zIndex: 1001,
              width: '95%',
              maxWidth: '500px',
              padding: '2.5rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }} className="gradient-text">Add Transaction</h2>
              <button 
                onClick={onClose} 
                className="btn btn-ghost" 
                style={{ padding: '8px', borderRadius: '50%', minWidth: '40px', minHeight: '40px' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Type Switcher */}
              <div style={{ 
                display: 'flex', 
                gap: '8px', 
                background: 'rgba(255, 255, 255, 0.05)', 
                padding: '6px', 
                borderRadius: '16px',
                border: '1px solid var(--card-border)' 
              }}>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'expense' })}
                  style={{ 
                    flex: 1, 
                    padding: '12px',
                    borderRadius: '12px',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 700,
                    background: formData.type === 'expense' ? 'var(--error)' : 'transparent',
                    color: formData.type === 'expense' ? 'white' : 'var(--text-secondary)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Expense
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'income' })}
                  style={{ 
                    flex: 1, 
                    padding: '12px',
                    borderRadius: '12px',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 700,
                    background: formData.type === 'income' ? 'var(--success)' : 'transparent',
                    color: formData.type === 'income' ? 'white' : 'var(--text-secondary)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Income
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Description</label>
                  <div style={{ position: 'relative' }}>
                    <Type size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                    <input
                      type="text"
                      placeholder="What was this for?"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      style={{ width: '100%', paddingLeft: '44px', height: '52px' }}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Amount</label>
                  <div style={{ position: 'relative' }}>
                    <DollarSign size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      style={{ width: '100%', paddingLeft: '44px', height: '52px', fontSize: '1.25rem', fontWeight: 700 }}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Category</label>
                    <div style={{ position: 'relative' }}>
                      <Tag size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        style={{ width: '100%', paddingLeft: '44px', height: '52px', appearance: 'none' }}
                      >
                        {categoryOptions.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Date</label>
                    <div style={{ position: 'relative' }}>
                      <Calendar size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        style={{ width: '100%', paddingLeft: '44px', height: '52px' }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary pulse-primary" 
                style={{ marginTop: '1.5rem', width: '100%', height: '56px', fontSize: '1.1rem' }}
              >
                <Plus size={22} /> Add {formData.type === 'income' ? 'Income' : 'Expense'}
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TransactionForm;
