import React, { useState } from 'react';

function ExpenseForm({ onAdd }) {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('Food');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (description && amount) {
            onAdd({ description, amount, category });
            setDescription('');
            setAmount('');
        }
    };

    return (
        <form className="expense-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
            <input type="number" placeholder="Amount (€)" value={amount} onChange={e => setAmount(e.target.value)} step="0.01" required />
            <select value={category} onChange={e => setCategory(e.target.value)}>
                <option>Food</option>
                <option>Transport</option>
                <option>Shopping</option>
                <option>Bills</option>
                <option>Entertainment</option>
                <option>Other</option>
            </select>
            <button type="submit">Add</button>
        </form>
    );
}

export default ExpenseForm;
