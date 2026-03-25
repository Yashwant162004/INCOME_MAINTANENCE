import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Wallet, Plus, ArrowUpRight, ArrowDownLeft, Target, Sparkles, PieChart as PieIcon } from 'lucide-react';
import { useExpenses } from '../context/ExpenseContext';
import { useAuth } from '../context/AuthContext';
import { formatCurrency, formatDate } from '../utils/formatters';
import Card from '../components/Card';
import AnimatedCounter from '../components/AnimatedCounter';
import BudgetTracker from '../components/BudgetTracker';
import SmartInsights from '../components/SmartInsights';
import FAB from '../components/FAB';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Dashboard = ({ onAddClick }) => {
  const { transactions, balance, income, expense, categories } = useExpenses();
  const { user } = useAuth();

  const recentTransactions = transactions.slice(0, 5);

  const chartData = useMemo(() => {
    return transactions.slice(0, 7).reverse().map(t => ({
      name: formatDate(t.date),
      amount: t.amount,
    }));
  }, [transactions]);

  const categoryData = useMemo(() => {
    const expenseTransactions = transactions.filter(t => t.type === 'expense');
    const data = {};
    expenseTransactions.forEach(t => {
      data[t.category] = (data[t.category] || 0) + Number(t.amount);
    });
    return Object.entries(data).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  const CATEGORY_COLORS = Object.values(categories).map(c => c.color);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingBottom: '4rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800 }} className="gradient-text">
            🤝 Hello, {user?.name?.split(' ')[0] || 'User'}
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>Welcome back! Here's your financial overview.</p>
        </div>
        <button onClick={onAddClick} className="btn btn-primary pulse-primary" style={{ padding: '12px 28px' }}>
          <Plus size={20} /> New Transaction
        </button>
      </header>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        <Card title="Total Balance" delay={0.1} className="glow-hover">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginTop: '0.75rem' }}>
            <div style={{ padding: '14px', borderRadius: '14px', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)' }}>
              <Wallet size={28} />
            </div>
            <div>
              <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>
                <AnimatedCounter value={balance} prefix="$" />
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Available Funds</p>
            </div>
          </div>
        </Card>

        <Card title="Monthly Income" delay={0.2} className="glow-hover">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginTop: '0.75rem' }}>
            <div style={{ padding: '14px', borderRadius: '14px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)' }}>
              <TrendingUp size={28} />
            </div>
            <div>
              <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>
                <AnimatedCounter value={income} prefix="$" />
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--success)', fontSize: '0.875rem' }}>
                <ArrowUpRight size={14} /> <span>+12.5%</span>
              </div>
            </div>
          </div>
        </Card>

        <Card title="Monthly Expenses" delay={0.3} className="glow-hover">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginTop: '0.75rem' }}>
            <div style={{ padding: '14px', borderRadius: '14px', background: 'rgba(244, 63, 94, 0.1)', color: 'var(--accent)' }}>
              <TrendingDown size={28} />
            </div>
            <div>
              <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>
                <AnimatedCounter value={expense} prefix="$" />
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent)', fontSize: '0.875rem' }}>
                <ArrowDownLeft size={14} /> <span>+4.2%</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Trend Chart */}
          <Card title="Expense Trend" delay={0.4}>
            <div style={{ height: '320px', width: '100%', marginTop: '1.5rem' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--card-border)" vertical={false} />
                  <XAxis dataKey="name" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                  <YAxis stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$\${val}`} />
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(15, 23, 42, 0.9)',
                      border: '1px solid var(--card-border)',
                      borderRadius: '12px',
                      backdropFilter: 'blur(8px)',
                      boxShadow: 'var(--shadow)'
                    }}
                    itemStyle={{ color: 'var(--text-primary)', fontWeight: 600 }}
                  />
                  <Area type="monotone" dataKey="amount" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#chartGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Insights & Budget */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <BudgetTracker />
            <SmartInsights />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Category Breakdown */}
          <Card title="Category Breakdown" delay={0.5}>
            <div style={{ height: '240px', width: '100%', marginTop: '1rem' }}>
              {categoryData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      innerRadius={65}
                      outerRadius={85}
                      paddingAngle={8}
                      dataKey="value"
                      animationDuration={1500}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-\${index}`} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} stroke="none" />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ background: 'var(--background)', border: '1px solid var(--card-border)', borderRadius: '12px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                  No expense data available
                </div>
              )}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 20px', justifyContent: 'center', marginTop: '1.5rem' }}>
              {categoryData.map((d, i) => (
                <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: CATEGORY_COLORS[i % CATEGORY_COLORS.length] }}></div>
                  <span style={{ fontWeight: 500 }}>{d.name}</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{((d.value / expense) * 100).toFixed(0)}%</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Activity */}
          <Card title="Recent Activity" delay={0.6}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              {recentTransactions.map((t, i) => (
                <div key={t.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid transparent',
                  transition: 'all 0.2s ease'
                }} className="glow-hover">
                  <div style={{
                    padding: '10px',
                    borderRadius: '12px',
                    background: t.type === 'income' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(244, 63, 94, 0.1)',
                    color: t.type === 'income' ? 'var(--success)' : 'var(--accent)',
                    display: 'flex'
                  }}>
                    {t.type === 'income' ? <ArrowUpRight size={20} /> : <ArrowDownLeft size={20} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 600, fontSize: '0.925rem' }}>{t.title}</p>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>{t.category} • {formatDate(t.date)}</p>
                  </div>
                  <p style={{ fontWeight: 700, color: t.type === 'income' ? 'var(--success)' : 'inherit' }}>
                    {t.type === 'income' ? '+' : '-'}${Number(t.amount).toLocaleString()}
                  </p>
                </div>
              ))}
              <button className="btn btn-ghost" style={{ width: '100%', marginTop: '0.5rem', borderRadius: '12px' }}>
                View Full History
              </button>
            </div>
          </Card>
        </div>
      </div>

      <FAB onClick={onAddClick} />
    </div>
  );
};

export default Dashboard;
