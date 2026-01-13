import React, { useState, useEffect } from 'react';
import './Wallet.css';

const Wallet = ({ 
  initialBalance = 0, 
  currency = 'USD', 
  theme = 'light',
  onTransaction,
  showAnalytics = true 
}) => {
  const [balance, setBalance] = useState(initialBalance);
  const [transactions, setTransactions] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [isAnimating, setIsAnimating] = useState(false);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    }).format(value);
  };

  const addTransaction = (type, amount, description) => {
    const transaction = {
      id: Date.now(),
      type,
      amount: parseFloat(amount),
      description,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString()
    };

    setTransactions(prev => [transaction, ...prev]);
    
    if (type === 'income') {
      setBalance(prev => prev + parseFloat(amount));
    } else {
      setBalance(prev => prev - parseFloat(amount));
    }

    if (onTransaction) {
      onTransaction(transaction);
    }

    // Animation effect
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) return;

    const transactionType = isAdding ? 'income' : 'expense';
    addTransaction(transactionType, amount, description);
    
    setAmount('');
    setDescription('');
  };

  const getTotalIncome = () => {
    return transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const getTotalExpenses = () => {
    return transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const getRecentTransactions = () => transactions.slice(0, 5);

  return (
    <div className={`wallet-container ${theme}-theme`}>
      <div className="wallet-header">
        <h2>My Wallet</h2>
        <div className="currency-selector">
          <select value={currency} onChange={(e) => {/* Handle currency change */}}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="JPY">JPY</option>
          </select>
        </div>
      </div>

      <div className="wallet-balance">
        <div className={`balance-display ${isAnimating ? 'pulse' : ''}`}>
          <span className="balance-label">Current Balance</span>
          <span className="balance-amount">{formatCurrency(balance)}</span>
        </div>
        
        <div className="balance-stats">
          <div className="stat income">
            <span>Income</span>
            <span className="stat-amount positive">{formatCurrency(getTotalIncome())}</span>
          </div>
          <div className="stat expense">
            <span>Expenses</span>
            <span className="stat-amount negative">{formatCurrency(getTotalExpenses())}</span>
          </div>
        </div>
      </div>

      <div className="wallet-tabs">
        <button 
          className={activeTab === 'overview' ? 'active' : ''}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={activeTab === 'transactions' ? 'active' : ''}
          onClick={() => setActiveTab('transactions')}
        >
          Transactions
        </button>
        <button 
          className={activeTab === 'add' ? 'active' : ''}
          onClick={() => setActiveTab('add')}
        >
          Add Transaction
        </button>
      </div>

      <div className="wallet-content">
        {activeTab === 'overview' && (
          <div className="overview-tab">
            {showAnalytics && (
              <div className="analytics">
                <h3>Financial Overview</h3>
                <div className="analytics-grid">
                  <div className="analytics-card">
                    <h4>Net Flow</h4>
                    <span className={balance >= 0 ? 'positive' : 'negative'}>
                      {formatCurrency(balance)}
                    </span>
                  </div>
                  <div className="analytics-card">
                    <h4>Transactions</h4>
                    <span>{transactions.length}</span>
                  </div>
                  <div className="analytics-card">
                    <h4>Avg. Expense</h4>
                    <span>
                      {transactions.filter(t => t.type === 'expense').length > 0 
                        ? formatCurrency(getTotalExpenses() / transactions.filter(t => t.type === 'expense').length)
                        : formatCurrency(0)
                      }
                    </span>
                  </div>
                </div>
              </div>
            )}
            
            <div className="recent-transactions">
              <h3>Recent Transactions</h3>
              {getRecentTransactions().length > 0 ? (
                <div className="transactions-list">
                  {getRecentTransactions().map(transaction => (
                    <div key={transaction.id} className="transaction-item">
                      <div className="transaction-info">
                        <span className="transaction-desc">{transaction.description}</span>
                        <span className="transaction-date">{transaction.date}</span>
                      </div>
                      <span className={`transaction-amount ${transaction.type}`}>
                        {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-transactions">No transactions yet</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="transactions-tab">
            <h3>All Transactions</h3>
            {transactions.length > 0 ? (
              <div className="transactions-table">
                {transactions.map(transaction => (
                  <div key={transaction.id} className="table-row">
                    <div className="table-cell">{transaction.description}</div>
                    <div className="table-cell">{transaction.date}</div>
                    <div className="table-cell">{transaction.time}</div>
                    <div className={`table-cell amount ${transaction.type}`}>
                      {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-transactions">No transactions recorded</p>
            )}
          </div>
        )}

        {activeTab === 'add' && (
          <div className="add-transaction-tab">
            <form onSubmit={handleSubmit} className="transaction-form">
              <div className="form-group">
                <label>Amount</label>
                <input
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Transaction description"
                  required
                />
              </div>
              
              <div className="transaction-type">
                <button
                  type="button"
                  className={isAdding ? 'active income' : ''}
                  onClick={() => setIsAdding(true)}
                >
                  Income
                </button>
                <button
                  type="button"
                  className={!isAdding ? 'active expense' : ''}
                  onClick={() => setIsAdding(false)}
                >
                  Expense
                </button>
              </div>
              
              <button type="submit" className="submit-btn">
                Add {isAdding ? 'Income' : 'Expense'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wallet;