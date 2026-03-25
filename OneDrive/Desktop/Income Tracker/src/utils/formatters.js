export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (dateString) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(dateString));
};

export const categories = {
  income: ['Salary', 'Freelance', 'Investments', 'Gift', 'Other'],
  expense: ['Food', 'Rent', 'Transport', 'Shopping', 'Entertainment', 'Health', 'Utilities', 'Other'],
};
