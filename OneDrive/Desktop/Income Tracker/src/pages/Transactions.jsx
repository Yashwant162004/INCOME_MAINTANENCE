import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Trash2, ArrowUpRight, ArrowDownLeft, X, ChevronDown, Calendar, Tag, DollarSign } from 'lucide-react';
import { useExpenses } from '../context/ExpenseContext';
import { formatCurrency, formatDate } from '../utils/formatters';
import Card from '../components/Card';

const Transactions = () => {
  const { transactions, deleteTransaction, categories } = useExpenses();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeType, setActiveType] = useState('all');
  const [activeCategory, setActiveCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = activeType === 'all' || t.type === activeType;
      const matchesCategory = activeCategory === 'all' || t.category === activeCategory;
      return matchesSearch && matchesType && matchesCategory;
    });
  }, [transactions, searchTerm, activeType, activeCategory]);

  const categoryOptions = Object.keys(categories);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingBottom: '4rem' }}>
      <header>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Transactions</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Review and manage your complete financial history.</p>
      </header>

      {/* Search & Filter Bar */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '300px' }}>
          <Search size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          <input 
            type="text" 
            placeholder="Search transactions..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ 
              width: '100%', 
              paddingLeft: '48px', 
              height: '56px', 
              fontSize: '1rem',
              borderRadius: '16px',
              border: '1px solid var(--card-border)',
              background: 'rgba(255, 255, 255, 0.05)'
            }}
          />
        </div>
        
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className={`btn \${showFilters ? 'btn-primary' : 'btn-ghost'}`}
          style={{ height: '56px', padding: '0 24px', borderRadius: '16px' }}
        >
          <Filter size={20} />
          <span>Filters</span>
          <ChevronDown size={16} style={{ transform: showFilters ? 'rotate(180deg)' : 'none', transition: '0.3s' }} />
        </button>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ overflow: 'hidden' }}
          >
            <div className="glass" style={{ padding: '1.5rem', display: 'flex', gap: '2rem', flexWrap: 'wrap', borderRadius: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Type</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['all', 'income', 'expense'].map(type => (
                    <button
                      key={type}
                      onClick={() => setActiveType(type)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '10px',
                        border: '1px solid var(--card-border)',
                        background: activeType === type ? 'var(--primary)' : 'rgba(255, 255, 255, 0.05)',
                        color: activeType === type ? 'white' : 'var(--text-secondary)',
                        cursor: 'pointer',
                        textTransform: 'capitalize',
                        fontWeight: 600,
                        transition: '0.2s'
                      }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Category</span>
                <select
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value)}
                  style={{ height: '40px', padding: '0 12px', minWidth: '150px' }}
                >
                  <option value="all">All Categories</option>
                  {categoryOptions.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>

              <button 
                onClick={() => { setActiveType('all'); setActiveCategory('all'); setSearchTerm(''); }}
                style={{ alignSelf: 'flex-end', background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontWeight: 600, padding: '8px' }}
              >
                Reset Filters
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Card delay={0.2} style={{ padding: '0' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--card-border)' }}>
                <th style={{ padding: '1.5rem', color: 'var(--text-secondary)', fontWeight: 600 }}>TRANSACTION</th>
                <th style={{ padding: '1.5rem', color: 'var(--text-secondary)', fontWeight: 600 }}>CATEGORY</th>
                <th style={{ padding: '1.5rem', color: 'var(--text-secondary)', fontWeight: 600 }}>DATE</th>
                <th style={{ padding: '1.5rem', color: 'var(--text-secondary)', fontWeight: 600, textAlign: 'right' }}>AMOUNT</th>
                <th style={{ padding: '1.5rem', width: '80px' }}></th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((t, idx) => (
                <motion.tr
                  key={t.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * idx }}
                  style={{ borderBottom: '1px solid var(--card-border)', transition: 'background 0.2s' }}
                  className="row-hover"
                >
                  <td style={{ padding: '1.25rem 1.5rem' }}>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <div style={{ 
                        padding: '10px', 
                        borderRadius: '12px', 
                        background: t.type === 'income' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(244, 63, 94, 0.1)',
                        color: t.type === 'income' ? 'var(--success)' : 'var(--accent)'
                      }}>
                        {t.type === 'income' ? <ArrowUpRight size={20} /> : <ArrowDownLeft size={20} />}
                      </div>
                      <span style={{ fontWeight: 600, fontSize: '1rem' }}>{t.title}</span>
                    </div>
                  </td>
                  <td style={{ padding: '1.25rem 1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: categories[t.category]?.color || 'var(--text-secondary)' }}></div>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{t.category}</span>
                    </div>
                  </td>
                  <td style={{ padding: '1.25rem 1.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{formatDate(t.date)}</td>
                  <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                    <span style={{ 
                      fontWeight: 700, 
                      fontSize: '1rem',
                      color: t.type === 'income' ? 'var(--success)' : 'var(--text-primary)' 
                    }}>
                      {t.type === 'income' ? '+' : '-'}${Number(t.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </td>
                  <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                    <button 
                      onClick={() => deleteTransaction(t.id)}
                      className="btn btn-ghost" 
                      style={{ padding: '8px', color: 'var(--error)', border: 'none' }}
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {filteredTransactions.length === 0 && (
            <div style={{ textAlign: 'center', padding: '5rem', color: 'var(--text-secondary)' }}>
              <Search size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
              <p style={{ fontSize: '1.125rem' }}>No transactions match your filters.</p>
              <button onClick={() => { setSearchTerm(''); setActiveType('all'); setActiveCategory('all'); }} className="btn btn-ghost" style={{ marginTop: '1rem' }}>Clear all filters</button>
            </div>
          )}
        </div>
      </Card>

      <style>{`
        .row-hover:hover { background: rgba(255, 255, 255, 0.02); }
        @media (max-width: 768px) {
          th:nth-child(2), th:nth-child(3), td:nth-child(2), td:nth-child(3) { display: none; }
        }
      `}</style>
    </div>
  );
};

export default Transactions;
