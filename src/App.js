import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from './firebase';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseChart from './components/ExpenseChart';

function App() {
    const [expenses, setExpenses] = useState([]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const q = query(collection(db, 'expenses'), orderBy('date', 'desc'));
        const unsub = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setExpenses(data);
        });
        return unsub;
    }, []);

    const addExpense = async (expense) => {
        await addDoc(collection(db, 'expenses'), {
            ...expense,
            amount: parseFloat(expense.amount),
            date: new Date().toISOString()
        });
    };

    const deleteExpense = async (id) => {
        await deleteDoc(doc(db, 'expenses', id));
    };

    const filtered = filter === 'all'
        ? expenses
        : expenses.filter(e => e.category === filter);

    const total = filtered.reduce((sum, e) => sum + e.amount, 0);

    const categories = [...new Set(expenses.map(e => e.category))];

    return (
        <div className="app">
            <header>
                <h1>Expense Tracker</h1>
                <div className="total">Total: €{total.toFixed(2)}</div>
            </header>
            <div className="layout">
                <div className="main-col">
                    <ExpenseForm onAdd={addExpense} />
                    <div className="filters">
                        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
                        {categories.map(cat => (
                            <button key={cat} className={filter === cat ? 'active' : ''} onClick={() => setFilter(cat)}>
                                {cat}
                            </button>
                        ))}
                    </div>
                    <ExpenseList expenses={filtered} onDelete={deleteExpense} />
                </div>
                <div className="chart-col">
                    <ExpenseChart expenses={expenses} />
                </div>
            </div>
        </div>
    );
}

export default App;
