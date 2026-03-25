import { useMemo } from 'react';
import { Lightbulb, TrendingUp, TrendingDown, Target } from 'lucide-react';
import { useExpenses } from '../context/ExpenseContext';
import Card from './Card';

const SmartInsights = () => {
  const { transactions, budget, expense } = useExpenses();

  const insights = useMemo(() => {
    const list = [];
    
    // 1. Budget Insight
    if (expense > budget) {
      list.push({
        id: 'budget',
        icon: <Target style={{ color: 'var(--error)' }} />,
        text: `Over budget by $${(expense - budget).toLocaleString()}`,
        type: 'critical'
      });
    } else if (expense > budget * 0.8) {
      list.push({
        id: 'budget-warn',
        icon: <Lightbulb style={{ color: 'var(--warning)' }} />,
        text: "You've used 80% of your budget.",
        type: 'warning'
      });
    }

    // 2. Top Category
    const categoryTotals = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
        return acc;
      }, {});

    const topCat = Object.entries(categoryTotals).sort((a,b) => b[1] - a[1])[0];
    if (topCat) {
      list.push({
        id: 'top-cat',
        icon: <TrendingUp style={{ color: 'var(--secondary)' }} />,
        text: `Highest spending in ${topCat[0]}`,
        type: 'info'
      });
    }

    // 3. Default Tip
    if (list.length < 2) {
      list.push({
        id: 'tip',
        icon: <TrendingDown style={{ color: 'var(--success)' }} />,
        text: "Great job! Your spending is on track.",
        type: 'success'
      });
    }

    return list;
  }, [transactions, budget, expense]);

  return (
    <Card title="Smart Insights" delay={0.3}>
      <div style={{ marginTop: '0.5rem' }}>
        {insights.map((insight) => (
          <div key={insight.id} className="insight-card">
            <div style={{ 
              padding: '8px', 
              borderRadius: '10px', 
              background: 'rgba(255, 255, 255, 0.05)',
              display: 'flex'
            }}>
              {insight.icon}
            </div>
            <p style={{ fontSize: '0.9rem', fontWeight: 500 }}>{insight.text}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SmartInsights;
