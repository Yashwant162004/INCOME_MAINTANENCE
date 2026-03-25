import { motion } from 'framer-motion';
import { useExpenses } from '../context/ExpenseContext';
import Card from './Card';
import AnimatedCounter from './AnimatedCounter';

const BudgetTracker = () => {
  const { budget, expense } = useExpenses();
  const percentage = Math.min((expense / budget) * 100, 100);
  const isOver = expense > budget;

  return (
    <Card title="Monthly Budget" delay={0.2}>
      <div style={{ marginTop: '0.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ color: 'var(--text-secondary)' }}>Spending Progress</span>
          <span style={{ fontWeight: 600, color: isOver ? 'var(--error)' : 'inherit' }}>
            {percentage.toFixed(0)}%
          </span>
        </div>
        
        <div className="progress-bar">
          <motion.div 
            className="progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `\${percentage}%` }}
            style={{ 
              background: isOver 
                ? 'var(--error)' 
                : 'linear-gradient(90deg, var(--primary), var(--secondary))' 
            }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontSize: '0.875rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Spent</span>
            <span style={{ fontWeight: 600 }}><AnimatedCounter value={expense} prefix="$" /></span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Limit</span>
            <span style={{ fontWeight: 600 }}>$<AnimatedCounter value={budget} decimals={0} /></span>
          </div>
        </div>

        {isOver && (
          <div style={{ 
            marginTop: '1rem', 
            padding: '0.75rem', 
            borderRadius: '8px', 
            background: 'rgba(239, 68, 68, 0.1)', 
            color: 'var(--error)',
            fontSize: '0.875rem',
            textAlign: 'center',
            fontWeight: 500
          }}>
            ⚠️ You have exceeded your budget!
          </div>
        )}
      </div>
    </Card>
  );
};

export default BudgetTracker;
