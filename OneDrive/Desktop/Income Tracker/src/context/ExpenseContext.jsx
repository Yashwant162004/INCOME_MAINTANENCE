import { createContext, useContext, useReducer, useEffect } from 'react';

const ExpenseContext = createContext();

const CATEGORIES = {
  Food: { icon: 'Utensils', color: '#f97316' },
  Transport: { icon: 'Car', color: '#0ea5e9' },
  Entertainment: { icon: 'Film', color: '#d946ef' },
  Shopping: { icon: 'ShoppingBag', color: '#10b981' },
  Rent: { icon: 'Home', color: '#8b5cf6' },
  Health: { icon: 'HeartPulse', color: '#ef4444' },
  Salary: { icon: 'Briefcase', color: '#22c55e' },
  Freelance: { icon: 'Code', color: '#6366f1' },
  Other: { icon: 'Tag', color: '#94a3b8' },
};

const initialState = {
  transactions: JSON.parse(localStorage.getItem('transactions')) || [
    { id: 1, title: 'Salary June', amount: 5000, type: 'income', category: 'Salary', date: '2024-06-01' },
    { id: 2, title: 'House Rent', amount: 1200, type: 'expense', category: 'Rent', date: '2024-06-02' },
    { id: 3, title: 'Netflix & Chill', amount: 15.99, type: 'expense', category: 'Entertainment', date: '2024-06-03' },
    { id: 4, title: 'Freelance Hub', amount: 1500, type: 'income', category: 'Freelance', date: '2024-06-05' },
    { id: 5, title: 'Gas Station', amount: 60, type: 'expense', category: 'Transport', date: '2024-06-06' },
  ],
  budget: Number(localStorage.getItem('monthlyBudget')) || 5000,
  theme: localStorage.getItem('theme') || 'dark',
};

function expenseReducer(state, action) {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };
    case 'SET_BUDGET':
      return {
        ...state,
        budget: action.payload,
      };
    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'dark' ? 'light' : 'dark',
      };
    default:
      return state;
  }
}

export const ExpenseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(expenseReducer, initialState);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(state.transactions));
  }, [state.transactions]);

  useEffect(() => {
    localStorage.setItem('monthlyBudget', state.budget);
  }, [state.budget]);

  useEffect(() => {
    localStorage.setItem('theme', state.theme);
    document.documentElement.setAttribute('data-theme', state.theme);
  }, [state.theme]);

  const addTransaction = (transaction) => {
    dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
  };

  const deleteTransaction = (id) => {
    dispatch({ type: 'DELETE_TRANSACTION', payload: id });
  };

  const setBudget = (amount) => {
    dispatch({ type: 'SET_BUDGET', payload: Number(amount) });
  };

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  const totals = state.transactions.reduce(
    (acc, t) => {
      const amount = Number(t.amount);
      if (t.type === 'income') acc.income += amount;
      else acc.expense += amount;
      acc.balance = acc.income - acc.expense;
      return acc;
    },
    { income: 0, expense: 0, balance: 0 }
  );

  return (
    <ExpenseContext.Provider
      value={{
        ...state,
        ...totals,
        categories: CATEGORIES,
        addTransaction,
        deleteTransaction,
        setBudget,
        toggleTheme,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context) throw new Error('useExpenses must be used within an ExpenseProvider');
  return context;
};
