import React from 'react';

function ExpenseList({ expenses, onDelete }) {
    if (expenses.length === 0) {
        return <p className="empty">No expenses yet</p>;
    }

    return (
        <div className="expense-list">
            {expenses.map(expense => (
                <div key={expense.id} className="expense-item">
                    <div className="expense-info">
                        <span className="expense-desc">{expense.description}</span>
                        <span className="expense-cat">{expense.category}</span>
                    </div>
                    <div className="expense-right">
                        <span className="expense-amount">€{expense.amount.toFixed(2)}</span>
                        <button className="delete-btn" onClick={() => onDelete(expense.id)}>×</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ExpenseList;
