import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useExpenses } from '../context/ExpenseContext';
import { formatCurrency } from '../utils/formatters';
import Card from '../components/Card';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Legend, Cell, PieChart, Pie, AreaChart, Area, ComposedChart, Line
} from 'recharts';
import { TrendingUp, TrendingDown, Target, PieChart as PieIcon, BarChart3, Activity } from 'lucide-react';

const Analytics = () => {
  const { transactions, income, expense, categories } = useExpenses();

  // 1. Category Breakdown Data
  const categoryData = useMemo(() => {
    const expenseTransactions = transactions.filter(t => t.type === 'expense');
    const data = {};
    expenseTransactions.forEach(t => {
      data[t.category] = (data[t.category] || 0) + Number(t.amount);
    });
    return Object.entries(data)
      .map(([name, value]) => ({ 
        name, 
        value,
        color: categories[name]?.color || '#94a3b8'
      }))
      .sort((a, b) => b.value - a.value);
  }, [transactions, categories]);

  // 2. Monthly Comparison (Mocking 6 months based on current year for demo)
  const monthlyData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date().getMonth();
    const data = months.slice(0, currentMonth + 1).map(m => ({ name: m, income: 0, expense: 0 }));
    
    transactions.forEach(t => {
      const date = new Date(t.date);
      const mIdx = date.getMonth();
      if (mIdx <= currentMonth) {
        if (t.type === 'income') data[mIdx].income += Number(t.amount);
        else data[mIdx].expense += Number(t.amount);
      }
    });

    // Fill with some mock data if empty for visual demo
    if (transactions.length < 10) {
      return [
        { name: 'Mar', income: 4500, expense: 3200 },
        { name: 'Apr', income: 5200, expense: 3800 },
        { name: 'May', income: 4800, expense: 4100 },
        { name: 'Jun', income: 6000, expense: 4500 },
        { name: 'Jul', income: income, expense: expense }
      ];
    }
    return data.filter(d => d.income > 0 || d.expense > 0);
  }, [transactions, income, expense]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingBottom: '4rem' }}>
      <header>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Financial Analytics</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Advanced visual insights into your financial health.</p>
      </header>

      {/* Top Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
        <Card delay={0.1}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Activity style={{ color: 'var(--primary)' }} />
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Expense Ratio</span>
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '8px' }}>
            {income > 0 ? ((expense / income) * 100).toFixed(1) : 0}%
          </h2>
        </Card>
        <Card delay={0.2}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Target style={{ color: 'var(--secondary)' }} />
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Savings Rate</span>
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '8px' }}>
            {income > 0 ? (((income - expense) / income) * 100).toFixed(1) : 0}%
          </h2>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '1.5rem' }}>
        {/* Monthly Comparison */}
        <Card title="Monthly Performance" delay={0.3} icon={BarChart3}>
          <div style={{ height: '350px', width: '100%', marginTop: '1.5rem' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--card-border)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-secondary)" fontSize={12} axisLine={false} tickLine={false} />
                <YAxis stroke="var(--text-secondary)" fontSize={12} axisLine={false} tickLine={false} tickFormatter={(v) => `$\${v}`} />
                <Tooltip 
                  contentStyle={{ background: 'var(--background)', border: '1px solid var(--card-border)', borderRadius: '12px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="income" name="Income" fill="var(--success)" radius={[6, 6, 0, 0]} barSize={24} />
                <Bar dataKey="expense" name="Expense" fill="var(--error)" radius={[6, 6, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Category breakdown */}
        <Card title="Expense Distribution" delay={0.4} icon={PieIcon}>
          <div style={{ height: '350px', width: '100%', marginTop: '1.5rem' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                  animationDuration={1500}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-\${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ background: 'var(--background)', border: '1px solid var(--card-border)', borderRadius: '12px' }}
                  formatter={(val) => `$\${Number(val).toLocaleString()}`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 20px', justifyContent: 'center', marginTop: '1rem' }}>
            {categoryData.map((d) => (
              <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: d.color }}></div>
                <span style={{ fontWeight: 600 }}>{d.name}</span>
                <span style={{ color: 'var(--text-secondary)' }}>({((d.value / expense) * 100).toFixed(1)}%)</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Category List Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
        {categoryData.map((cat, i) => (
          <motion.div 
            key={cat.name}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * i }}
          >
            <Card style={{ borderLeft: `4px solid \${cat.color}`, padding: '1.25rem' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>{cat.name}</p>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '4px' }}>${cat.value.toLocaleString()}</h3>
              <div className="progress-bar" style={{ marginTop: '12px', height: '6px' }}>
                <div 
                  className="progress-fill" 
                  style={{ width: `\${(cat.value / expense) * 100}%`, background: cat.color }}
                ></div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {transactions.length === 0 && (
        <div className="glass" style={{ padding: '6rem', textAlign: 'center', borderRadius: '24px' }}>
          <Activity size={64} style={{ color: 'var(--primary)', opacity: 0.2, marginBottom: '1.5rem' }} />
          <h2 style={{ marginBottom: '0.5rem' }}>No Analytics Available</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Categorize your expenses to see detailed breakdowns.</p>
        </div>
      )}
    </div>
  );
};

export default Analytics;
